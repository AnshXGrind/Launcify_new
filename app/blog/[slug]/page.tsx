import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Card from "@/components/Card";
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
  return generateSEO(
    `${post.title} | Launcify`,
    post.excerpt,
    `/blog/${post.slug}`
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
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
    url: `https://launcify.vercel.app/blog/${post.slug}`,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Launcify",
      url: "https://launcify.vercel.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section className="pt-24 md:pt-32 pb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {post.category}
            </span>
            <span className="text-muted text-xs">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-text leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed">{post.excerpt}</p>
        </div>
      </Section>

      {/* Content */}
      <Section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 max-w-5xl">
          {/* Body */}
          <article className="space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Free Strategy Call
              </p>
              <p className="text-sm text-muted leading-relaxed mb-5">
                Discuss how automation can save your team 20+ hours a week.
              </p>
              <Button href="/book-call" variant="primary" className="w-full justify-center">
                Book a Call
              </Button>
            </Card>

            {/* Related */}
            {relatedPosts.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                  Related Articles
                </p>
                <div className="space-y-3">
                  {relatedPosts.map((rp) => (
                    <Card key={rp.slug} className="p-4 hover:border-primary/40 transition-colors duration-150">
                      <a href={`/blog/${rp.slug}`} className="block">
                        <p className="text-xs text-primary font-semibold mb-1">{rp.category}</p>
                        <p className="text-sm text-text font-medium leading-snug">{rp.title}</p>
                        <p className="text-xs text-muted mt-1">{rp.date}</p>
                      </a>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section className="py-16 border-t border-border">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Ready to Automate?
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text mb-6">
            Turn insights into operational leverage.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/book-call" variant="primary">
              Book a Free Strategy Call
            </Button>
            <Button href="/services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}