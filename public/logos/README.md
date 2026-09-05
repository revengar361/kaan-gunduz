# Client logos

Drop authorised logo files here and the reference wall (`/referanslar`) switches
from the typographic lockup to the real logo automatically.

## How to add one

1. Save the file in this folder, named after the client slug:

   ```
   public/logos/master-hair-studio.svg
   public/logos/oasis-coffees.png
   public/logos/alo-balik.svg
   public/logos/mustafa-kebap-steakhouse.png
   public/logos/efe-salgamlari.png
   public/logos/kaleonu-pastirma.png
   public/logos/mezatci-ramo.png
   public/logos/sis-yangin.svg
   ```

2. Add the path to that client in `content/clients.ts`:

   ```ts
   {
     slug: "sis-yangin",
     ...
     logo: "/logos/sis-yangin.svg",
   }
   ```

That's the whole change. `components/portfolio/BrandLogo.tsx` handles sizing,
alt text and lazy loading.

## File requirements

- **SVG preferred.** Scales cleanly and stays sharp at any size.
- **PNG accepted** — transparent background, at least 400px on the long edge.
- Logos render on a near-black background (`#080809`). A dark-on-dark logo will
  disappear, so supply the **light or reversed version** where one exists.
- Logos are shown in **full colour**, not forced to monochrome — that usually
  destroys the recognition the logo is there for.

## Why they aren't here already

No logo files were scraped from the clients' websites or social accounts.
Republishing a business's mark is their call, not something to take by default.
Supply the files you're authorised to use and they go straight in.

Tracked as item C2 in `OPEN-QUESTIONS.md`.
