/**
 * Phase 1 home stub. Section composition is built out in Phase 2.
 * The route exists now so the layout, header, footer, and JSON-LD are
 * all visible and verifiable end-to-end.
 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <h1 className="text-4xl font-semibold text-ink-900 sm:text-5xl">
        Phase 1 foundation is in place.
      </h1>
      <p className="mt-6 text-lg text-steel-700">
        Header, footer, mobile navigation, design tokens, layout primitives,
        and site-wide metadata are wired up. The full marketing site — hero,
        trust bar, value props, featured work, process, stats, and
        testimonials — is built in Phase 2.
      </p>
    </div>
  );
}
