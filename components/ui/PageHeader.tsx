import Link from "next/link";

type Crumb = { name: string; path: string };

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-line pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 12% 0%, rgba(255,77,28,0.09) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        {crumbs.length > 0 && (
          <nav aria-label="Site haritası" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-graphite">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === crumbs.length - 1 ? (
                    <span className="text-bone-dim">{c.name}</span>
                  ) : (
                    <Link href={c.path} className="transition-colors hover:text-bone">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="t-label mb-5">{eyebrow}</p>
        <h1 className="t-h1 max-w-[18ch]">{title}</h1>
        {lead && <p className="t-lead mt-8 max-w-[60ch]">{lead}</p>}
      </div>
    </header>
  );
}
