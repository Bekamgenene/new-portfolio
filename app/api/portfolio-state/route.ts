import { NextRequest, NextResponse } from "next/server";
import { defaultPortfolioState } from "@/lib/default-portfolio-state";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type PortfolioState = {
  profile?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  social?: Record<string, unknown>;
  projects?: unknown[];
  certificates?: unknown[];
  experiences?: unknown[];
  messages?: unknown[];
};

async function supabaseFetch(path: string, init?: RequestInit) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }

  return fetch(`${SUPABASE_URL.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

export async function GET() {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(defaultPortfolioState, { status: 200 });
    }

    const response = await supabaseFetch(
      "/rest/v1/portfolio_state?id=eq.1&select=*",
      { method: "GET" },
    );

    if (!response.ok) {
      return NextResponse.json(defaultPortfolioState, { status: 200 });
    }

    const rows = (await response.json()) as Array<
      PortfolioState & { id?: number }
    >;
    const row = rows[0];

    if (
      row &&
      row.messages === undefined &&
      row.contact?.messages !== undefined
    ) {
      row.messages = row.contact.messages as unknown[];
    }

    return NextResponse.json(row ?? defaultPortfolioState, { status: 200 });
  } catch {
    return NextResponse.json(defaultPortfolioState, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const incoming = (await request.json()) as PortfolioState;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      const fallbackState = {
        ...defaultPortfolioState,
        ...incoming,
        profile: {
          ...defaultPortfolioState.profile,
          ...(incoming.profile || {}),
        },
        contact: {
          ...defaultPortfolioState.contact,
          ...(incoming.contact || {}),
        },
        social: {
          ...defaultPortfolioState.social,
          ...(incoming.social || {}),
        },
      };

      return NextResponse.json(fallbackState, { status: 200 });
    }

    const currentResponse = await supabaseFetch(
      "/rest/v1/portfolio_state?id=eq.1&select=*",
      { method: "GET" },
    );

    let currentState: PortfolioState = {};
    if (currentResponse.ok) {
      const rows = (await currentResponse.json()) as Array<PortfolioState>;
      if (rows[0]) {
        currentState = rows[0];
      }
    }

    const hasMessagesColumn = Object.prototype.hasOwnProperty.call(
      currentState,
      "messages",
    );

    const currentContact =
      (currentState.contact as Record<string, unknown>) || {};

    const nextMessages =
      incoming.messages ??
      (hasMessagesColumn
        ? (currentState.messages ??
          (currentContact.messages as unknown[] | undefined) ??
          [])
        : ((currentContact.messages as unknown[] | undefined) ?? []));

    const nextContact = {
      ...currentContact,
      ...(incoming.contact || {}),
      messages: nextMessages,
    };

    const nextState: PortfolioState & { id: number; updated_at: string } = {
      id: 1,
      updated_at: new Date().toISOString(),
      profile: { ...(currentState.profile || {}), ...(incoming.profile || {}) },
      contact: nextContact,
      social: { ...(currentState.social || {}), ...(incoming.social || {}) },
      projects: incoming.projects ?? currentState.projects ?? [],
      certificates: incoming.certificates ?? currentState.certificates ?? [],
      experiences: incoming.experiences ?? currentState.experiences ?? [],
      ...(hasMessagesColumn ? { messages: nextMessages } : {}),
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
      return NextResponse.json(
        { error: `Failed to save portfolio state: ${errorText}` },
        { status: upsertResponse.status },
      );
    }

    return NextResponse.json(nextState, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to save portfolio state.",
      },
      { status: 500 },
    );
  }
}
