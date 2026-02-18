import type { Metadata } from "next";

// Use NEXT_PUBLIC_SITE_URL in preview/staging; fall back to production domain.
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://launcify.vercel.app";

export { BASE_URL };

export function generateSEO(
  title: string,
  description: string,
  path: string = ""
): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Launcify",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
