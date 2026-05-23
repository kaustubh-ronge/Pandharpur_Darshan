import { client } from "@/sanity/lib/client";
import { getTravelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import TravelPageClient from "./_components/TravelPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Travel Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const travels = await client.fetch(`*[_type == "travel"]{ "slug": slug.current }`);
    return travels.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Travel Info Not Found" };

    const item = await sanityFetch({
        query: getTravelBySlugQuery,
        params: { slug },
        tags: ['travel', `travel:${slug}`]
    });
    
    if (!item) return { title: "Travel Info Not Found" };
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/travel/${slug}`;

    const title = `${item.name} | Pandharpur Travel`;
    const description = `${item.name} provides ${item.travelType || 'excellent'} travel services in Pandharpur. Key routes include: ${item.keyRoutes?.join(', ') || 'multiple spiritual destinations'}.`;

    return {
        title: title,
        description: description,
        keywords: [`${item.name}`, "Pandharpur travel", "Pandharpur taxi", `${item.travelType || 'bus'} to Pandharpur`, "travel agency in Pandharpur"],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: title,
            description: description,
            url: url,
            type: "article",
            images: item.image ? [{ url: item.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: item.image ? [item.image] : [],
        },
    };
}

export default async function SingleTravelPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await sanityFetch({
        query: getTravelBySlugQuery,
        params: { slug },
        tags: ['travel', `travel:${slug}`]
    });

    if (!item) {
        notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/travel/${slug}`;
    
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Bookings", "item": `${baseUrl}/pandharpur-bookings` },
            { "@type": "ListItem", "position": 3, "name": "Travel", "item": `${baseUrl}/pandharpur-bookings/travel` },
            { "@type": "ListItem", "position": 4, "name": item.name, "item": url }
        ]
    };

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": item.name,
        "image": item.image,
        "description": `Travel agency/service in Pandharpur: ${item.name}`,
        "openingHours": item.operatingHours || "Mo-Su 09:00-18:00",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": item.address || "Pandharpur",
            "addressLocality": "Pandharpur",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
        },
        "url": url
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <TravelPageClient item={item} />
        </>
    );
}