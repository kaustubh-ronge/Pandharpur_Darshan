import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com'),
    title: {
        default: "Pandharpur Darshan | Your Complete Guide to the Holy Town",
        template: "%s | Pandharpur Darshan"
    },
    description: "Official guide for Pandharpur Darshan. Find information about Lord Vitthal temple timings, festivals, yatra guides, attractions, and local facilities.",
    icons: {
        icon: '/pandharpur-darshan-logo.jpeg',
        shortcut: '/pandharpur-darshan-logo.jpeg',
        apple: '/pandharpur-darshan-logo.jpeg',
    },
    twitter: {
        card: 'summary_large_image',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {


    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
                <head>
                    <link rel="icon" href="/pandharpur-darshan-logo.jpeg" type="image/jpeg" />
                    <link rel="apple-touch-icon" href="/pandharpur-darshan-logo.jpeg" />
                </head>
                <body className="font-poppins antialiased">
                    <main className="min-h-screen">{children}</main>
                    <SpeedInsights />
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}

