'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/prisma';
import { chatMessageSchema, sessionIdSchema } from '@/lib/schema';
import { aiRateLimiter } from '@/lib/arcjet';
import { headers } from 'next/headers';

// --- Configuration ---
// The AI system prompt and model initialization have been moved to app/api/chat/route.js


// --- 1. Fetch Chat History (Sidebar) ---
export async function getUserSessions(guestId = null) {
  try {
    const user = await checkUser();
    const queryOptions = {
      orderBy: { updatedAt: 'desc' },
      take: 50,
      select: {
        id: true,
        updatedAt: true,
        title: true,
        messages: { take: 1, orderBy: { createdAt: 'asc' }, select: { content: true } }
      }
    };

    let sessions = [];
    if (user) {
      sessions = await db.chatSession.findMany({ where: { userId: user.id }, ...queryOptions });
    } else {
      if (!guestId) return { success: false, sessions: [] };
      sessions = await db.chatSession.findMany({ where: { guestId }, ...queryOptions });
    }

    const formatted = sessions.map(s => {
      let displayTitle = s.title;
      if (!displayTitle) {
        const firstMsg = s.messages[0]?.content || "New Conversation";
        displayTitle = firstMsg.length > 30 ? firstMsg.substring(0, 30) + "..." : firstMsg;
      }
      return { id: s.id, date: s.updatedAt, title: displayTitle };
    });

    return { success: true, sessions: formatted };
  } catch (error) {
    return { success: false, sessions: [] };
  }
}

// --- 2. Get Single Chat Session ---
export async function getSpecificSession(sessionId) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 100 } },
    });

    if (!session) return { success: false, error: "Not found" };
    if (user && session.userId !== user.id) return { success: false, error: "Unauthorized" };

    return { success: true, session, messages: session.messages };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 3. Create New Session ---
export async function createNewChatSession(guestId = null) {
  try {
    const user = await checkUser();
    const data = user ? { userId: user.id } : { guestId };
    if (!user && !guestId) throw new Error("ID missing");

    const session = await db.chatSession.create({ data });
    return { success: true, session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 4. Delete Session ---
export async function deleteChatSession(sessionId) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({ where: { id: sessionId } });

    if (!session) return { success: false, error: "Not found" };
    if (user && session.userId !== user.id) return { success: false, error: "Unauthorized" };

    await db.chatSession.delete({ where: { id: sessionId } });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 5. Rename Session ---
export async function updateChatSessionTitle(sessionId, newTitle) {
  try {
    const user = await checkUser();
    const session = await db.chatSession.findUnique({ where: { id: sessionId } });
    if (!session || (user && session.userId !== user.id)) return { success: false, error: "Unauthorized" };

    await db.chatSession.update({
      where: { id: sessionId },
      data: { title: newTitle }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// --- 6. Send Message ---
// DEPRECATED: This has been migrated to the Vercel AI SDK architecture at app/api/chat/route.js
// and is no longer used by the frontend.
// export async function sendMessage(sessionId, userMessage, language = 'english') { ... }