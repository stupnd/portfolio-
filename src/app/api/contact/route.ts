import { NextResponse } from "next/server";
import { site } from "@/content/site.config";

/**
 * Contact form handler.
 *
 * Set RESEND_API_KEY (https://resend.com, free tier is plenty) in your
 * Vercel project env to enable direct sending. Without it, this returns 501
 * and the form falls back to opening the visitor's mail client. The site
 * works either way.
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email sending not configured" }, { status: 501 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
