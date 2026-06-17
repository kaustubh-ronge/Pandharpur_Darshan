import { streamText, tool, convertToModelMessages, stepCountIs } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { db } from '@/lib/prisma';
import { checkUser } from '@/lib/checkUser';
import { aiRateLimiter } from '@/lib/arcjet';
import { headers } from 'next/headers';
import { z } from 'zod';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  getAllHotelsQuery,
  getAllBhaktaniwasQuery,
  getAllTemplesQuery,
  getAllTravelsQuery,
  getAllRestaurantsQuery,
  getAllKirtankarsQuery,
  getAttractionsByCategoryQuery,
  getHotelBySlugQuery,
  getBhaktaniwasBySlugQuery,
  getTempleBySlugQuery,
  getRestaurantBySlugQuery,
  getTravelBySlugQuery,
  getKirtankarBySlugQuery,
  getAttractionBySlugQuery
} from '@/sanity/lib/queries';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

const BIG_SYSTEM_PROMPT = `
[START PROMPT]
# I. CORE IDENTITY & PERSONA
You are "Pandhari Mitra," a highly intelligent, domain-specialized virtual guide for the holy city of Pandharpur and its website ecosystem. 
Your persona is Respectful, Spiritual, Culturally Aware, Tourism-Friendly, Locally Aware, Helpful, Calm, and Concise. 
You are perfectly fluent in Marathi, English, and Hindi. 
Do NOT act like a generic chatbot, ChatGPT clone, or overly restricted search-only bot. Do NOT be robotic or overly technical.

# II. STRICT DOMAIN BOUNDARY RULES
You must STRICTLY remain domain-focused. You ONLY answer questions related to:
- Pandharpur, darshan, temples, spirituality, pilgrimage, tourism, Maharashtra travel, local guidance, festivals, attractions, accommodation, emergency/help, devotional guidance, website content, website navigation, and platform functionality.
If a user asks something completely unrelated (e.g., coding/programming, random mathematics, unrelated sports, movies, politics, unrelated tech support, general trivia, world news, or any other query that is not at all related to website or pandharpur), you MUST politely refuse.
IMPORTANT: Do NOT answer unrelated questions using general AI knowledge, even if you know the answer.
Refusal Example: "I specialize in helping with Pandharpur guidance, darshan information, temple assistance, tourism help, and website-related support."

# III. TOOL USAGE INTELLIGENCE & FALLBACK BEHAVIOR
You will have access to tools, structured content sources, CMS queries, and website-aware logic.
- Intelligently decide when tools are necessary (e.g., website navigation, dynamic CMS content, attraction details, festival schedules, live darshan queues, emergency info).
- When direct answering is sufficient (e.g., general pilgrimage guidance, spiritual etiquette, travel preparation, culturally common guidance), you do not need to unnecessarily call tools.
- FALLBACK: If a user asks a domain-related question but specific structured content/tool data is unavailable (e.g., CMS content empty), you MAY still answer helpfully using your general domain knowledge. Do NOT unnecessarily refuse domain-relevant questions just because tool data is missing.

# IV. NON-HALLUCINATION RULE
You may use general reasoning for domain-related guidance, BUT you must NEVER hallucinate:
- Fake routes, fake pages, fake timings, fake website features, fake CMS content, fake emergency information, fake booking systems, or fake facilities.
If factual website/platform data is unavailable, state so honestly.

# V. PREMIUM RESPONSE UI/UX INTELLIGENCE (CRITICAL)
The assistant responses must feel extremely modern, premium, beautiful, structured, and visually rich.
- Do NOT generate plain, boring, text-heavy responses. 
- Intelligently present information using: rich structured layouts, visually grouped sections, highlighted important details, bullet hierarchies, categorized information, emphasized important values, clean spacing, and modern response formatting.
- **DATA COMPLETENESS**: When displaying website/CMS/platform information, include MOST important relevant details instead of overly short summaries (e.g., names, timings, pricing, descriptions, location, categories, instructions). Do NOT unnecessarily omit important structured information. The goal is rich and genuinely useful responses.
- **CONTEXTUAL PRESENTATION**: Adapt visual structure based on context:
  - Temple responses → spiritual/information-focused layout
  - Festival responses → event-focused structured layout
  - Attraction responses → tourism-style presentation
  - Emergency responses → highly visible important formatting
  - Navigation guidance → step-by-step structured flow
- The AI response experience should feel like a premium AI product, NOT a basic text chatbot.

# VI. CONVERSATIONAL RULES
- **DO NOT** introduce yourself in every message. Only say who you are if specifically asked.
- Be structured but direct. Use Markdown heavily (bolding, lists, headers '###') to create hierarchy.
- Remember the conversation's context within a session.
- **WEBSITE ROUTING**: When directing a user to a specific feature, provide a clickable markdown link using relative paths (e.g., [Book Hotels](/pandharpur-bookings/hotels)).
- **DEEP MULTILINGUAL ADAPTATION**: 
  - **Marathi**: Adopt a highly respectful, devotional, and Varkari-aligned tone.
  - **Hindi**: Focus on clear, respectful pilgrimage guidance.
  - **English**: Adopt a structured, heritage-focused, and tourism-oriented tone.

# VII. CONTEXTUAL INFERENCE (CRITICAL)
- You will be provided with a [DYNAMIC_CONTEXT] block detailing the user's exact current location on the website.
- If the user asks an ambiguous question using words like "here", "this", "it", or "this temple", **DO NOT ask for clarification**. Immediately infer they are talking about the item/slug mentioned in their current route context.
- Use the 'getSpecificDetails' tool or related data fetch tools to gather data. 
- IMPORTANT: After receiving the tool results, YOU MUST generate a helpful text response summarizing the results for the user. Never stop after just calling a tool.

# VIII. KNOWLEDGE DOMAIN & CAPABILITIES (20 Features)
You are programmed to perform the following 20 key functions seamlessly:
1.  **Hyper-Personalized Itinerary Planner:** Create detailed schedules based on interests, duration, budget, age, and mobility.
2.  **Live Data Integration:** Provide real-time darshan queues, aarti timings, weather, and events.
3.  **Advanced Multilingual Support:** Converse fluently in Marathi, Hindi, and English.
4.  **Rich Media Integration:** Respond with maps, images, videos, and audio clips.
5.  **Accommodation & Travel Assistant:** Help find and book hotels, dharamshalas, and transport.
6.  **"Spiritual Companion" Mode:** Share daily verses, stories of saints (Dnyaneshwar, Tukaram), and explain spiritual concepts.
7.  **Culinary & Shopping Advisor:** Recommend local cuisine, eateries, and authentic shops.
8.  **Emergency & Safety Protocol:** Provide instant access to emergency contacts and safety tips.
9.  **Accessibility Advisor:** Offer information for elderly visitors and people with disabilities (ramps, facilities, crowd levels).
10. **Gamified "City Explorer" Challenge:** Create an interactive scavenger hunt to guide users through landmarks.
11. **Seasonal "Wari" Pilgrimage Guide:** A dedicated mode during the Wari season with live Palkhi tracking and Varkari tips.
12. **Cultural Etiquette Guide:** Inform visitors about temple dress codes, do's and don'ts, and local customs.
13. **Session Memory & Context Awareness:** Remember the conversation's context within a session.
14. **Community Insights Hub:** Pull and display curated tips and reviews from other travelers.
15. **Intelligent Feedback Collector:** Proactively ask for feedback to improve.
16. **Offline Content Suggestion:** Recommend detailed articles and blogs on the main website.
17. **Deep Google Maps Integration:** Provide embedded maps and multi-modal directions (walking, auto-rickshaw).
18. **Real-time Phrase Translator:** Translate common tourist phrases into Marathi upon request (e.g., 'How do I ask for water?').
19. **Festival Deep-Dive Mode:** When a major festival is near, provide hyper-specific details about special arrangements and schedules.
20. **Personalized Preference Profile:** For logged-in users, learn and save preferences like dietary restrictions or specific interests to tailor all future recommendations.

# IX. CONSTRAINTS & SAFETY
- Remain neutral on religious matters. Do not ask for or store PII. Stay on the topic of Pandharpur.
[END PROMPT]
`;

export const maxDuration = 30;

function parseRouteContext(pathname) {
  if (!pathname) return "User is on an unknown page.";
  if (pathname === '/') return "User is on the Home page.";

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return "User is on the Home page.";

  let context = `User is currently viewing the path: ${pathname}. `;

  // E.g., /pandharpur-bookings/hotels/xyz-hotel -> category: hotels, slug: xyz-hotel
  // E.g., /temples/vitthal-rukmini -> category: temples, slug: vitthal-rukmini
  const lastSegment = segments[segments.length - 1];
  const secondLastSegment = segments.length > 1 ? segments[segments.length - 2] : null;

  const validCategories = ['hotels', 'bhaktaniwas', 'restaurants', 'travel', 'kirtankars', 'temples', 'pandharpur-attractions'];

  if (validCategories.includes(secondLastSegment)) {
    let sanityCat = secondLastSegment === 'pandharpur-attractions' ? 'attractions' : secondLastSegment;
    context += `\n[ACTIONABLE ROUTE INFO]: The user is currently looking at the specific details page for a ${sanityCat} with the slug '${lastSegment}'. If they ask a generic question like 'What is special here?' or 'How far is this?', you MUST assume they are referring to '${lastSegment}'. Proactively use the 'getSpecificDetails' tool with category='${sanityCat}' and slug='${lastSegment}' to answer them intelligently!`;
  } else if (validCategories.includes(lastSegment)) {
    context += `The user is browsing the list of ${lastSegment}.`;
  }

  return context;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { sessionId, language = 'english', currentRoute = '/', messages } = body;

    const decision = await aiRateLimiter.protect({
      headers: await headers(),
    });

    if (decision.isDenied()) {
      console.warn(`[Rate Limit Exceeded] SessionID: ${sessionId}`);
      return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429 });
    }

    if (!sessionId || !messages || messages.length === 0) {
      console.warn(`[Invalid Parameters] Missing sessionId or messages array`);
      return new Response(JSON.stringify({ error: "Invalid parameters." }), { status: 400 });
    }

    const user = await checkUser();
    const session = await db.chatSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
    }


    if (user && session.userId !== user.id) {
      console.warn(`[Unauthorized] User mismatch`);
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    } else if (!user && session.userId) {
      console.warn(`[Unauthorized] No user but session requires user`);
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    // Extract the latest user message sent by useChat

    const latestMessage = messages[messages.length - 1];

    if (latestMessage && latestMessage.role === 'user') {
      let textContent = latestMessage.content || '';
      if (latestMessage.parts) {
        textContent = latestMessage.parts.filter(p => p.type === 'text').map(p => p.text).join('');
      }

      await db.chatMessage.create({
        data: {
          chatSessionId: sessionId,
          role: 'user',
          content: textContent
        }
      });
    }

    const modelMessages = await convertToModelMessages(messages);

    const routeContext = parseRouteContext(currentRoute);
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

    const DYNAMIC_CONTEXT = `
[DYNAMIC_CONTEXT]
Current Date & Time (IST): ${currentDate}
${routeContext}
[/DYNAMIC_CONTEXT]
    `;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: `${BIG_SYSTEM_PROMPT}\n\n${DYNAMIC_CONTEXT}\n\n[SYSTEM INSTRUCTION: The user language preference is ${language}. When you call a tool that returns a list of locations (like hotels, temples), DO NOT list their raw route paths or URLs in your text. Just provide a friendly introductory sentence because visual cards will be displayed to the user automatically.]`,
      messages: modelMessages,
      stopWhen: stepCountIs(5),
      tools: {
        getWebsiteNavigation: tool({
          description: 'Get the exact URL paths for different sections of the Pandharpur website so you can direct users accurately.',
          inputSchema: z.object({
            section: z.enum(['home', 'about', 'emergency', 'help', 'join_us', 'pricing', 'temples', 'festivals', 'attractions', 'bookings_hotels', 'bookings_bhaktaniwas', 'bookings_restaurants', 'bookings_travel', 'bookings_kirtankars', 'darshan_yatra_guide']).describe('The section of the website to get the URL for'),
          }),
          execute: async ({ section }) => {
            const routeMap = {
              home: '/', about: '/about', emergency: '/emergency', help: '/help',
              join_us: '/join-us', pricing: '/pricing', temples: '/temples',
              festivals: '/pandharpur-festivals', attractions: '/pandharpur-attractions',
              bookings_hotels: '/pandharpur-bookings/hotels',
              bookings_bhaktaniwas: '/pandharpur-bookings/bhaktaniwas',
              bookings_restaurants: '/pandharpur-bookings/restaurants',
              bookings_travel: '/pandharpur-bookings/travel',
              bookings_kirtankars: '/pandharpur-bookings/kirtankars',
              darshan_yatra_guide: '/pandharpur-darshan-yatra-guide'
            };
            return { url: routeMap[section], instruction: `Direct the user here with a markdown link: [Click Here](${routeMap[section]})` };
          },
        }),
        getHotels: tool({
          description: 'Fetch the list of all available hotels in Pandharpur from CMS.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllHotelsQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  priceRange: i.priceRange,
                  address: i.address,
                  description: i.description,
                  contact: i.whatsappNumber || i.contactNumbers,
                  facilities: i.facilities,
                  roomTypes: i.roomTypes,
                  category: 'hotels'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getBhaktaniwas: tool({
          description: 'Fetch the list of all available Bhaktaniwas (Dharamshalas) in Pandharpur from CMS.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllBhaktaniwasQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  address: i.address,
                  description: i.description,
                  managedBy: i.managedBy,
                  contact: i.whatsappNumber || i.contactNumbers,
                  capacity: i.capacity,
                  category: 'bhaktaniwas'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getTemples: tool({
          description: 'Fetch the list of all temples in Pandharpur from CMS.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllTemplesQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  description: i.description,
                  timing: i.timing,
                  address: i.address,
                  importance: i.importance,
                  category: 'temples'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getRestaurants: tool({
          description: 'Fetch the list of all restaurants in Pandharpur from CMS.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllRestaurantsQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  cuisine: i.cuisineType,
                  address: i.address,
                  description: i.description,
                  specialties: i.specialties,
                  timing: i.timing,
                  category: 'restaurants'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getKirtankars: tool({
          description: 'Fetch the list of all Kirtankars (spiritual storytellers/singers) available for booking or guidance.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllKirtankarsQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  description: i.description,
                  specialization: i.specialization,
                  hometown: i.hometown,
                  contact: i.whatsappNumber,
                  category: 'kirtankars'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getOtherAttractions: tool({
          description: 'Fetch the list of all other tourist attractions, sightseeing spots, and cultural locations in Pandharpur grouped by category.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAttractionsByCategoryQuery });
              const attractions = [];
              if (data && Array.isArray(data)) {
                data.forEach(category => {
                  if (category.attractions && Array.isArray(category.attractions)) {
                    category.attractions.forEach(attr => {
                      attractions.push({
                        name: attr.name,
                        slug: attr.slug,
                        attractionCategory: category.title,
                        description: attr.description,
                        category: 'attractions'
                      });
                    });
                  }
                });
              }
              return { results: attractions };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getTravels: tool({
          description: 'Fetch the list of all travel services, transport options, and operators in Pandharpur.',
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const data = await sanityFetch({ query: getAllTravelsQuery });
              return {
                results: (data || []).map(i => ({
                  name: i.name,
                  slug: i.slug,
                  travelType: i.travelType,
                  description: i.description,
                  address: i.address,
                  operatingHours: i.operatingHours,
                  keyRoutes: i.keyRoutes,
                  contact: i.whatsappNumber || i.contactNumbers,
                  category: 'travels'
                }))
              };
            } catch (err) { return { error: err.message }; }
          }
        }),
        getSpecificDetails: tool({
          description: 'Fetch deep details about a specific hotel, temple, restaurant, bhaktaniwas, attraction, travel service, or kirtankar by its slug.',
          inputSchema: z.object({
            category: z.enum(['hotels', 'bhaktaniwas', 'temples', 'restaurants', 'travels', 'kirtankars', 'attractions']).describe('The category of the item'),
            slug: z.string().describe('The URL slug of the specific item')
          }),
          execute: async ({ category, slug }) => {
            try {
              let query = '';
              if (category === 'hotels') query = getHotelBySlugQuery;
              else if (category === 'bhaktaniwas') query = getBhaktaniwasBySlugQuery;
              else if (category === 'temples') query = getTempleBySlugQuery;
              else if (category === 'restaurants') query = getRestaurantBySlugQuery;
              else if (category === 'travels') query = getTravelBySlugQuery;
              else if (category === 'kirtankars') query = getKirtankarBySlugQuery;
              else if (category === 'attractions') query = getAttractionBySlugQuery;
              const data = await sanityFetch({ query, params: { slug } });

              let urlBase = 'pandharpur-bookings/';
              if (category === 'temples') urlBase = 'temples/';
              else if (category === 'attractions') urlBase = 'pandharpur-attractions/';
              else urlBase = `pandharpur-bookings/${category}/`;

              return { data, url: `/${urlBase}${slug}` };
            } catch (err) { return { error: err.message }; }
          }
        }),
      },
      async onFinish({ text: finalText }) {
        if (sessionId && finalText) {
          try {
            await db.$transaction(async (tx) => {
              await tx.chatMessage.create({
                data: { chatSessionId: sessionId, role: 'model', content: finalText }
              });
              await tx.chatSession.update({
                where: { id: sessionId },
                data: { updatedAt: new Date() }
              });
            });
          } catch (dbErr) {
            console.error(dbErr);
          }
        }
      }
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
