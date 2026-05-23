import { getOwnerWhatsAppNumberQuery } from "@/sanity/lib/queries";
import JoinUsClientPage from "./_components/JoinUsClientPage";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Join Us Page - Optimized for Performance.
 */

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';

export const metadata = {
  title: "Partner with Us | Pandharpur Darshan",
  description: "Join the largest network of verified services in Pandharpur. Connect with thousands of devotees actively looking for accommodations, food, and transport.",
  keywords: ["Partner with Pandharpur Darshan", "List Business Pandharpur", "Grow Business Pandharpur", "Join Pandharpur Darshan"],
  alternates: {
    canonical: `${baseUrl}/join-us`,
  },
  openGraph: {
    title: "Grow Your Business in Pandharpur | Partner with Us",
    description: "Join our network of local businesses and services. Connect directly with pilgrims and tourists.",
    url: `${baseUrl}/join-us`,
    type: "website",
  },
};

const JoinUsPage = async () => {
  // Performance: Using sanityFetch with tag instead of force-dynamic
  const ownerContact = await sanityFetch({
    query: getOwnerWhatsAppNumberQuery,
    tags: ['ownerContact']
  });
  
  const ownerWhatsAppNumber = ownerContact?.whatsappNumber;

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-orange-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-black"></div>
      </div>
      
      <div className="relative z-10">
        <JoinUsClientPage ownerWhatsAppNumber={ownerWhatsAppNumber} />
      </div>
    </div>
  );
};

export default JoinUsPage;