import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = generateSEO(
  "Blog | Launcify",
  "Insights on AI automation, operational efficiency, and systems design for scaling businesses.",
  "/blog"
);

const CATEGORIES = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl">
            Insights on automation, systems, and operational scale.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl mb-10">
            Practical thinking on how scaling businesses can build operational
            infrastructure that compounds over time.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary/20 rounded-full px-4 py-1.5"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-muted">{post.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-text mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-primary hover:text-primary-hover transition-colors duration-150 font-medium"
              >
                Read article &rarr;
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
