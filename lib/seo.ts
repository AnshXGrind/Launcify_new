import type { Metadata } from "next";

const BASE_URL = "https://launcify.io";

export function generateSEO(
  title: string,
  description: string,
  path?: string
): Metadata {
  const url = path ? `${BASE_URL}${path}` : BASE_URL;

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
      type: "website",
      siteName: "Launcify",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@launcify",
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
