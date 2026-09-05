import type { Client } from "@/content/clients";

/**
 * Brand mark for the reference wall.
 *
 * If `client.logo` points at a file in /public/logos/, the real logo is used —
 * in full colour, because forcing a client's mark to monochrome usually
 * destroys the recognition you put it there for.
 *
 * Until those files are supplied, the brand name itself is the mark, set in the
 * site's display face in that brand's own sector colour. No logo was scraped or
 * invented. Drop a file in and this switches over with no other change —
 * see public/logos/README.md.
 */
export default function BrandLogo({ client }: { client: Client }) {
  if (client.logo) {
    return (
      <span className="flex min-h-[5rem] items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo}
          alt={`${client.name} logosu`}
          className="max-h-20 w-auto max-w-full object-contain object-left"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span
      className="flex min-h-[5rem] items-center font-display text-2xl font-bold leading-[1.08] tracking-tight transition-colors duration-500 md:text-[1.75rem]"
      style={{ color: client.palette.accent }}
    >
      {client.name}
    </span>
  );
}
