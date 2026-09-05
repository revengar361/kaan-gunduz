/**
 * Sanity configuration, read from the environment.
 *
 * The whole integration is optional by design. When these variables are absent
 * the site falls back to the TypeScript content files in `content/`, which is
 * exactly how it behaved before the CMS existed. That means the live site can
 * never break because a token expired or a dataset was renamed.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned so a future API change can never alter existing query results. */
export const apiVersion = "2026-09-05";

/** Server-only. Required to write leads and to run the migration script. */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? "";

/** True once a project id exists, i.e. the CMS is live. */
export const isSanityConfigured = projectId.length > 0;

/** True once the server can also write (leads, migration). */
export const canWriteToSanity = isSanityConfigured && writeToken.length > 0;
