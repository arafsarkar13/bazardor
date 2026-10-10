import { Suspense } from "react";
import Hero from "@/components/Hero";
import Movers, { MoversSkeleton } from "@/components/Movers";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Section A: top 6 risers */}
      <Suspense fallback={<MoversSkeleton type="up" />}>
        <Movers type="up" />
      </Suspense>

      {/* Section B: top 6 fallers */}
      <Suspense fallback={<MoversSkeleton type="down" />}>
        <Movers type="down" />
      </Suspense>

      {/* TEMPORARY placeholder, replaced by the real "সব পণ্য" section in Step 8 */}
      <section
        id="সব-পণ্য"
        className="max-w-6xl mx-auto px-4 py-10 min-h-screen scroll-mt-32"
      >
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
      </section>
    </main>
  );
}
