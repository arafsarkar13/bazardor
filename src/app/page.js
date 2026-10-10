import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* TEMPORARY placeholder so the CTA has somewhere to scroll to.
          The real "সব পণ্য" section replaces it in Step 8. */}
      <section
        id="সব-পণ্য"
        className="max-w-6xl mx-auto px-4 py-10 min-h-screen scroll-mt-32"
      >
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
      </section>
    </main>
  );
}
