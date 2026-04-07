import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API route using FormSubmit.co
 * Free email forwarding — no SMTP credentials needed.
 * First submission triggers a confirmation email to farhanmakandar01@outlook.com.
 * After clicking confirm once, all messages arrive in the inbox automatically.
 */

const CONTACT_EMAIL = "farhanmakandar01@outlook.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Spam keyword filter
    const spamPatterns = [
      /viagra/i, /casino/i, /lottery/i, /bitcoin.*invest/i,
      /click.*here/i, /act.*now/i, /free.*money/i, /urgent.*transfer/i,
      /http.*\S+\.(xyz|top|click|buzz)/i,
    ];
    const fullText = `${name} ${email} ${message}`;
    if (spamPatterns.some((p) => p.test(fullText))) {
      return NextResponse.json(
        { error: "Message flagged as spam." },
        { status: 400 }
      );
    }

    // Rate limiting: max 3 messages per minute per IP
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitKey = `contact_rate_${clientIp}`;
    const now = Date.now();

    const rateStore = globalThis as Record<string, unknown>;
    const stored = rateStore[rateLimitKey] as { count: number; windowStart: number } | undefined;

    if (stored) {
      const windowMs = 60 * 1000;
      if (now - stored.windowStart < windowMs && stored.count >= 3) {
        return NextResponse.json(
          { error: "Too many messages. Please wait a minute before trying again." },
          { status: 429 }
        );
      }
      if (now - stored.windowStart >= windowMs) {
        (rateStore as Record<string, { count: number; windowStart: number }>)[rateLimitKey] = { count: 1, windowStart: now };
      } else {
        stored.count += 1;
      }
    } else {
      (rateStore as Record<string, { count: number; windowStart: number }>)[rateLimitKey] = { count: 1, windowStart: now };
    }

    // Send via FormSubmit.co (free, no signup, no SMTP)
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("_subject", `Portfolio Contact: ${name}`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      );
    } else {
      console.error("FormSubmit error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to send message. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
