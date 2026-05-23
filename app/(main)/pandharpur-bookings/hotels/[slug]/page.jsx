import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import HotelPageClient from "./_components/HotelPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";


export async function generateStaticParams() {
    const hotels = await client.fetch(`*[_type == "hotel"]{ "slug": slug.current }`);
    return hotels.map((hotel) => ({
        slug: hotel.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Hotel Not Found" };

    const hotel = await sanityFetch({
        query: getHotelBySlugQuery,
        params: { slug },
        tags: ['hotel', `hotel:${slug}`]
    });

    if (!hotel) return { title: "Hotel Not Found" };

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/hotels/${slug}`;

    const title = `${hotel.name} | Pandharpur Hotels`;
    const description = `${hotel.name} is a ${hotel.category || 'premium'} hotel in Pandharpur offering ${hotel.facilities?.join(', ') || 'excellent stay amenities'}. Prices range around ${hotel.priceRange || 'affordable rates'}. Book your holy stay today.`;

    return {
        title: title,
        description: description,
        keywords: [`${hotel.name}`, "Pandharpur hotel", `${hotel.category || 'budget'} stay in Pandharpur`, "hotel near Vitthal Rukmini Mandir"],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: title,
            description: description,
            url: url,
            type: "article",
            images: hotel.image ? [{ url: hotel.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: hotel.image ? [hotel.image] : [],
        },
    };
}

export default async function SingleHotelPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const hotel = await sanityFetch({
        query: getHotelBySlugQuery,
        params: { slug },
        tags: ['hotel', `hotel:${slug}`]
    });

    if (!hotel) {
        notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    
    const url = `${baseUrl}/pandharpur-bookings/hotels/${slug}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Bookings", "item": `${baseUrl}/pandharpur-bookings` },
            { "@type": "ListItem", "position": 3, "name": "Hotels", "item": `${baseUrl}/pandharpur-bookings/hotels` },
            { "@type": "ListItem", "position": 4, "name": hotel.name, "item": url }
        ]
    };

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": hotel.name,
        "image": hotel.image,
        "description": `${hotel.name} is a ${hotel.category || 'premium'} hotel in Pandharpur.`,
        "priceRange": hotel.priceRange || "$$",
        "starRating": {
            "@type": "Rating",
            "ratingValue": hotel.rating || "4.0"
        },
        "amenityFeature": (hotel.facilities || []).map(facility => ({
            "@type": "LocationFeatureSpecification",
            "name": facility,
            "value": true
        })),
        "address": {
            "@type": "PostalAddress",
            "streetAddress": hotel.address || "Pandharpur",
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
            <HotelPageClient hotel={hotel} />
        </>
    );
}