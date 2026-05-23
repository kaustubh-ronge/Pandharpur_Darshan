import { client } from "@/sanity/lib/client";
import { getRestaurantBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import RestaurantPageClient from "./_components/RestaurantPageClient";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Restaurant Detail Page - Optimized for Performance.
 */

export async function generateStaticParams() {
    const restaurants = await client.fetch(`*[_type == "restaurant"]{ "slug": slug.current }`);
    return restaurants.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) return { title: "Restaurant Not Found" };

    const restaurant = await sanityFetch({
        query: getRestaurantBySlugQuery,
        params: { slug },
        tags: ['restaurant', `restaurant:${slug}`]
    });
    
    if (!restaurant) return { title: "Restaurant Not Found" };
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/restaurants/${slug}`;

    const title = `${restaurant.name} | Pandharpur Restaurants`;
    const description = `Dine at ${restaurant.name} in Pandharpur. We serve authentic ${restaurant.cuisineType || 'local'} food. Specializing in ${restaurant.specialtyDish || 'delicious meals'}.`;

    return {
        title: title,
        description: description,
        keywords: [`${restaurant.name}`, "Pandharpur restaurant", `${restaurant.cuisineType || 'veg'} food in Pandharpur`, "places to eat in Pandharpur"],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: title,
            description: description,
            url: url,
            type: "article",
            images: restaurant.image ? [{ url: restaurant.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: restaurant.image ? [restaurant.image] : [],
        },
    };
}

export default async function SingleRestaurantPage(props) {
    const params = await props?.params;
    const slug = params?.slug;
    if (!slug) {
        notFound();
    }

    const restaurant = await sanityFetch({
        query: getRestaurantBySlugQuery,
        params: { slug },
        tags: ['restaurant', `restaurant:${slug}`]
    });

    if (!restaurant) {
        notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';
    const url = `${baseUrl}/pandharpur-bookings/restaurants/${slug}`;
    
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Bookings", "item": `${baseUrl}/pandharpur-bookings` },
            { "@type": "ListItem", "position": 3, "name": "Restaurants", "item": `${baseUrl}/pandharpur-bookings/restaurants` },
            { "@type": "ListItem", "position": 4, "name": restaurant.name, "item": url }
        ]
    };

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": restaurant.name,
        "image": restaurant.image,
        "description": `Restaurant in Pandharpur: ${restaurant.name} serving ${restaurant.cuisineType || 'delicious'} food.`,
        "servesCuisine": restaurant.cuisineType || "Indian",
        "priceRange": restaurant.priceIndicator || "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": restaurant.address || "Pandharpur",
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
            <RestaurantPageClient restaurant={restaurant} />
        </>
    );
}