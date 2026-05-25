import { getAllTemplesQuery } from "@/sanity/lib/queries";
import HeroSection from "./_components/HeroSection";
import TempleList from "./_components/TempleList";
import FaqSection from "./_components/FaqSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";

import TempleListClient from "./_components/TempleListClient";

/**
 * Temple Listing Page - Optimized for Performance & Streaming.
 */

export const metadata = {
  title: { absolute: 'Sacred Temples of Pandharpur | Darshan Timings & History' },
  description: 'Explore the holy temples of Pandharpur, including Vitthal Rukmini Mandir, Pundalik Temple, and others. Find complete guides on history, sacred rituals, and darshan timings.',
  alternates: {
    canonical: '/temples',
  },
};

async function TempleListContainer() {
  const temples = await sanityFetch({
    query: getAllTemplesQuery,
    tags: ['temple']
  });

  return <TempleListClient temples={temples} />;
}

const vitthalMandirSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "@id": "https://pandharpurdarshan.com/temples#vitthal-rukmini-mandir",
  "name": "Shri Vitthal Rukmini Mandir",
  "alternateName": ["Vitthal Temple Pandharpur", "Pandharpur Temple", "Vithoba Temple"],
  "description": "The Vitthal-Rukmini Temple in Pandharpur, Maharashtra is one of India's most significant Hindu pilgrimage sites dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini. Millions of Warkari pilgrims visit during Ashadhi and Kartiki Ekadashi.",
  "url": "https://pandharpurdarshan.com/temples",
  "image": [
    "https://pandharpurdarshan.com/mandirpandharpur.jpg",
    "https://pandharpurdarshan.com/pandharpurmandir2.webp",
    "https://pandharpurdarshan.com/pandharpurtemple1.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pandharpur Temple Road",
    "addressLocality": "Pandharpur",
    "addressRegion": "Maharashtra",
    "postalCode": "413304",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.6778,
    "longitude": 75.3278
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "04:00",
      "closes": "23:00"
    }
  ],
  "touristType": ["Hindu Pilgrims", "Warkari", "Religious Tourists"],
  "isAccessibleForFree": true,
  "publicAccess": true,
  "containedInPlace": {
    "@type": "City",
    "name": "Pandharpur",
    "containedInPlace": {
      "@type": "State",
      "name": "Maharashtra",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    }
  },
  "hasMap": "https://maps.google.com/?q=Vitthal+Rukmini+Mandir+Pandharpur"
};

export default async function TemplePage() {
  return (
    <div className="mt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vitthalMandirSchema) }}
      />
      <HeroSection />

      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16"><ListingSkeleton /></div>}>
        <TempleListContainer />
      </Suspense>
      
      <article className="max-w-4xl mx-auto my-16 px-6 prose prose-lg prose-slate dark:prose-invert prose-headings:text-orange-600">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8">Sacred Temples of Pandharpur</h1>
        
        <h2>Shri Vitthal Rukmini Mandir — The Soul of Pandharpur</h2>
        <p>
          The <strong>Shri Vitthal Rukmini Mandir</strong> is the centerpiece of Pandharpur and one of the most revered pilgrimage sites in Maharashtra. Dating back to at least the 13th century (though local legends suggest it is much older), the temple is dedicated to Lord Vitthal—a beloved incarnation of Lord Krishna—and his divine consort, Mata Rukmini. 
        </p>
        <p>
          The architecture of the temple is a sprawling complex with multiple smaller shrines, massive wooden doors, and intricately carved stone pillars. The most striking and unique feature of the main deity is Lord Vitthal's posture. He stands resting his hands on his hips, waiting patiently on a brick (known as the <em>paithani</em> or <em>vit</em>). Unlike many orthodox temples, the Vitthal Mandir allows devotees to physically touch the feet of the deity during the <em>Padsparsh Darshan</em>, fostering an incredibly personal and emotional connection between the devotee and the divine.
        </p>

        <h2>Pundalik Temple</h2>
        <p>
          You cannot understand Pandharpur without understanding the legend of Pundalik. Located right on the sandy banks of the Chandrabhaga River, the <strong>Pundalik Temple</strong> honors the man whose sheer devotion brought Lord Krishna to Pandharpur.
        </p>
        <p>
          According to the legend, Pundalik was a devoted son who spent his days serving his elderly parents. Impressed by his unwavering dedication, Lord Krishna visited him. However, Pundalik was busy massaging his parents' feet. Instead of stopping his service, he tossed a brick (vit) towards the Lord and asked him to wait. The Lord, moved by Pundalik's filial piety, stood on the brick, hands on his hips, and waited. He has been waiting there ever since as Lord Vitthal. Visiting the Pundalik Temple and bathing in the Chandrabhaga is considered a necessary rite before proceeding to the main Vitthal Mandir.
        </p>

        <h2>Other Important Temples in Pandharpur</h2>
        <p>
          While the Vitthal Rukmini Mandir is the focal point, the spiritual landscape of Pandharpur is dotted with several other significant shrines:
        </p>
        <ul>
          <li><strong>Shri Gajanan Maharaj Mandir:</strong> A peaceful and incredibly clean temple complex dedicated to the revered saint from Shegaon. It provides an excellent space for meditation and offers extensive <em>bhaktaniwas</em> (accommodation) facilities for pilgrims.</li>
          <li><strong>Shri Tulja Bhavani Temple:</strong> A temple dedicated to Goddess Tulja Bhavani, the family deity of Chhatrapati Shivaji Maharaj. Devotees often visit here to seek the Goddess's blessings for strength and prosperity.</li>
          <li><strong>Vishnupad Temple:</strong> Located slightly south of the main town in the middle of the river, this temple features the footprints of Lord Krishna and his cows, naturally imprinted on the stone.</li>
        </ul>

        <h2>Darshan Timings & Practical Info</h2>
        <p>
          The temple operates on a strict schedule, which is extended during the Wari festivals. Knowing the timings is crucial for planning your visit. For a complete itinerary, check our <a href="/pandharpur-darshan-yatra-guide" className="text-orange-600 hover:underline">Complete Darshan Yatra Guide</a>.
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-gray-300 text-base">
            <thead>
              <tr className="bg-orange-50 dark:bg-slate-800">
                <th className="border border-gray-300 px-4 py-2 text-left text-orange-800 dark:text-orange-200">Session</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-orange-800 dark:text-orange-200">Timings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Morning Darshan</td>
                <td className="border border-gray-300 px-4 py-2">4:00 AM – 12:00 PM</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Afternoon (Restricted)</td>
                <td className="border border-gray-300 px-4 py-2">12:00 PM – 2:00 PM</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Evening Darshan</td>
                <td className="border border-gray-300 px-4 py-2">4:00 PM – 11:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <FaqSection />
    </div>
  );
}