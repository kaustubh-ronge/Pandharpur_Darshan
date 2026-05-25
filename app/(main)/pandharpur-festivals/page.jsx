import { majorFestivals } from '@/data/FestivalsPageData/majorFestivals';
import { monthlyEvents } from '@/data/FestivalsPageData/monthlyEvents';
import { specialRituals } from '@/data/FestivalsPageData/specialRituals';
import { dailyRituals } from '@/data/FestivalsPageData/dailyRituals';
import { festivalHighlights } from '@/data/FestivalsPageData/festivalHighlights';
import FestivalsPageClient from './_components/FestivalsPageClient';

export const metadata = {
  title: { absolute: 'Pandharpur Festivals & Yatra Guide | Important Events' },
  description: 'Explore the vibrant festivals of Pandharpur, including Ashadhi Ekadashi, Kartiki Ekadashi, daily rituals, and major celebrations of Lord Vitthal.',
  openGraph: {
    title: 'Pandharpur Festivals & Yatra Guide | Important Events',
    description: 'Explore the vibrant festivals of Pandharpur, including Ashadhi Ekadashi, Kartiki Ekadashi, and major celebrations.',
    url: '/pandharpur-festivals',
  },
  alternates: {
    canonical: '/pandharpur-festivals',
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "@id": "https://pandharpurdarshan.com/pandharpur-festivals#ashadhi-ekadashi-2026",
      "name": "Ashadhi Ekadashi 2026 — Pandharpur Wari",
      "alternateName": ["Ashadhi Wari", "Pandharpur Yatra Ashadhi"],
      "description": "The largest Warkari pilgrimage to Pandharpur. Millions of devotees walk to Vitthal Rukmini Mandir carrying the padukas of saints Dnyaneshwar and Tukaram in grand palkhi processions.",
      "startDate": "2026-06-25",
      "endDate": "2026-07-05",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Vitthal Rukmini Mandir, Pandharpur",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pandharpur",
          "addressRegion": "Maharashtra",
          "postalCode": "413304",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.6778,
          "longitude": 75.3278
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Shri Vitthal Rukmini Mandir Sansthan",
        "url": "https://vitthalrukminimandir.org.in"
      },
      "image": "https://pandharpurdarshan.com/og-images/ashadhi-ekadashi.jpg",
      "url": "https://pandharpurdarshan.com/pandharpur-festivals",
      "isAccessibleForFree": true
    },
    {
      "@type": "Event",
      "@id": "https://pandharpurdarshan.com/pandharpur-festivals#kartiki-ekadashi-2027",
      "name": "Kartiki Ekadashi 2026 — Pandharpur Winter Wari",
      "description": "The winter pilgrimage of Warkaris to Pandharpur with special night prayers and devotional gatherings at Vitthal Rukmini Mandir.",
      "startDate": "2026-11-01",
      "endDate": "2026-11-02",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Vitthal Rukmini Mandir, Pandharpur",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pandharpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "isAccessibleForFree": true,
      "url": "https://pandharpurdarshan.com/pandharpur-festivals"
    },
    {
      "@type": "Event",
      "@id": "https://pandharpurdarshan.com/pandharpur-festivals#guru-purnima-2026",
      "name": "Guru Purnima 2026 — Pandharpur",
      "description": "Devotional rituals honoring spiritual gurus at Vitthal Rukmini Mandir, Pandharpur.",
      "startDate": "2026-07-18",
      "endDate": "2026-07-20",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Pandharpur, Maharashtra",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pandharpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "isAccessibleForFree": true,
      "url": "https://pandharpurdarshan.com/pandharpur-festivals"
    }
  ]
};

export default function FestivalsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />
            <div className="mt-[80px]">
                <FestivalsPageClient
                    majorFestivals={majorFestivals}
                    monthlyEvents={monthlyEvents}
                    specialRituals={specialRituals}
                    dailyRituals={dailyRituals}
                    festivalHighlights={festivalHighlights}
                />

                <article className="max-w-4xl mx-auto my-16 px-6 prose prose-lg prose-slate dark:prose-invert prose-headings:text-orange-600">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8">Pandharpur Festival Calendar — Sacred Events Throughout the Year</h1>
                    
                    <p className="lead text-xl text-slate-600 dark:text-slate-400 text-center mb-12">
                        Pandharpur is the spiritual heartbeat of Maharashtra, vibrating with devotion year-round. Discover the grand traditions, historical significance, and practical details of the major Wari festivals.
                    </p>

                    <h2>Ashadhi Ekadashi — The Grand Wari</h2>
                    <p>
                        <strong>Ashadhi Ekadashi</strong> is not just a festival; it is the culmination of a massive, centuries-old spiritual movement. Rooted in a 700+ year tradition initiated by great saints like Sant Dnyaneshwar and Sant Tukaram, the Ashadhi Wari represents the pinnacle of devotion in the Warkari sect.
                    </p>
                    <p>
                        For weeks leading up to the auspicious day, millions of devotees walk barefoot from various parts of Maharashtra. They carry the silver <em>padukas</em> (footwear) of revered saints in beautifully decorated palanquins (<em>palkhis</em>). The two most prominent processions start from Alandi (Sant Dnyaneshwar's palkhi) and Dehu (Sant Tukaram's palkhi). The entire journey is accompanied by the rhythmic beats of taal and mridangam, alongside continuous chanting of "Gyanba-Tukaram."
                    </p>
                    <p>
                        <strong>2026 Dates & Preparation:</strong> The primary festival period for 2026 spans from June 25 to July 5. During this time, the population of Pandharpur swells by millions. If you plan to attend, it is critical to prepare well in advance. Accommodation is completely booked months ahead. We highly recommend exploring our <a href="/pandharpur-bookings" className="text-orange-600 hover:underline">Pandharpur Bookings</a> directory to secure hotels or bhaktaniwas rooms early. Expect massive crowds, immense spiritual energy, and a true test of physical endurance and devotion.
                    </p>

                    <h2>Kartiki Ekadashi — The Winter Wari</h2>
                    <p>
                        Occurring in the Hindu month of Kartik (typically late October or November), <strong>Kartiki Ekadashi</strong> marks the second most significant event in Pandharpur. While Ashadhi Ekadashi signifies the beginning of Lord Vishnu's four-month slumber (Chaturmas), Kartiki Ekadashi celebrates His awakening.
                    </p>
                    <p>
                        The crowds during Kartiki Ekadashi, while still numbering in the hundreds of thousands, are slightly more manageable compared to the summer Wari. This makes it an ideal time for pilgrims who want to experience the grandeur of the festival but prefer slightly cooler weather and marginally shorter darshan queues. The spiritual atmosphere remains equally potent, with night-long kirtans and bhajans echoing through the temple courtyards. For 2026, the main festivities are expected around November 1st and 2nd.
                    </p>

                    <h2>Other Annual Festivals</h2>
                    <p>
                        Beyond the two major Ekadashis, the Shri Vitthal Rukmini Mandir hosts numerous other vibrant celebrations throughout the year:
                    </p>
                    <ul>
                        <li><strong>Guru Purnima:</strong> A day dedicated to spiritual teachers and gurus. Special prayers are offered to Lord Vitthal as the ultimate universal teacher. The town sees a significant influx of devotees paying respects to their personal gurus as well.</li>
                        <li><strong>Makar Sankranti:</strong> Celebrating the harvest and the transition of the sun, this festival features special offerings of sesame and jaggery (til-gul) to the deity.</li>
                        <li><strong>Chaitra Yatra:</strong> Another important gathering occurring in the spring, though mostly attended by local and regional devotees.</li>
                        <li><strong>Shivaji Jayanti:</strong> Celebrating the birth of Chhatrapati Shivaji Maharaj. The town partakes in cultural processions, highlighting the historic link between the Maratha empire and the Warkari tradition.</li>
                    </ul>

                    <p>
                        No matter when you choose to visit, participating in a Pandharpur festival offers a profound, life-altering experience. The collective energy of millions singing in unison creates an atmosphere that words can scarcely describe.
                    </p>
                </article>
            </div>
        </>
    );
}