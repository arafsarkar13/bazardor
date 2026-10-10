import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

// TEMPORARY: shows 4 cards so we can test the design.
// The real sections replace this in Steps 7 and 8.
async function CardPreview() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="সব-পণ্য"
        className="max-w-6xl mx-auto px-4 py-10 min-h-screen scroll-mt-32 space-y-6"
      >
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <Suspense fallback={<div className="skeleton h-44 w-full"></div>}>
          <CardPreview />
        </Suspense>
      </section>
    </main>
  );
}
