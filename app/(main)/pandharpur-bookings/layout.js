import { AmberBackground } from "@/components/AmberSharedBackground";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';

export const metadata = {
  title: "Pandharpur Bookings & Pilgrim Information",
  description: "Find and book hotels, bhaktaniwas, travels, restaurants, and kirtankars in Pandharpur for your holy yatra.",
  keywords: ["Pandharpur hotels", "Bhaktaniwas booking", "Travel to Pandharpur", "Kirtankar booking", "Pandharpur restaurants"],
  alternates: {
    canonical: `${baseUrl}/pandharpur-bookings`,
  },
  openGraph: {
    title: "Pandharpur Bookings | Your Guide to a Comfortable Stay",
    description: "Find and book hotels, bhaktaniwas, travels, restaurants, and kirtankars in Pandharpur.",
    url: `${baseUrl}/pandharpur-bookings`,
    type: "website",
  },
};

// This layout applies the background ONLY to the pandharpur-bookings route.
export default function InformationPageLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AmberBackground />     
      {/* The content of your pandharpur-bookings/page.jsx will be rendered here */}
      <main>
        {children}
      </main>
 
    </div>
  );
}