import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Platform",
    links: [
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="text-text font-semibold text-lg tracking-tight">
              Launcify
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Enterprise AI automation systems that eliminate manual work and
              scale operations without growing headcount.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                {group.heading}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-text transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Launcify. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Enterprise AI Automation Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
