"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/content/services";
import ServiceMetaphor from "@/components/services/ServiceMetaphor";

/**
 * The full 15-service index as a hoverable list. Hovering a row previews that
 * service's metaphor in the sticky panel — the list is the interface, so
 * nothing is hidden behind cards.
 */
export default function ServicesIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="shell border-t border-ink-line py-20 md:py-24">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="t-label mb-4">04 — Ne yapıyorum</p>
          <h2 className="t-h1 max-w-[16ch]">On beş hizmet, tek bir sistem.</h2>
        </div>
        <Link
          href="/hizmetler"
          className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-signal"
        >
          Tüm hizmetler
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {services.map((s, i) => {
            const href = s.slug ? `/hizmetler/${s.slug}` : `/hizmetler/${s.parent}`;
            return (
              <li key={s.index}>
                <Link
                  href={href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-5 border-b border-ink-line py-4 transition-colors duration-200 hover:border-graphite"
                >
                  <span className="t-index w-6 shrink-0">{s.index}</span>
                  <span className="flex-1">
                    <span className="font-display text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-signal md:text-xl">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-graphite">{s.short}</span>
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-graphite opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <div className="border border-ink-line bg-ink-raised p-6">
              <div className="aspect-[200/140]">
                <ServiceMetaphor metaphor={current.metaphor} />
              </div>
              <div className="mt-6 border-t border-ink-line pt-5">
                <p className="t-index mb-2">{current.index}</p>
                <h3 className="t-h3 mb-2">{current.title}</h3>
                <p className="text-sm text-bone-dim">{current.short}</p>
              </div>
            </div>
            <p className="t-label mt-4 text-graphite">Temsili süreç görselleştirmesi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
