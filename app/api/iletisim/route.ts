import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

/**
 * Contact intake handler.
 *
 * Delivery is via Resend's REST API using plain fetch — no extra dependency, and
 * swapping to another provider means changing one function.
 *
 * Required environment variables (see .env.example):
 *   CONTACT_TO_EMAIL    where leads are delivered
 *   RESEND_API_KEY      from resend.com
 *   CONTACT_FROM_EMAIL  optional; must be on a domain verified in Resend
 *
 * If they are missing the endpoint never pretends to have delivered anything:
 * in development it logs, and in production it returns 503 with an honest
 * message pointing the visitor at Instagram. Telling someone their message was
 * sent when it was not is the one failure mode a lead form must never have.
 */

type Payload = {
  brand?: string;
  sector?: string;
  services?: string[];
  goal?: string;
  detail?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type Clean = {
  brand: string;
  sector: string;
  services: string[];
  goal: string;
  detail: string;
  name: string;
  email: string;
  phone: string;
  receivedAt: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GOAL_LABELS: Record<string, string> = {
  gorunurluk: "Daha fazla görünürlük",
  musteri: "Daha fazla müşteri ve rezervasyon",
  satis: "Online satış artışı",
  kurumsal: "Daha kurumsal bir görünüm",
  lansman: "Yeni işletme lansmanı",
  belirsiz: "Henüz net değil",
};

/** Escapes user-supplied text before it goes into the HTML email body. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(c: Clean) {
  const goal = GOAL_LABELS[c.goal] ?? c.goal ?? "—";

  const rows: [string, string][] = [
    ["Marka", c.brand],
    ["Sektör", c.sector || "—"],
    ["Hizmetler", c.services.join(", ") || "—"],
    ["Hedef", goal],
    ["Ad soyad", c.name],
    ["E-posta", c.email],
    ["Telefon", c.phone || "—"],
  ];

  const text = [
    `Yeni proje talebi — ${c.brand}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mesaj:",
    c.detail || "—",
    "",
    `Alındığı zaman: ${c.receivedAt}`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;color:#111">
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#888;margin:0 0 4px">
        Yeni proje talebi
      </p>
      <h1 style="font-size:22px;margin:0 0 20px">${esc(c.brand)}</h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td>
              <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(v)}</td>
            </tr>`
          )
          .join("")}
      </table>
      ${
        c.detail
          ? `<p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#888;margin:24px 0 6px">Mesaj</p>
             <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0">${esc(c.detail)}</p>`
          : ""
      }
      <p style="font-size:12px;color:#999;margin-top:28px">
        Bu e-postayı yanıtlarsanız doğrudan ${esc(c.name)} kişisine ulaşır.
      </p>
    </div>`;

  return { text, html };
}

async function sendViaResend(c: Clean, destination: string, apiKey: string) {
  const { text, html } = buildEmail(c);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Web Sitesi <onboarding@resend.dev>",
      to: [destination],
      // Replying to the notification reaches the lead directly.
      reply_to: c.email,
      subject: `Yeni proje talebi — ${c.brand}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const errors: string[] = [];
  if (!body.brand || body.brand.trim().length < 2) errors.push("brand");
  if (!body.name || body.name.trim().length < 2) errors.push("name");
  if (!body.email || !EMAIL.test(body.email)) errors.push("email");
  if (!Array.isArray(body.services) || body.services.length === 0) errors.push("services");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Eksik veya hatalı alanlar var.", fields: errors },
      { status: 422 }
    );
  }

  // Trim and cap every field before it goes anywhere.
  const clean: Clean = {
    brand: String(body.brand).slice(0, 120),
    sector: String(body.sector ?? "").slice(0, 120),
    services: (body.services ?? []).slice(0, 15).map((s) => String(s).slice(0, 60)),
    goal: String(body.goal ?? "").slice(0, 60),
    detail: String(body.detail ?? "").slice(0, 2000),
    name: String(body.name).slice(0, 120),
    email: String(body.email).slice(0, 160),
    phone: String(body.phone ?? "").slice(0, 40),
    receivedAt: new Date().toISOString(),
  };

  const destination = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  // The lead is stored FIRST. Storage is the durable record that shows up in
  // the admin panel; email is a notification on top of it. If the order were
  // reversed, an email outage would lose the enquiry entirely.
  let stored = false;
  const sanityConfigured = Boolean(writeClient);
  if (writeClient) {
    try {
      await writeClient.create({ _type: "lead", status: "new", ...clean });
      stored = true;
    } catch (error) {
      console.error("[iletisim] Talep panele kaydedilemedi:", error, clean);
    }
  } else {
    console.warn("[iletisim] SANITY_API_WRITE_TOKEN yok; talep panele kaydedilemiyor.");
  }

  let emailed = false;
  const emailConfigured = Boolean(destination && apiKey);
  if (destination && apiKey) {
    try {
      await sendViaResend(clean, destination, apiKey);
      emailed = true;
    } catch (error) {
      console.error("[iletisim] E-posta gönderilemedi:", error, clean);
    }
  } else {
    console.warn("[iletisim] CONTACT_TO_EMAIL / RESEND_API_KEY yok; e-posta gönderilemiyor.");
  }

  if (stored || emailed) {
    return NextResponse.json({ ok: true, stored, emailed });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[iletisim] Yeni talep (geliştirme modu, hiçbir kanal yapılandırılmadı):", clean);
    return NextResponse.json({ ok: true, mode: "development" });
  }

  /*
   * Nothing captured it. The two causes need completely different fixes, so
   * the response distinguishes them:
   *
   *   not-configured   -> environment variables are missing in the host
   *   delivery-failed  -> variables exist but the token or the provider rejected us
   *
   * Neither value leaks a secret; both save an hour of guessing.
   */
  const reason =
    !sanityConfigured && !emailConfigured ? "not-configured" : "delivery-failed";

  console.error(
    `[iletisim] Talep hiçbir kanala ulaştırılamadı (${reason}). ` +
      `Sanity yazma: ${sanityConfigured ? "yapılandırıldı" : "YOK"}, ` +
      `e-posta: ${emailConfigured ? "yapılandırıldı" : "YOK"}.`,
    clean
  );

  return NextResponse.json(
    { error: "Mesaj gönderilemedi. Lütfen Instagram üzerinden ulaşın.", reason },
    { status: 502 }
  );
}
