import type { Metadata } from "next";

const BASE_URL = "https://launcify.vercel.app";

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

export function generateArticleSEO(
  title: string,
  description: string,
  path: string,
  publishedDate: string,
  author: string
): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Launcify",
      url,
      publishedTime: publishedDate,
      authors: [author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@launcify",
    },
  };
}
