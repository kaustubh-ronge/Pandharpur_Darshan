// File: app/(main)/pandharpur-darshan-yatra-guide/page.jsx

import { ppur_attractions } from '@/data/guidePageData/pandharpurAttractions';
import TripPlannerPage from './_components/TripPlannerPage';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const GuidePage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pandharpur Darshan AI Trip Planner",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "All",
    "description": "An AI-powered trip planner and route generator for your pilgrimage to Pandharpur. Get personalized day-by-day itineraries and schedule planning.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "url": `${baseUrl}/pandharpur-darshan-yatra-guide`
  };

  return (
    <div className="mt-25 min-h-screen dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 text-transparent bg-clip-text mb-4">
          Complete Pandharpur Darshan Guide — Your Step-by-Step Yatra Companion
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Plan your complete Pandharpur pilgrimage with our step-by-step guide and AI-powered route generator.
        </p>
      </div>

      <TripPlannerPage GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} ppur_attractions={ppur_attractions} />

      <article className="max-w-4xl mx-auto mt-16 mb-16 prose prose-lg prose-slate dark:prose-invert prose-headings:text-orange-600">
        <h2>What is Pandharpur Darshan?</h2>
        <p>
          The <strong>Pandharpur Darshan guide</strong> begins with understanding the profound spiritual significance of the Shri Vitthal Rukmini Mandir. Located on the banks of the sacred Chandrabhaga River in Maharashtra, Pandharpur is the spiritual capital for millions of devotees. For over 700 years, the Warkari sect has kept the tradition of the Pandharpur Wari alive, walking hundreds of kilometers to seek the blessings of Lord Vitthal (a beloved incarnation of Lord Krishna) and Mata Rukmini. 
        </p>
        <p>
          Taking darshan here is not just a visit to a temple; it is the culmination of an intense, heartfelt pilgrimage. Devotees believe that simply bathing in the Chandrabhaga River and catching a glimpse of Lord Vitthal standing on his legendary brick (the <em>paithani</em>) washes away lifetimes of sins and grants ultimate peace.
        </p>

        <h2>Best Time to Visit Pandharpur</h2>
        <p>
          The town is bustling year-round, but your experience will vary drastically depending on when you choose to visit:
        </p>
        <ul>
          <li><strong>Ashadhi Ekadashi (June–July):</strong> This is the absolute peak of the Pandharpur yatra route. Millions of pilgrims converge on the city, carrying palkhis (palanquins) of saints like Dnyaneshwar and Tukaram. The atmosphere is electric with devotion, though darshan queues can last for over 24 hours.</li>
          <li><strong>Kartiki Ekadashi (October–November):</strong> The second major event of the year, signaling the end of the Chaturmas period. It draws massive crowds but is slightly more manageable than Ashadhi.</li>
          <li><strong>Off-Season (Weekdays and non-festive months):</strong> If you are traveling with elderly family members or young children, visiting during off-peak times allows for a much quicker, more peaceful darshan experience.</li>
        </ul>

        <h2>How to Reach Pandharpur</h2>
        <p>
          Because of its importance, getting to Pandharpur is highly convenient via multiple modes of transportation. Knowing exactly <em>how to reach Pandharpur</em> helps you plan your itinerary efficiently.
        </p>
        <ul>
          <li><strong>By Train:</strong> The Pandharpur Railway Station (PVR) is well-connected. Dedicated special trains run from Mumbai, Pune, Solapur, and Miraj during major festivals. From the station, the temple is just a short auto-rickshaw ride away.</li>
          <li><strong>By Bus:</strong> The Maharashtra State Road Transport Corporation (MSRTC) runs frequent buses (ST buses) from all major cities including Pune, Solapur, Kolhapur, and Sangli. The Pandharpur ST stand is located centrally.</li>
          <li><strong>By Road:</strong> Driving is a popular option. Pandharpur is roughly 75 km from Solapur, 250 km from Pune, and about 360 km from Mumbai. The roads are generally well-maintained, with plenty of roadside amenities and dhabas catering to pilgrims.</li>
        </ul>

        <h2>Vitthal Rukmini Mandir — Darshan Timings</h2>
        <p>
          Familiarizing yourself with the <strong>Vitthal temple timings</strong> is crucial to avoid long, unnecessary waits. There are two primary types of darshan: Mukh Darshan (viewing the deity from a distance) and Padsparsh Darshan (touching the feet of Lord Vitthal).
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-gray-300">
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
        <p className="text-sm italic">
          * Note: Timings are subject to change during major festivals like Ashadhi and Kartiki Ekadashi. You can find more detailed temple information in our <a href="/temples" className="text-orange-600 hover:underline">Temples Directory</a>.
        </p>

        <h2>What to Expect During Darshan</h2>
        <p>
          The queue system in Pandharpur is well-organized but requires patience. The Padsparsh Darshan queue physically weaves through dedicated multi-story buildings to manage the crowd. 
        </p>
        <p>
          <strong>Dress Code:</strong> Traditional Indian attire is highly recommended. Men typically wear dhoti-kurta or formal trousers, while women wear sarees or modest salwar kameez. Western wear, especially shorts or sleeveless tops, should be avoided as a mark of respect.
        </p>
        <p>
          <strong>Security:</strong> Mobile phones, cameras, leather items, and large bags are strictly prohibited inside the main sanctum. Secure locker facilities are available near the temple entrances.
        </p>

        <h2>Where to Stay in Pandharpur</h2>
        <p>
          Accommodation in Pandharpur ranges from ultra-affordable dharmashalas to comfortable mid-range hotels. If you are traveling during Ekadashi, booking months in advance is absolutely necessary. 
        </p>
        <p>
          Many pilgrims prefer staying in <strong>Bhaktaniwas</strong> (pilgrim rest houses) managed by various trusts, which offer clean, basic rooms at minimal costs. For a complete list of verified accommodations, browse our <a href="/pandharpur-bookings" className="text-orange-600 hover:underline">Pandharpur Bookings</a> hub, where you can easily find hotels, bhaktaniwas, and local restaurants.
        </p>

        <h2>Pandharpur Pilgrimage Tips</h2>
        <p>To ensure your yatra is smooth and spiritually fulfilling, keep these <strong>Pandharpur pilgrimage tips</strong> in mind:</p>
        <ul>
          <li><strong>Hydration:</strong> The weather can be exceptionally hot, especially from March to June. Carry a reusable water bottle.</li>
          <li><strong>ID Proof:</strong> Always carry valid government-issued ID; it is required for hotel check-ins and sometimes for special darshan passes.</li>
          <li><strong>Local Cuisine:</strong> Enjoy local Maharashtrian vegetarian thalis, varan-bhaat, and the famous Pandharpuri pedha (a milk-based sweet offered as prasad).</li>
          <li><strong>Beware of Touts:</strong> Only rely on official temple authorities for darshan passes or donation receipts. Do not engage with unauthorized agents promising faster darshan.</li>
          <li><strong>Medical Kit:</strong> If you are participating in the walking Wari, carry a basic first-aid kit, pain relievers, and any prescription medications.</li>
        </ul>

        <div className="mt-12 p-6 bg-orange-50 dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
          <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-2">Ready to plan your trip?</h3>
          <p className="text-lg">Use our AI Trip Planner above to create a personalized, day-by-day itinerary! &uarr;</p>
        </div>
      </article>
    </div>
  );
};

export default GuidePage;