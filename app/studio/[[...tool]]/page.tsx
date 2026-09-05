import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

/**
 * The admin panel, served at /studio.
 *
 * Authentication is Sanity's own: only members invited to the Sanity project
 * can sign in and see anything. No password is stored in this repository and
 * none is needed here.
 */

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="shell flex min-h-screen items-center py-32">
        <div className="max-w-[62ch]">
          <p className="t-label mb-5 text-signal">Yönetim paneli</p>
          <h1 className="t-h1 mb-8">Panel henüz bağlanmadı.</h1>
          <p className="t-lead mb-6">
            Panelin çalışması için bir Sanity projesi gerekiyor. Kurulum beş dakika sürer ve
            ücretsizdir.
          </p>
          <ol className="space-y-4 text-bone-dim">
            <li className="flex gap-4 border-t border-ink-line pt-4">
              <span className="t-index shrink-0">01</span>
              <span>
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone underline underline-offset-4 transition-colors hover:text-signal"
                >
                  sanity.io/manage
                </a>{" "}
                adresinden ücretsiz bir proje oluşturun.
              </span>
            </li>
            <li className="flex gap-4 border-t border-ink-line pt-4">
              <span className="t-index shrink-0">02</span>
              <span>
                Proje kimliğini (Project ID) ve bir yazma anahtarını (API token, Editor yetkisi)
                kopyalayın.
              </span>
            </li>
            <li className="flex gap-4 border-t border-ink-line pt-4">
              <span className="t-index shrink-0">03</span>
              <span>
                Vercel → Settings → Environment Variables bölümüne ekleyin ve yeniden dağıtın.
                Değişken adları <code className="text-bone">SETUP-ADMIN.md</code> dosyasında yazılı.
              </span>
            </li>
          </ol>
          <p className="mt-10 border-t border-ink-line pt-6 text-xs text-graphite">
            Panel bağlanana kadar site içeriği koddaki dosyalardan okunmaya devam eder. Yani sitede
            hiçbir şey bozulmaz.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
