export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/sign-in',
        '/sign-up',
        '/studio',
        '/super-admin',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
