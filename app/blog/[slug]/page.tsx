import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, generateArticleSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/lib/blogPosts";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) {
    return generateSEO(
      "Article Not Found | Launcify",
      "The requested article could not be found."
    );
  }
  return generateArticleSEO(
    `${post.title} | Launcify`,
    post.excerpt,
    `/blog/${post.slug}`,
    post.publishedDate,
    post.author
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Simple renderer: splits content on `## ` headings and renders paragraphs + bold */
function renderContent(content: string) {
  const sections = content.split(/^## /gm).filter(Boolean);

  return sections.map((section, sIdx) => {
    const lines = section.split("\n").filter((l) => l.trim() !== "");
    const heading = lines[0];
    const body = lines.slice(1);

    return (
      <div key={sIdx} className="mb-10">
        {sIdx > 0 || content.startsWith("## ") ? (
          <h2 className="text-xl font-semibold text-text mb-4">{heading}</h2>
        ) : (
          <p className="text-muted leading-relaxed mb-4">{heading}</p>
        )}
        {body.map((line, lIdx) => {
          // bullet lists
          if (line.startsWith("- ")) {
            return (
              <li
                key={lIdx}
                className="text-sm text-muted leading-relaxed ml-4 list-disc mb-2"
                dangerouslySetInnerHTML={{
                  __html: line
                    .slice(2)
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text">$1</strong>'),
                }}
              />
            );
          }
          // table rows (simplified — skip for now, render as text)
          if (line.startsWith("|")) {
            return (
              <p
                key={lIdx}
                className="text-sm text-muted leading-relaxed mb-2 font-mono"
              >
                {line}
              </p>
            );
          }
          return (
            <p
              key={lIdx}
              className="text-muted leading-relaxed mb-4"
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-text">$1</strong>'
                ),
              }}
            />
          );
        })}
      </div>
    );
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Launcify",
      url: "https://launcify.io",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-24 pb-10 md:pt-36 md:pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.readTime}</span>
            <span className="text-xs text-muted">{post.publishedDate}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-text leading-snug">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {renderContent(post.content)}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-text mb-6">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Card key={related.slug}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                    {related.category}
                  </span>
                  <h4 className="text-sm font-semibold text-text mb-2 leading-snug">
                    {related.title}
                  </h4>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="text-xs text-primary hover:text-primary-hover transition-colors font-medium"
                  >
                    Read &rarr;
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button href="/blog" variant="secondary" className="text-sm px-4 py-2">
              &larr; Back to Blog
            </Button>
            <Button href="/book-call" variant="primary" className="text-sm px-4 py-2">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
