import { client } from "@/sanity/lib/client";
import { getKirtankarBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import KirtankarPageClient from "./KirtankarPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Kirtankar Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const items = await client.fetch(`*[_type == "kirtankar"]{ "slug": slug.current }`);
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Kirtankar Not Found" };

    const kirtankar = await sanityFetch({
        query: getKirtankarBySlugQuery,
        params: { slug },
        tags: ['kirtankar', `kirtankar:${slug}`]
    });
    
    if (!kirtankar) return { title: "Kirtankar Not Found" };
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/kirtankars/${slug}`;

    const title = `${kirtankar.name} | Kirtankars in Pandharpur`;
    const description = `Book ${kirtankar.name} from ${kirtankar.hometown || 'Maharashtra'} for an authentic Pandharpur Kirtan experience. Specializing in ${kirtankar.specialization || 'traditional kirtans'}.`;

    return {
        title: title,
        description: description,
        keywords: [`${kirtankar.name}`, "Pandharpur Kirtankar", "book kirtankar", `${kirtankar.specialization || 'kirtan'}`, "Warkari sampradaya kirtan"],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: title,
            description: description,
            url: url,
            type: "profile",
            images: kirtankar.image ? [{ url: kirtankar.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: kirtankar.image ? [kirtankar.image] : [],
        },
    };
}

export default async function SingleKirtankarPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const kirtankar = await sanityFetch({
        query: getKirtankarBySlugQuery,
        params: { slug },
        tags: ['kirtankar', `kirtankar:${slug}`]
    });

    if (!kirtankar) {
        notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/kirtankars/${slug}`;
    
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Bookings", "item": `${baseUrl}/pandharpur-bookings` },
            { "@type": "ListItem", "position": 3, "name": "Kirtankars", "item": `${baseUrl}/pandharpur-bookings/kirtankars` },
            { "@type": "ListItem", "position": 4, "name": kirtankar.name, "item": url }
        ]
    };

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": kirtankar.name,
        "image": kirtankar.image,
        "jobTitle": "Kirtankar",
        "homeLocation": {
            "@type": "Place",
            "name": kirtankar.hometown || "Maharashtra"
        },
        "knowsAbout": [kirtankar.specialization || "Kirtan", "Warkari Sampradaya", "Pandharpur"],
        "description": `Book ${kirtankar.name} for spiritual Kirtan events in Pandharpur.`,
        "url": url
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <KirtankarPageClient kirtankar={kirtankar} />
        </>
    );
}