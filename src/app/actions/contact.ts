"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email address.")
    .max(150, "Email address is too long."),
  company: z
    .string()
    .trim()
    .min(1, "Please enter your company or organization name.")
    .max(120, "Company name must be 120 characters or fewer."),
  interest: z
    .string()
    .trim()
    .min(1, "Please select a vertical or service of interest.")
    .max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few details about your inquiry (at least 10 characters).")
    .max(3000, "Message must be 3000 characters or fewer."),
  website: z.string().optional(), // Honeypot field — must stay empty
});

export interface ContactActionState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "interest" | "message", string>>;
}

// Lightweight sliding-window rate limiter per IP (5 requests / 15 minutes)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequests.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequests.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequests.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function submitContactInquiry(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  // 1. Honeypot check: silently succeed to avoid tipping off bots
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    return {
      status: "success",
      message: "Thank you! Your inquiry has been received by the etikoppa Inc. team.",
    };
  }

  // 2. Rate limiting
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIp)) {
    return {
      status: "error",
      message:
        "Too many inquiries submitted from your network. Please wait a few minutes or email hello@etikoppa.in directly.",
    };
  }

  // 3. Validate input with Zod
  const parsed = contactSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: honeypot,
  });

  if (!parsed.success) {
    const fieldErrors: ContactActionState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactActionState["fieldErrors"]>;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { name, email, company, interest, message } = parsed.data;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || `etikoppa Web <noreply@${siteConfig.domain}>`;
  const subject = `[etikoppa.in] New Inquiry: ${interest} — ${company}`;

  const textBody = [
    `New B2B / Collaboration Inquiry via ${siteConfig.url}`,
    ``,
    `Name: ${name}`,
    `Work Email: ${email}`,
    `Company / Organization: ${company}`,
    `Vertical / Service of Interest: ${interest}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #4f46e5; margin-bottom: 16px;">New Inquiry via etikoppa.in</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; font-weight: 600; width: 180px;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Work Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Company</td><td style="padding: 8px 0;">${escapeHtml(company)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Interest</td><td style="padding: 8px 0;">${escapeHtml(interest)}</td></tr>
      </table>
      <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;

  try {
    // Option A: Resend API
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        status: "success",
        message: `Thank you, ${name}. Your inquiry has been routed to our team at ${siteConfig.email}. We typically respond within 1 business day.`,
      };
    }

    // Option B: Zoho Mail / Custom SMTP via Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = Number(process.env.SMTP_PORT || 465);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      return {
        status: "success",
        message: `Thank you, ${name}. Your inquiry has been sent to ${siteConfig.email}. We typically respond within 1 business day.`,
      };
    }

    // Local / Preview fallback when no mail provider key is configured yet
    console.info("[etikoppa-web] Contact inquiry captured (no mail provider configured):", {
      name,
      email,
      company,
      interest,
      receivedAt: new Date().toISOString(),
    });

    return {
      status: "success",
      message: `Thank you, ${name}! Your inquiry has been validated and logged. Configure RESEND_API_KEY or Zoho SMTP environment variables to deliver live emails to ${siteConfig.email}.`,
    };
  } catch (err) {
    console.error("[etikoppa-web] Failed to deliver contact inquiry:", err);
    return {
      status: "error",
      message: `We couldn't dispatch your inquiry right now. Please email us directly at ${siteConfig.email}.`,
    };
  }
}
