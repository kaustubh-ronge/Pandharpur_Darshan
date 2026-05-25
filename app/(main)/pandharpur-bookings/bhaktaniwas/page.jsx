import { getAllBhaktaniwasQuery } from "@/sanity/lib/queries";
import { Home } from "lucide-react";
import { SharedBackground } from "@/components/SharedBackGround";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import BhaktaniwasListClient from "./_components/BhaktaniwasListClient";

/**
 * Bhaktaniwas Listing Page - Optimized for Performance & Streaming.
 */

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16 mt-15 lg:mt-10 md:mt-10">
      <div className="inline-block bg-orange-100 text-orange-700 p-3 rounded-full mb-4">
        <Home className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

async function BhaktaniwasList() {
  const allBhaktaniwas = await sanityFetch({
    query: getAllBhaktaniwasQuery,
    tags: ['bhaktaniwas']
  });

  return <BhaktaniwasListClient allBhaktaniwas={allBhaktaniwas} />;
}

export default async function BhaktaniwasPage() {
  return (
    <div className="min-h-screen">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Bhaktaniwas in Pandharpur"
          subtitle="Find affordable and convenient accommodations managed by various trusts, offering a peaceful stay for pilgrims."
        />

        <Suspense fallback={<ListingSkeleton />}>
          <BhaktaniwasList />
        </Suspense>

        <article className="max-w-4xl mx-auto mt-16 text-lg text-slate-700 dark:text-slate-300 space-y-4 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
          <p>
            A <strong>Bhaktaniwas</strong> is a traditional pilgrim rest house, typically managed by religious trusts, sansthans, or community organizations. They offer an incredibly affordable, safe, and culturally immersive way to stay in Pandharpur.
          </p>
          <p>
            Unlike commercial hotels, staying in a bhaktaniwas comes with a sense of community and shared devotion. Most bhaktaniwas complexes provide clean, basic rooms (often with attached baths) and are heavily subsidized for pilgrims. However, guests are expected to adhere to certain rules out of respect for the spiritual environment: strict vegetarianism is enforced, alcohol is strictly prohibited, and quiet hours are observed to allow pilgrims to rest after long yatras.
          </p>
          <p>
            Many prominent trusts, including the Shri Gajanan Maharaj Sansthan and the main Vitthal Rukmini Temple Trust, operate large bhaktaniwas facilities. Due to their immense popularity and low cost, they are booked very quickly. We strongly recommend contacting the management well in advance to secure your accommodation.
          </p>
        </article>
      </div>
    </div>
  );
}