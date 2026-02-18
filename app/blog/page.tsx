import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export const metadata: Metadata = generateSEO(
  "Blog | Launcify",
  "Insights on AI automation, operational efficiency, and systems design for scaling businesses."
);

const POSTS = [
  {
    slug: "why-most-automation-projects-fail",
    category: "Operations",
    date: "February 10, 2026",
    title: "Why Most Automation Projects Fail Before They Ship",
    excerpt:
      "The majority of automation initiatives stall not because of technical challenges, but because of poor scoping, undefined success criteria, and lack of stakeholder alignment. Here is how to avoid those failures.",
  },
  {
    slug: "building-a-client-onboarding-system",
    category: "Systems",
    date: "January 28, 2026",
    title: "Building a Client Onboarding System That Runs Without You",
    excerpt:
      "A properly designed onboarding automation does more than save time — it creates a consistent, reliable client experience that strengthens your brand from day one.",
  },
  {
    slug: "ai-automation-vs-traditional-automation",
    category: "AI",
    date: "January 14, 2026",
    title: "AI Automation vs. Traditional Automation: When to Use Each",
    excerpt:
      "Not every workflow needs AI. Understanding the boundary between deterministic automation and AI-powered decision-making will save you time, money, and unnecessary complexity.",
  },
  {
    slug: "measuring-automation-roi",
    category: "Strategy",
    date: "December 30, 2025",
    title: "How to Measure the ROI of Automation Investments",
    excerpt:
      "Hours saved is only one metric. A complete ROI framework for automation accounts for error reduction, capacity unlocked, and compounding efficiency gains over time.",
  },
];

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
          <p className="text-muted leading-relaxed max-w-2xl">
            Practical thinking on how scaling businesses can build operational
            infrastructure that compounds over time.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.map((post) => (
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
