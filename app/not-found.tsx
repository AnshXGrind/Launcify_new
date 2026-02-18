import Button from "@/components/Button";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-5">
            Page not found.
          </h1>
          <p className="text-muted leading-relaxed mb-10">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/" variant="primary">
              Return Home
            </Button>
            <Button href="/book-call" variant="secondary">
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
