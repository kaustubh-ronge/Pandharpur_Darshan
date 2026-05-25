import { getAllTravelsQuery } from "@/sanity/lib/queries";
import { Bus } from "lucide-react";
import { SharedBackground } from "@/components/SharedBackGround";
import TravelsCard from "@/app/(main)/pandharpur-bookings/travel/_components/TravelsCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";

/**
 * Travel Listing Page - Optimized for Performance & Streaming.
 */

import TravelListClient from "./_components/TravelListClient";

/**
 * Travel Listing Page - Optimized for Performance & Streaming.
 */

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16 mt-5 lg:mt-0 md:mt-5">
      <div className="inline-block bg-purple-100 text-purple-700 p-3 rounded-full mb-4">
        <Bus className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

async function TravelList() {
  const travelOptions = await sanityFetch({
    query: getAllTravelsQuery,
    tags: ['travel']
  });

  return <TravelListClient travelOptions={travelOptions} />;
}

export default async function TravelPage() {
  return (
    <div className="min-h-screen mt-10">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Travel &amp; Transport in Pandharpur"
          subtitle="Find information on how to reach Pandharpur and get around the city, from bus services to local rickshaws."
        />

        <Suspense fallback={<ListingSkeleton />}>
          <TravelList />
        </Suspense>

        <article className="max-w-4xl mx-auto mt-16 text-lg text-slate-700 dark:text-slate-300 space-y-4 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
          <p>
            Getting to Pandharpur is highly convenient from across Maharashtra. The city is well-connected by road and rail networks. Most pilgrims arrive via the Pandharpur Railway Station (PVR), which runs special trains from Pune, Mumbai, and Solapur during major festivals. If you prefer traveling by road, MSRTC (ST buses) and private tourist buses operate frequent services from all major hubs.
          </p>
          <p>
            For those driving, Pandharpur is approximately 250 kilometers from Pune, 75 kilometers from Solapur, and 180 kilometers from Kolhapur. The highways leading into the city are well-maintained, ensuring a smooth drive for families and tour groups alike.
          </p>
          <p>
            Once inside the city, navigating is primarily done through auto-rickshaws and shared jeeps. Many of the core temple areas and narrow lanes around the Chandrabhaga River are best explored on foot. Below, you will find a curated list of trusted local travel operators and intercity transport services to help you plan a seamless journey.
          </p>
        </article>
      </div>
    </div>
  );
}