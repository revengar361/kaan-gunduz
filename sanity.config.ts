"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { projectId, dataset, apiVersion } from "./sanity/env";

/**
 * Studio configuration, mounted inside the site at /studio.
 *
 * Keeping the Studio in the same app means one deployment, one domain and one
 * login rather than a second hosted service to maintain.
 */
export default defineConfig({
  basePath: "/studio",
  title: "Kaan Gündüz — Yönetim",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Query playground. Handy for debugging, harmless in production since the
    // Studio itself is behind Sanity's own authentication.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Leads arrive from the website form; creating one by hand would only ever
    // be a mistake, so the "create new" action is removed for that type.
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "lead"),
  },
});
