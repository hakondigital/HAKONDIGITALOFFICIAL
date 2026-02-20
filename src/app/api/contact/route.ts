import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, business, budget, scope, message } = body;

    // ── Validation ──────────────────────────────────
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // ── Sanitise ────────────────────────────────────
    const sanitised = {
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      phone: (phone || "").trim().slice(0, 30),
      business: (business || "").trim().slice(0, 200),
      budget: (budget || "").trim().slice(0, 50),
      scope: (scope || "").trim().slice(0, 500),
      message: message.trim().slice(0, 5000),
      timestamp: new Date().toISOString(),
    };

    // ── Send to Formspree ────────────────────────────
    const formspreeRes = await fetch("https://formspree.io/f/mwvnnnby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(sanitised),
    });

    if (!formspreeRes.ok) {
      const err = await formspreeRes.json().catch(() => ({}));
      console.error("[FORMSPREE ERROR]", err);
      return NextResponse.json(
        { error: "Failed to send your enquiry. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry has been received. We will respond within 12 hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "An error occurred processing your request. Please try again." },
      { status: 500 }
    );
  }
}
