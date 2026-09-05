import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation.
 *
 * Two deliberate choices:
 *  - Site Settings and About are singletons, opened straight into the editor.
 *    There is only ever one of each, so a list would be a pointless click.
 *  - Leads are split by status, with "Yeni" first. The panel's job is to answer
 *    "what needs my attention right now?" before anything else.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Yönetim")
    .items([
      S.listItem()
        .title("Gelen Talepler")
        .child(
          S.list()
            .title("Gelen Talepler")
            .items([
              S.listItem()
                .title("Yeni")
                .child(
                  S.documentList()
                    .title("Yeni talepler")
                    .filter('_type == "lead" && status == "new"')
                    .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Devam eden")
                .child(
                  S.documentList()
                    .title("Devam eden")
                    .filter('_type == "lead" && status in ["read", "replied"]')
                    .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Kapanan")
                .child(
                  S.documentList()
                    .title("Kapanan")
                    .filter('_type == "lead" && status in ["won", "closed"]')
                    .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
                ),
              S.divider(),
              S.listItem()
                .title("Tümü")
                .child(
                  S.documentList()
                    .title("Tüm talepler")
                    .filter('_type == "lead"')
                    .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
                ),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Hizmetler")
        .child(
          S.documentList()
            .title("Hizmetler")
            .filter('_type == "service"')
            .defaultOrdering([{ field: "index", direction: "asc" }])
        ),

      S.listItem()
        .title("Referanslar")
        .child(
          S.documentList()
            .title("Referanslar")
            .filter('_type == "client"')
            .defaultOrdering([{ field: "index", direction: "asc" }])
        ),

      S.listItem()
        .title("Sıkça Sorulan Sorular")
        .child(
          S.documentList()
            .title("Sıkça Sorulan Sorular")
            .filter('_type == "faq"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Hakkımda")
        .child(S.document().schemaType("about").documentId("about")),

      S.listItem()
        .title("Site Ayarları")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
