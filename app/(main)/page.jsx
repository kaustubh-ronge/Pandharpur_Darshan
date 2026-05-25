import Hero from '@/components/HeroComponents/Hero'
import React from 'react'

export const metadata = {
  title: { absolute: 'Pandharpur Darshan | Complete Yatra Guide & Bookings' },
  description: 'The official platform for Pandharpur Darshan. Find complete guides for Pandharpur Wari, Ashadhi Ekadashi, Vitthal Rukmini temple timings, and easily book hotels, bhaktaniwas, and travels.',
  openGraph: {
    title: 'Pandharpur Darshan | Complete Yatra Guide & Bookings',
    description: 'The official platform for Pandharpur Darshan. Find complete guides for Pandharpur Wari, Ashadhi Ekadashi, Vitthal Rukmini temple timings, and easily book hotels, bhaktaniwas, and travels.',
    url: '/',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

const organizationAndWebsiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pandharpurdarshan.com/#website",
      "url": "https://pandharpurdarshan.com",
      "name": "Pandharpur Darshan",
      "description": "The official platform for Pandharpur Darshan. Find complete guides for Pandharpur Wari, Ashadhi Ekadashi, Vitthal Rukmini temple timings, and easily book hotels, bhaktaniwas, and travels.",
      "inLanguage": ["en", "mr"],
      "publisher": {
        "@id": "https://pandharpurdarshan.com/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://pandharpurdarshan.com/#organization",
      "name": "Pandharpur Darshan",
      "url": "https://pandharpurdarshan.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pandharpurdarshan.com/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7498444684",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Marathi"]
      },
      "sameAs": [
        "https://www.instagram.com/pandharpur__darshan",
        "https://www.linkedin.com/company/vithai-software-solutions/"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pandharpur",
        "addressRegion": "Maharashtra",
        "postalCode": "413304",
        "addressCountry": "IN"
      }
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best time to join the Pandharpur Yatra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main pilgrimage happens during Ashadhi Ekadashi (usually July), but joining 1–2 weeks before allows you to experience the full journey from Pune or Alandi."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an age limit for the Pandharpur Yatra participants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no age limit, but children under 12 and seniors over 70 should be accompanied by family members during the yatra."
      }
    },
    {
      "@type": "Question",
      "name": "What should I bring for the Pandharpur Yatra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pack comfortable walking shoes, light cotton clothes, a water bottle, basic medicines, and minimal personal items. The yatra involves walking long distances."
      }
    }
  ]
};

const Home = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationAndWebsiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
    </div>
  )
}

export default Home
