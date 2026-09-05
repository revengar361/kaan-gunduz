import { createClient, type SanityClient } from "@sanity/client";
import { projectId, dataset, apiVersion, writeToken, isSanityConfigured, canWriteToSanity } from "./env";

/** Read-only client, served from Sanity's CDN. Null when the CMS is not set up. */
export const readClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

/**
 * Write client for the contact form and the migration script.
 * Never import this into a client component — it carries a secret token.
 */
export const writeClient: SanityClient | null = canWriteToSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, token: writeToken })
  : null;

/**
 * Runs a query and returns `fallback` if the CMS is unconfigured, the query
 * fails, or the result is empty.
 *
 * This is the whole safety story for the integration: a CMS outage, an expired
 * token or a half-finished migration degrades the site to the content files it
 * shipped with, instead of taking pages down.
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {}
): Promise<T> {
  if (!readClient) return fallback;

  try {
    const result = await readClient.fetch<T>(query, params);
    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    console.error("[sanity] sorgu başarısız, koddaki içeriğe dönülüyor:", error);
    return fallback;
  }
}
