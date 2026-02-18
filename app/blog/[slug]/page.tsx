import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";

// Placeholder post data — replace with markdown/CMS integration in production
const POSTS: Record<
  string,
  { title: string; date: string; category: string; content: string[] }
> = {
  "why-most-automation-projects-fail": {
    title: "Why Most Automation Projects Fail Before They Ship",
    date: "February 10, 2026",
    category: "Operations",
    content: [
      "The majority of automation initiatives stall not because of technical challenges, but because of poor scoping, undefined success criteria, and lack of stakeholder alignment.",
      "When a business starts an automation project without a clear definition of what success looks like, the project expands indefinitely. Every stakeholder adds requirements. The timeline stretches. The team loses confidence in the outcome.",
      "The most reliable predictor of a successful automation engagement is not the technology stack — it is the quality of the scoping process that happens before any code is written.",
      "Effective scoping requires three things: a single owner who is accountable for the outcome, measurable success criteria agreed on by all stakeholders, and a minimum viable scope that can be shipped and validated before expanding.",
      "Most organizations skip or rush this phase because it feels like delay. It is not. It is the difference between an automation that ships and delivers value, and one that consumes six months of effort and gets quietly abandoned.",
      "If you are starting an automation project, begin with a one-page scope document. Define what the system does, what it does not do, how you will measure success, and what done looks like. Sign off on it before writing a single line of code.",
    ],
  },
  "building-a-client-onboarding-system": {
    title: "Building a Client Onboarding System That Runs Without You",
    date: "January 28, 2026",
    category: "Systems",
    content: [
      "Client onboarding is the first real operational test of your business. Done well, it creates a strong first impression and sets the tone for the entire client relationship. Done manually, it creates inconsistency and burden.",
      "A well-designed onboarding automation handles account provisioning, CRM updates, project setup, welcome communications, and initial task assignment — all triggered automatically when a contract is signed or a payment is received.",
      "The key to building an onboarding system that lasts is designing around trigger events. Every onboarding begins with a single, unambiguous trigger. From that point, the system executes a defined sequence with no manual decisions required for standard clients.",
      "Non-standard cases — clients with custom requirements, special pricing, or specific tooling — should be flagged for human review rather than forcing the automation to handle every edge case. The goal is to automate the 80%, not engineer for every exception.",
      "Track your onboarding metrics from day one. Time-to-active, completion rate of onboarding tasks, and time to first value delivery are the three metrics that tell you whether your system is working.",
    ],
  },
  "ai-automation-vs-traditional-automation": {
    title: "AI Automation vs. Traditional Automation: When to Use Each",
    date: "January 14, 2026",
    category: "AI",
    content: [
      "There is a meaningful difference between traditional automation — systems that follow explicit, deterministic rules — and AI automation, which involves systems that make inferences, classify inputs, or generate outputs based on learned patterns.",
      "Traditional automation excels when the inputs are structured, the rules are known, and the expected outputs are predictable. Syncing a CRM field when a deal closes, sending a scheduled report, or routing a form submission to the correct team — these are ideal candidates for rule-based automation.",
      "AI automation becomes valuable when inputs are unstructured or variable, when classification or judgment is required, or when the volume and variety of cases makes explicit rule-writing impractical.",
      "A common mistake is reaching for AI to solve problems that traditional automation would handle more reliably and at lower cost. AI models introduce probabilistic behavior — they will occasionally produce unexpected outputs. That is acceptable for some use cases and unacceptable for others.",
      "The right framework is to start with traditional automation and add AI layers where the complexity genuinely requires it. A routing system that handles 90% of cases with rules and escalates the remaining 10% to AI will be more reliable and easier to maintain than an AI system expected to handle everything.",
    ],
  },
  "measuring-automation-roi": {
    title: "How to Measure the ROI of Automation Investments",
    date: "December 30, 2025",
    category: "Strategy",
    content: [
      "Most businesses measure automation ROI by counting hours saved. That is a useful starting point, but it captures only one dimension of the value being created.",
      "A complete ROI framework accounts for four categories: time recovered, error reduction, capacity unlocked, and compounding efficiency over time.",
      "Time recovered is straightforward — measure the time spent on the manual process before automation and compare it to the time required after. Include all people involved in the process, not just the primary owner.",
      "Error reduction is often the highest-value category and the most overlooked. Manual processes produce errors. Those errors have downstream costs — rework, client issues, delays, and reputational damage. Quantify the average error rate and the average cost per error to calculate the value of elimination.",
      "Capacity unlocked refers to what your team can now do with the time previously consumed by manual work. If a team member recovering 10 hours per week redirects that time to client work, business development, or strategic projects, the value of that capacity should be counted as part of the automation ROI.",
      "Compounding efficiency is the long-term multiplier. Systems improve over time. A well-built automation becomes more valuable as it handles more volume, integrates with more systems, and accumulates data. Year-two value is typically significantly higher than year-one value for well-maintained automation infrastructure.",
    ],
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS[params.slug];
  if (!post) {
    return generateSEO("Article Not Found | Launcify", "The requested article could not be found.");
  }
  return generateSEO(`${post.title} | Launcify`, post.content[0].substring(0, 155));
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = POSTS[params.slug];

  if (!post) {
    return (
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-semibold text-text mb-4">Article not found</h1>
          <p className="text-muted mb-8">This article does not exist or may have been moved.</p>
          <Button href="/blog" variant="secondary">
            Back to Blog
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="pt-24 pb-10 md:pt-36 md:pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-text leading-snug">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button href="/blog" variant="secondary" className="text-sm px-4 py-2">
              &larr; Back to Blog
            </Button>
            <Button href="/pricing" variant="primary" className="text-sm px-4 py-2">
              Work with Launcify
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
