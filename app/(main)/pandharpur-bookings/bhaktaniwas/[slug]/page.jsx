import { client } from "@/sanity/lib/client";
import { getBhaktaniwasBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BhaktaniwasPageClient from "./_components/BhaktaniwasPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Bhaktaniwas Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const items = await client.fetch(`*[_type == "bhaktaniwas"]{ "slug": slug.current }`);
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Bhaktaniwas Not Found" };

    const item = await sanityFetch({
        query: getBhaktaniwasBySlugQuery,
        params: { slug },
        tags: ['bhaktaniwas', `bhaktaniwas:${slug}`]
    });
    
    if (!item) return { title: "Bhaktaniwas Not Found" };
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/bhaktaniwas/${slug}`;
    
    const title = `${item.name} | Pandharpur Bhaktaniwas Booking`;
    const description = `${item.name} offers peaceful bhaktaniwas accommodation in Pandharpur. Managed by ${item.managedBy || 'trusted authorities'}. Capacity: ${item.capacity || 'Multiple'} guests.`;

    return {
        title: title,
        description: description,
        keywords: [`${item.name}`, "Pandharpur bhaktaniwas", "bhaktaniwas booking", `stay managed by ${item.managedBy || 'temple'}`],
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

export default async function SingleBhaktaniwasPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const item = await sanityFetch({
        query: getBhaktaniwasBySlugQuery,
        params: { slug },
        tags: ['bhaktaniwas', `bhaktaniwas:${slug}`]
    });

    if (!item) {
        notFound();
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/bhaktaniwas/${slug}`;
    
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Bookings", "item": `${baseUrl}/pandharpur-bookings` },
            { "@type": "ListItem", "position": 3, "name": "Bhaktaniwas", "item": `${baseUrl}/pandharpur-bookings/bhaktaniwas` },
            { "@type": "ListItem", "position": 4, "name": item.name, "item": url }
        ]
    };

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": item.name,
        "image": item.image,
        "description": `${item.name} offers peaceful bhaktaniwas accommodation in Pandharpur.`,
        "amenityFeature": (item.facilities || []).map(facility => ({
            "@type": "LocationFeatureSpecification",
            "name": facility,
            "value": true
        })),
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
            <BhaktaniwasPageClient item={item} />
        </>
    );
}