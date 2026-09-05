"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, CTA, SITE } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and trap focus while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-ink/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-ink-line transition-opacity duration-500 ${
            scrolled && !open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="shell flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-[0.95rem] font-bold uppercase tracking-[0.2em] leading-none"
            aria-label={`${SITE.name} — ana sayfa`}
          >
            <span className="block">Kaan</span>
            <span className="block text-bone-dim">Gündüz</span>
          </Link>

          <nav aria-label="Ana menü" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[0.8125rem] tracking-wide transition-colors duration-200 hover:text-bone ${
                    active ? "text-bone" : "text-bone-dim"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-signal" aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={CTA.primary.href}
              className="hidden border border-ink-line px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:border-signal hover:text-signal md:block"
            >
              {CTA.primary.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
              <span
                className={`h-px w-6 bg-bone transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-bone transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu — GRID reveal */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink lg:hidden"
      >
        <div className="hairline-grid absolute inset-0 opacity-40" aria-hidden />
        <nav aria-label="Mobil menü" className="shell relative flex h-full flex-col justify-center gap-1 pt-20">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-ink-line py-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="t-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-h2 transition-colors duration-200 group-hover:text-signal">
                {item.label}
              </span>
            </Link>
          ))}
          <Link
            href={CTA.primary.href}
            className="mt-8 bg-signal px-6 py-4 text-center text-[0.8125rem] uppercase tracking-[0.18em] text-ink"
          >
            {CTA.primary.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
