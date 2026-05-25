import { CategoryGrid } from "./_components/CategoryGrid";
import { PageHeader } from "./_components/PageHeader";

export default function InformationPage() {
  return (
    <section className="relative py-20 px-6 md:px-12 mt-15">
      <div className="relative z-10 max-w-6xl mx-auto">
        <PageHeader 
          badge="Pilgrim Information"
          title="Your Guide to Pandharpur"
          subtitle="Find all the information you need for a comfortable spiritual journey."
        />

        <CategoryGrid />

        <article className="max-w-4xl mx-auto my-12 text-lg text-slate-700 dark:text-slate-300 space-y-6 text-center">
          <p>
            Pandharpur attracts millions of pilgrims annually, making it one of the most visited spiritual destinations in Maharashtra. Whether you are arriving for the grand Ashadhi Wari, the serene Kartiki Ekadashi, or a peaceful off-season darshan, finding the right accommodation, food, and transport is absolutely essential for a comfortable yatra.
          </p>
          <p>
            During peak festival seasons, the town's population swells dramatically. Planning ahead ensures that you can focus entirely on your spiritual journey rather than worrying about logistics. This comprehensive directory is designed to help you navigate the city with ease. We have curated lists of verified hotels ranging from budget-friendly rooms to premium stays, as well as traditional bhaktaniwas (pilgrim rest houses) managed by local trusts that offer affordable and peaceful accommodations.
          </p>
          <p>
            Beyond lodging, you will find resources for authentic Maharashtrian vegetarian dining, reliable travel and transport services to and within the city, and contact information for revered kirtankars who can enrich your spiritual experience with devotional storytelling and singing. Choose a category below to start planning your perfect Pandharpur darshan.
          </p>
        </article>
      </div>
    </section>
  );
}