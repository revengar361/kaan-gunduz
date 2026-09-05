import Link from "next/link";
import { SITE, NAV, CTA } from "@/content/site";
import { getServicePages } from "@/lib/content";

export default async function Footer() {
  const SERVICE_PAGES = await getServicePages();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      {/* Large closing CTA — the footer is a destination, not an ending. */}
      <div className="shell relative py-20 md:py-24">
        <p className="t-label mb-8">Son adım</p>
        <h2 className="t-h1 max-w-[18ch]">
          Markanızı dijitalde büyütmeye hazır mısınız?
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={CTA.primary.href}
            className="group relative inline-flex items-center gap-3 bg-signal px-8 py-4 text-[0.8125rem] uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-bone"
          >
            {CTA.primary.label}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-ink-line px-8 py-4 text-[0.8125rem] uppercase tracking-[0.18em] text-bone transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            {CTA.instagram.label}
          </a>
        </div>
      </div>

      <div className="rule" />

      <div className="shell relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-2xl font-bold uppercase tracking-[0.16em] leading-tight">
            Kaan
            <br />
            <span className="text-bone-dim">Gündüz</span>
          </p>
          <p className="mt-5 max-w-[34ch] text-sm text-bone-dim">{SITE.title}</p>
          <p className="mt-1 text-sm text-graphite">{SITE.locationLabel}</p>
        </div>

        <nav aria-label="Alt menü" className="md:col-span-3">
          <p className="t-label mb-5">Site</p>
          <ul className="space-y-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Hizmetler" className="md:col-span-3">
          <p className="t-label mb-5">Hizmetler</p>
          <ul className="space-y-2.5">
            {SERVICE_PAGES.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="t-label mb-5">Sosyal</p>
          <ul className="space-y-2.5">
            <li>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="rule" />

      <div className="shell relative flex flex-col gap-4 py-8 text-xs text-graphite md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {SITE.name}. Tüm hakları saklıdır.
        </p>
        <div className="flex gap-6">
          <Link href="/gizlilik" className="transition-colors duration-200 hover:text-bone-dim">
            Gizlilik Politikası
          </Link>
          <Link href="/kvkk" className="transition-colors duration-200 hover:text-bone-dim">
            KVKK Aydınlatma Metni
          </Link>
        </div>
      </div>
    </footer>
  );
}
