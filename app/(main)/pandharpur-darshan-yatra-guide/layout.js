import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';

export const metadata = {
  title: "Pandharpur Darshan Yatra Guide & AI Trip Planner",
  description: "Plan your complete Pandharpur pilgrimage with our AI-powered route generator, day-by-day itinerary planner, and schedule builder.",
  keywords: ["Pandharpur Darshan", "Yatra Guide", "Pandharpur Trip Planner", "AI Route Generator", "Pandharpur Itinerary"],
  alternates: {
    canonical: `${baseUrl}/pandharpur-darshan-yatra-guide`,
  },
  openGraph: {
    title: "Pandharpur Darshan Yatra Guide & AI Trip Planner",
    description: "Plan your complete Pandharpur pilgrimage with our AI trip tools.",
    url: `${baseUrl}/pandharpur-darshan-yatra-guide`,
    type: "website",
  },
};

const GuideLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GuideLayout;
