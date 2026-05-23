import { client } from "@/sanity/lib/client";

/**
 * Helper function to fetch slugs and last modification dates for a given schema type.
 */
const fetchSanityDocuments = (schemaType) => {
  return client.fetch(`*[_type == "${schemaType}" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }`);
};

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';

  // --- 1. Fetch all dynamic content from Sanity concurrently ---
  const [
    attractions,
    temples,
    hotels,
    bhaktaniwas,
    kirtankars,
    restaurants,
    travels,
  ] = await Promise.all([
    fetchSanityDocuments('otherAttraction'),
    fetchSanityDocuments('temple'),
    fetchSanityDocuments('hotel'),
    fetchSanityDocuments('bhaktaniwas'),
    fetchSanityDocuments('kirtankar'),
    fetchSanityDocuments('restaurant'),
    fetchSanityDocuments('travel'),
  ]);

  // --- 2. Map dynamic content to the sitemap URL format ---
  const attractionUrls = attractions.map(item => ({
    url: `${baseUrl}/pandharpur-attractions/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const templeUrls = temples.map(item => ({
    url: `${baseUrl}/temples/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const hotelUrls = hotels.map(item => ({
    url: `${baseUrl}/pandharpur-bookings/hotels/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const bhaktaniwasUrls = bhaktaniwas.map(item => ({
    url: `${baseUrl}/pandharpur-bookings/bhaktaniwas/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const kirtankarUrls = kirtankars.map(item => ({
    url: `${baseUrl}/pandharpur-bookings/kirtankars/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const restaurantUrls = restaurants.map(item => ({
    url: `${baseUrl}/pandharpur-bookings/restaurants/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const travelUrls = travels.map(item => ({
    url: `${baseUrl}/pandharpur-bookings/travel/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  // --- 3. Define all your static page URLs ---
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/emergency`, lastModified: new Date() },
    { url: `${baseUrl}/help`, lastModified: new Date() },
    { url: `${baseUrl}/temples`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-attractions`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-festivals`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings/hotels`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings/bhaktaniwas`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings/kirtankars`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings/restaurants`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings/travel`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-darshan-yatra-guide`, lastModified: new Date() },
    { url: `${baseUrl}/pricing`, lastModified: new Date() },
    { url: `${baseUrl}/join-us`, lastModified: new Date() },
  ];

  // --- 4. Combine and return all URLs ---
  return [
    ...staticUrls,
    ...attractionUrls,
    ...templeUrls,
    ...hotelUrls,
    ...bhaktaniwasUrls,
    ...kirtankarUrls,
    ...restaurantUrls,
    ...travelUrls,
  ];
}
