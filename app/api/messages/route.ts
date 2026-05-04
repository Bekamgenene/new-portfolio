import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

type MessageRecord = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
};

type PortfolioState = {
  messages?: MessageRecord[];
};

function getHeaders() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }

  return {
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    "Content-Type": "application/json",
  };
}

async function supabaseFetch(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL!.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      ...getHeaders(),
      ...(init?.headers || {}),
    },
  });
}

function parseMessagesFromRow(row: Record<string, unknown>): MessageRecord[] {
  if (Array.isArray(row.messages)) {
    return row.messages as MessageRecord[];
  }

  if (row.contact && typeof row.contact === "object") {
    const contact = row.contact as Record<string, unknown>;
    if (Array.isArray(contact.messages)) {
      return contact.messages as MessageRecord[];
    }
  }

  return [];
}

async function loadMessages() {
  const response = await supabaseFetch(
    "/rest/v1/portfolio_state?id=eq.1&select=*",
    { method: "GET" },
  );

  if (!response.ok) {
    return [] as MessageRecord[];
  }

  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return parseMessagesFromRow(rows[0] || {});
}

async function saveMessages(messages: MessageRecord[]) {
  const currentResponse = await supabaseFetch(
    "/rest/v1/portfolio_state?id=eq.1&select=*",
    { method: "GET" },
  );

  let currentState: Record<string, unknown> = {};
  if (currentResponse.ok) {
    const rows = (await currentResponse.json()) as Array<
      Record<string, unknown>
    >;
    currentState = rows[0] || {};
  }

  const hasMessagesColumn = Object.prototype.hasOwnProperty.call(
    currentState,
    "messages",
  );

  const currentContact =
    currentState.contact && typeof currentState.contact === "object"
      ? (currentState.contact as Record<string, unknown>)
      : {};

  const nextContact = {
    ...currentContact,
    messages,
  };

  const nextState: Record<string, unknown> = {
    id: 1,
    updated_at: new Date().toISOString(),
    profile: currentState.profile || {},
    contact: nextContact,
    social: currentState.social || {},
    projects: currentState.projects || [],
    certificates: currentState.certificates || [],
    experiences: currentState.experiences || [],
    ...(hasMessagesColumn ? { messages } : {}),
  };

  const upsertResponse = await supabaseFetch(
    "/rest/v1/portfolio_state?on_conflict=id",
    {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify([nextState]),
    },
  );

  if (!upsertResponse.ok) {
    const errorText = await upsertResponse.text();
    throw new Error(`Failed to save messages: ${errorText}`);
  }

  return nextState;
}

export async function GET() {
  try {
    const messages = await loadMessages();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load messages.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<MessageRecord>;

    if (
      !payload.name?.trim() ||
      !payload.email?.trim() ||
      !payload.message?.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const messages = await loadMessages();
    const nextMessage: MessageRecord = {
      id: messages.length
        ? Math.max(...messages.map((entry) => entry.id)) + 1
        : 1,
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      date: new Date().toLocaleString(),
      read: false,
    };

    const nextMessages = [nextMessage, ...messages];
    await saveMessages(nextMessages);

    // Send email to admin
    if (ADMIN_EMAIL && RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>", // Use a verified domain or Resend's default
          to: ADMIN_EMAIL,
          subject: `New Contact Message from ${nextMessage.name}`,
          html: `
            <h2>New Message from Portfolio Contact Form</h2>
            <p><strong>Name:</strong> ${nextMessage.name}</p>
            <p><strong>Email:</strong> ${nextMessage.email}</p>
            <p><strong>Message:</strong></p>
            <p>${nextMessage.message.replace(/\n/g, "<br>")}</p>
            <p><strong>Date:</strong> ${nextMessage.date}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    return NextResponse.json({ message: nextMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save message.",
      },
      { status: 500 },
    );
  }
}
