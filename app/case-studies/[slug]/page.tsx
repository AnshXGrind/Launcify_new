import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy, caseStudies } from "@/lib/caseStudies";
import CaseStudyLayout from "@/components/CaseStudyLayout";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy(params.slug);

  if (!study) return {};

  return {
    title: `${study.title} | Case Study | Launcify`,
    description: study.problem,
    openGraph: {
      title: study.title,
      description: study.problem,
      type: "article",
      siteName: "Launcify",
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.problem,
    author: {
      "@type": "Organization",
      name: "Launcify",
      url: "https://launcify.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Launcify",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyLayout study={study} />
    </>
  );
}
