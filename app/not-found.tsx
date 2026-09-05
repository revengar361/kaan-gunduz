import Link from "next/link";
import { NAV } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="shell relative">
        <p className="t-label mb-6">404</p>
        <h1 className="t-display max-w-[12ch]">
          Sayfa <span className="text-signal">yok.</span>
        </h1>
        <p className="t-lead mt-8 max-w-[48ch]">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Aşağıdan devam edebilirsiniz.
        </p>

        <nav aria-label="Site menüsü" className="mt-12">
          <ul className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
            {NAV.map((item) => (
              <li key={item.href} className="bg-ink">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between p-5 transition-colors hover:bg-ink-raised"
                >
                  <span className="transition-colors group-hover:text-signal">{item.label}</span>
                  <span
                    aria-hidden
                    className="text-graphite transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/"
          className="mt-10 inline-flex bg-signal px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
