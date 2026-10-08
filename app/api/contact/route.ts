import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Invalid email address")
    .max(200, "Email is too long"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),

  turnstileToken: z
    .string()
    .min(1, "Turnstile verification is required"),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ---------------------------------------
    // 1. Validate request body
    // ---------------------------------------
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form fields and try again.",
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      subject,
      message,
      turnstileToken,
    } = validation.data;

    // ---------------------------------------
    // 2. Validate Turnstile server-side
    // ---------------------------------------
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    if (!turnstileResponse.ok) {
      console.error(
        "Turnstile verification request failed:",
        turnstileResponse.status
      );

      return NextResponse.json(
        {
          success: false,
          message: "Security verification failed.",
        },
        { status: 403 }
      );
    }

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error(
        "Turnstile validation failed:",
        turnstileResult["error-codes"]
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification failed. Please refresh and try again.",
        },
        { status: 403 }
      );
    }

    // ---------------------------------------
    // 3. Read SMTP configuration
    // ---------------------------------------
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !contactEmail
    ) {
      console.error("SMTP configuration is incomplete.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------
    // 4. Create Hostinger SMTP transporter
    // ---------------------------------------
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // ---------------------------------------
    // 5. Send email
    // ---------------------------------------
    await transporter.sendMail({
      from: `"Dravit Portfolio" <${smtpUser}>`,

      to: contactEmail,

      replyTo: email,

      subject: `Portfolio Contact: ${subject}`,

      text: `
New contact form submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submitted from dravit.in
      `.trim(),

      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">

            <h2>New Contact Form Submission</h2>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(subject)}
            </p>

            <hr />

            <h3>Message</h3>

            <p style="white-space: pre-wrap;">
              ${escapeHtml(message)}
            </p>

            <hr />

            <p>
              <strong>Source:</strong> dravit.in contact form
            </p>

          </body>
        </html>
      `,
    });

    console.log(`Contact form email sent from ${email}`);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your message right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}