import type { Metadata } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";

export function generateSEO(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Launcify",
      url: "https://launcify.vercel.app",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
