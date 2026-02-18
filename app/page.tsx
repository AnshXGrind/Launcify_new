import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Container from "@/components/Container";

const PROBLEMS = [
  {
    title: "Manual Processes at Scale",
    description:
      "Your team spends hours every week on repetitive tasks — data entry, report generation, client follow-ups — that should be fully automated.",
  },
  {
    title: "Disconnected Systems",
    description:
      "Your tools do not talk to each other. Data moves through spreadsheets and manual handoffs, creating errors and delays that compound over time.",
  },
  {
    title: "Growth Without Infrastructure",
    description:
      "Revenue is growing, but your backend operations are not keeping pace. Every new client adds to your team's load rather than running on autopilot.",
  },
];

const SOLUTIONS = [
  {
    title: "End-to-End Workflow Automation",
    description:
      "We map your highest-cost manual processes and replace them with intelligent automation pipelines built specifically for your business logic.",
  },
  {
    title: "Systems Integration",
    description:
      "We connect your CRM, project management tools, communication platforms, and data sources into a unified automated ecosystem.",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "We implement AI layers that classify, prioritize, summarize, and act on information — so your team focuses only on decisions that require human judgment.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Operations Audit",
    description:
      "We conduct a structured audit of your current workflows, tools, and time allocation to identify the highest-leverage automation opportunities.",
  },
  {
    step: "02",
    title: "System Architecture",
    description:
      "We design a custom automation architecture tailored to your stack, integrating with existing tools and building net-new systems where needed.",
  },
  {
    step: "03",
    title: "Build and Deploy",
    description:
      "We build, test, and deploy your automation systems with full documentation and a structured handover process to ensure long-term reliability.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Enterprise AI Automation
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-text mb-6">
              Automate the work your team should not be doing.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-2xl">
              Launcify builds custom AI automation systems that eliminate
              repetitive operations, integrate your business tools, and recover
              20 or more hours per week — without expanding headcount.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/pricing" variant="primary">
                View Engagement Options
              </Button>
              <Button href="/case-studies" variant="secondary">
                See Client Results
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section id="problem">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            The Problem
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
            Operational drag is costing you more than you realize.
          </h2>
          <p className="text-muted max-w-2xl">
            Most scaling businesses are operating with brittle, manual
            processes that limit throughput and create unnecessary risk.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-text mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Solution */}
      <Section id="solution" className="bg-surface">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
            Intelligent systems built around how you operate.
          </h2>
          <p className="text-muted max-w-2xl">
            We do not sell off-the-shelf tools. Every system we build is
            designed from the ground up to fit your workflows, your data, and
            your team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOLUTIONS.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-text mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section id="process">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
            A structured engagement, start to finish.
          </h2>
          <p className="text-muted max-w-2xl">
            No ambiguity. No scope creep. A clear process with defined
            deliverables at every stage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="border-l-2 border-primary pl-6">
              <p className="text-xs font-semibold text-primary mb-2">
                {item.step}
              </p>
              <h3 className="text-base font-semibold text-text mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Case Study Preview */}
      <Section id="case-studies" className="bg-surface">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Client Results
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
            Measurable outcomes, not promises.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              B2B SaaS — Operations
            </p>
            <h3 className="text-xl font-semibold text-text mb-3">
              32 hours per week recovered through automated client onboarding.
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Manual onboarding tasks across CRM, project setup, and welcome
              communications were fully automated, reducing time-to-active from
              5 days to under 4 hours.
            </p>
            <Button href="/case-studies" variant="secondary" className="text-sm px-4 py-2">
              Read the case study
            </Button>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Professional Services — Finance
            </p>
            <h3 className="text-xl font-semibold text-text mb-3">
              Monthly reporting reduced from 3 days to 2 hours with AI
              summarization.
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              We built an automated pipeline that pulls data from multiple
              sources, runs AI analysis, and delivers formatted reports to
              stakeholders — with zero manual intervention.
            </p>
            <Button href="/case-studies" variant="secondary" className="text-sm px-4 py-2">
              Read the case study
            </Button>
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="cta">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text mb-5">
            Ready to eliminate manual work from your operations?
          </h2>
          <p className="text-muted mb-10 leading-relaxed">
            We work with a limited number of clients each quarter to ensure
            quality. If you are ready to build systems that scale, let us talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/pricing" variant="primary">
              View Engagement Options
            </Button>
            <Button href="/about" variant="secondary">
              Learn About Launcify
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
