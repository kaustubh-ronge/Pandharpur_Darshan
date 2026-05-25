import { getAllHotelsQuery } from "@/sanity/lib/queries";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import HotelListClient from "./_components/HotelListClient";


function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-16 md:mb-20 mt-[50px]">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-800">
        {title}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-slate-500">{subtitle}</p>
      <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
    </div>
  );
}

// Separate component for the data-fetching part to enable streaming
async function HotelList() {
  const hotels = await sanityFetch({
    query: getAllHotelsQuery,
    tags: ['hotel']
  });

  return <HotelListClient hotels={hotels} />;
}

export default async function HotelsPage() {
  return (
    <div className="min-h-screen">
      <BlueBackground />
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <PageHeader
            title="Accommodations in Pandharpur"
            subtitle="Find the perfect place to stay, from deluxe hotels to budget-friendly lodges, for a comfortable and blessed pilgrimage."
          />

          <Suspense fallback={<ListingSkeleton />}>
            <HotelList />
          </Suspense>

          <article className="max-w-4xl mx-auto mt-16 text-lg text-slate-700 dark:text-slate-300 space-y-4 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
            <p>
              Pandharpur offers a wide variety of hotels catering to different budgets and preferences. Whether you are looking for a luxurious stay with modern amenities or a simple, clean, and budget-friendly room, you will find numerous options located conveniently close to the main temple area.
            </p>
            <p>
              Proximity to the Shri Vitthal Rukmini Mandir is often the primary criterion for pilgrims when selecting a hotel. Staying near the temple or the Chandrabhaga River ensures that you can easily walk to early morning darshans and river baths without relying on local transport. 
            </p>
            <p>
              <strong>Booking Tip:</strong> If you are planning your visit during major festivals like Ashadhi Ekadashi or Kartiki Ekadashi, it is highly recommended to book your hotel at least 3 to 4 weeks in advance, as accommodations fill up exceptionally fast. If you are looking for trust-run accommodations, please check our <a href="/pandharpur-bookings/bhaktaniwas" className="text-orange-600 hover:underline font-medium">Bhaktaniwas directory</a>.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
