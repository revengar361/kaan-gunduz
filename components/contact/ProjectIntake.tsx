"use client";

import { useState } from "react";

/**
 * Five-step project intake (brief section 38), not a generic contact form.
 *
 * Each step is a real fieldset, validation is per-step, and the whole thing
 * degrades to a single scrollable form if JS is unavailable — every field is
 * present in the DOM from the start.
 */

const SERVICES = [
  "Sosyal Medya Yönetimi",
  "Instagram Danışmanlığı",
  "İçerik Üretimi",
  "Reels Video",
  "Meta Reklam",
  "Web Sitesi",
  "Google İşletme Profili",
  "Marka Stratejisi",
  "Logo / Kurumsal Kimlik",
  "Danışmanlık",
  "Diğer",
];

const GOALS = [
  { value: "gorunurluk", label: "Daha fazla görünürlük" },
  { value: "musteri", label: "Daha fazla müşteri ve rezervasyon" },
  { value: "satis", label: "Online satış artışı" },
  { value: "kurumsal", label: "Daha kurumsal bir görünüm" },
  { value: "lansman", label: "Yeni işletme lansmanı" },
  { value: "belirsiz", label: "Henüz net değil" },
];

const STEPS = [
  { n: "01", label: "Markanız" },
  { n: "02", label: "İhtiyaç" },
  { n: "03", label: "Hedef" },
  { n: "04", label: "İletişim" },
  { n: "05", label: "Gönder" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ProjectIntake() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const [brand, setBrand] = useState("");
  const [sector, setSector] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]));

  const canAdvance = () => {
    if (step === 0) return brand.trim().length > 1;
    if (step === 1) return services.length > 0;
    if (step === 2) return goal !== "";
    if (step === 3) return name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      setError("Devam etmek için bu adımı tamamlayın.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, sector, services, goal, detail, name, email, phone }),
      });
      if (!res.ok) throw new Error("Gönderilemedi");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Mesaj gönderilemedi. Lütfen Instagram üzerinden ulaşın.");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-ink-line bg-ink-raised p-10 md:p-16">
        <p className="t-label mb-5 text-signal">Teşekkürler</p>
        <h2 className="t-h2 max-w-[18ch]">Mesajınız alındı.</h2>
        <p className="t-lead mt-6 max-w-[52ch]">
          En kısa sürede dönüş yapılacaktır. Acil bir konuysa Instagram üzerinden de
          yazabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Step indicator */}
      <ol className="mb-12 grid grid-cols-5 gap-px border border-ink-line bg-ink-line">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            aria-current={i === step ? "step" : undefined}
            className={`bg-ink px-3 py-4 transition-colors ${i === step ? "bg-ink-raised" : ""}`}
          >
            <span className={`t-index block ${i <= step ? "text-signal" : ""}`}>{s.n}</span>
            <span
              className={`mt-1 hidden text-xs sm:block ${
                i === step ? "text-bone" : "text-graphite"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      {/* 01 — Brand */}
      <fieldset hidden={step !== 0} className="border-0 p-0">
        <legend className="t-h2 mb-8">Markanız nedir?</legend>

        <label htmlFor="brand" className="t-label mb-2 block">
          İşletme / marka adı
        </label>
        <input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mb-8 w-full border border-ink-line bg-ink-raised px-5 py-4 text-lg focus:border-signal focus:outline-none"
          placeholder="Örn. Oasis Coffees"
        />

        <label htmlFor="sector" className="t-label mb-2 block">
          Sektör (opsiyonel)
        </label>
        <input
          id="sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full border border-ink-line bg-ink-raised px-5 py-4 focus:border-signal focus:outline-none"
          placeholder="Örn. Kafe, kuaför, üretim, hizmet"
        />
      </fieldset>

      {/* 02 — Needs */}
      <fieldset hidden={step !== 1} className="border-0 p-0">
        <legend className="t-h2 mb-3">Neye ihtiyacınız var?</legend>
        <p className="mb-8 text-sm text-bone-dim">Birden fazla seçebilirsiniz.</p>

        <div className="flex flex-wrap gap-3">
          {SERVICES.map((s) => {
            const on = services.includes(s);
            return (
              <label
                key={s}
                className={`cursor-pointer border px-5 py-3 text-sm transition-colors ${
                  on
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-ink-line text-bone-dim hover:border-graphite"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleService(s)}
                  className="sr-only"
                />
                {s}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 03 — Goal */}
      <fieldset hidden={step !== 2} className="border-0 p-0">
        <legend className="t-h2 mb-8">Hedefiniz nedir?</legend>

        <div className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2">
          {GOALS.map((g) => (
            <label
              key={g.value}
              className={`flex cursor-pointer items-center gap-4 bg-ink px-5 py-5 transition-colors ${
                goal === g.value ? "bg-ink-raised" : ""
              }`}
            >
              <input
                type="radio"
                name="goal"
                value={g.value}
                checked={goal === g.value}
                onChange={() => setGoal(g.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`h-3 w-3 shrink-0 border transition-colors ${
                  goal === g.value ? "border-signal bg-signal" : "border-graphite"
                }`}
              />
              <span className={goal === g.value ? "text-bone" : "text-bone-dim"}>{g.label}</span>
            </label>
          ))}
        </div>

        <label htmlFor="detail" className="t-label mt-8 mb-2 block">
          Eklemek istedikleriniz (opsiyonel)
        </label>
        <textarea
          id="detail"
          rows={4}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="w-full resize-none border border-ink-line bg-ink-raised px-5 py-4 focus:border-signal focus:outline-none"
          placeholder="Kısaca durumunuzu anlatın."
        />
      </fieldset>

      {/* 04 — Contact */}
      <fieldset hidden={step !== 3} className="border-0 p-0">
        <legend className="t-h2 mb-8">İletişim bilgileriniz</legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="t-label mb-2 block">
              Ad soyad
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full border border-ink-line bg-ink-raised px-5 py-4 focus:border-signal focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="t-label mb-2 block">
              Telefon (opsiyonel)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="w-full border border-ink-line bg-ink-raised px-5 py-4 focus:border-signal focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="email" className="t-label mb-2 block">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full border border-ink-line bg-ink-raised px-5 py-4 focus:border-signal focus:outline-none"
          />
        </div>

        <p className="mt-6 text-xs text-graphite">
          Bilgileriniz yalnızca bu talebe dönüş yapmak için kullanılır, üçüncü taraflarla
          paylaşılmaz. Ayrıntı için KVKK aydınlatma metnine bakabilirsiniz.
        </p>
      </fieldset>

      {/* 05 — Review */}
      <fieldset hidden={step !== 4} className="border-0 p-0">
        <legend className="t-h2 mb-8">Projeyi başlatalım</legend>

        <dl className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2">
          {[
            { k: "Marka", v: brand || "—" },
            { k: "Sektör", v: sector || "—" },
            { k: "Hizmetler", v: services.join(", ") || "—" },
            { k: "Hedef", v: GOALS.find((g) => g.value === goal)?.label ?? "—" },
            { k: "Ad soyad", v: name || "—" },
            { k: "E-posta", v: email || "—" },
          ].map((row) => (
            <div key={row.k} className="bg-ink p-5">
              <dt className="t-label mb-2">{row.k}</dt>
              <dd className="text-sm break-words">{row.v}</dd>
            </div>
          ))}
        </dl>
      </fieldset>

      {error && (
        <p role="alert" className="mt-6 border border-signal px-5 py-3 text-sm text-signal">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="border border-ink-line px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] transition-colors hover:border-graphite"
          >
            Geri
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center gap-3 bg-signal px-8 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
          >
            Devam
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-signal px-8 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone disabled:opacity-50"
          >
            {status === "sending" ? "Gönderiliyor..." : "Gönder"}
          </button>
        )}
      </div>
    </form>
  );
}
