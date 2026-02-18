import Link from "next/link";

export default function WhoWeBuildFor() {
  const cards = [
    {
      key: "startups",
      title: "Startups",
      subtitle: "MVPs · Speed to market · Investor-ready",
      href: "/case-studies?audience=startup",
      description:
        "Rapid prototyping, scalable foundations, and fast iteration to prove product-market fit.",
    },
    {
      key: "personal",
      title: "Personal Brands",
      subtitle: "Authority · Presence · Conversion",
      href: "/case-studies?audience=personal",
      description:
        "High-conversion landing experiences and content systems that build authority and drive leads.",
    },
    {
      key: "saas",
      title: "SaaS Founders",
      subtitle: "Performance · Backend · Growth",
      href: "/case-studies?audience=saas",
      description:
        "Scalable backend architecture, observability, and AI layers to drive retention and growth.",
    },
    {
      key: "business",
      title: "Growing Businesses",
      subtitle: "Automation · Revenue Systems",
      href: "/case-studies?audience=business",
      description:
        "Automations that convert manual work into predictable revenue and operational efficiency.",
    },
  ];

  return (
    <section id="who" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Who we build for</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text">Tailored systems for your growth stage</h2>
          <p className="text-muted max-w-2xl mx-auto mt-3">
            Same engineering craft. Different business outcomes. Choose the path that matches your goals.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article key={c.key} className="p-6 bg-surface rounded-lg border border-muted/20">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-primary mb-2">{c.subtitle}</p>
              <p className="text-muted text-sm mb-4">{c.description}</p>
              <Link href={c.href} className="text-sm font-medium text-accent hover:underline">
                View relevant case studies →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
