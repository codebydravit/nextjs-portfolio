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
    .min(1, "Turnstile verification is required")
    .max(2048, "Invalid Turnstile token"),
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
    // ---------------------------------------
    // 1. Read request body
    // ---------------------------------------
    const body = await request.json();

    // ---------------------------------------
    // 2. Validate request body
    // ---------------------------------------
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      console.error(
        "Contact form validation failed:",
        validation.error.flatten()
      );

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
    // 3. Get Turnstile secret
    // ---------------------------------------
    const turnstileSecret =
      process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
      console.error(
        "TURNSTILE_SECRET_KEY is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------
    // 4. Validate Turnstile token
    // ---------------------------------------
    let turnstileResponse: Response;

    try {
      turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),

          cache: "no-store",

          signal: AbortSignal.timeout(10000),
        }
      );
    } catch (error) {
      console.error(
        "Turnstile verification request error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification service is currently unavailable. Please try again.",
        },
        { status: 503 }
      );
    }

    if (!turnstileResponse.ok) {
      console.error(
        "Turnstile verification request failed:",
        turnstileResponse.status,
        turnstileResponse.statusText
      );

      return NextResponse.json(
        {
          success: false,
          message: "Security verification failed.",
        },
        { status: 403 }
      );
    }

    const turnstileResult =
      await turnstileResponse.json();

    // ---------------------------------------
    // 5. Reject invalid Turnstile token
    // ---------------------------------------
    if (!turnstileResult.success) {
      console.error(
        "Turnstile validation failed:",
        turnstileResult["error-codes"] || []
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
    // 6. Read SMTP configuration
    // ---------------------------------------
    const smtpHost = process.env.SMTP_HOST;

    const smtpPort = Number(
      process.env.SMTP_PORT || "465"
    );

    const smtpUser = process.env.SMTP_USER;

    const smtpPassword =
      process.env.SMTP_PASSWORD;

    const contactEmail =
      process.env.CONTACT_EMAIL;

    // ---------------------------------------
    // 7. Validate SMTP configuration
    // ---------------------------------------
    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !contactEmail
    ) {
      console.error(
        "SMTP configuration is incomplete.",
        {
          smtpHostConfigured: Boolean(smtpHost),
          smtpUserConfigured: Boolean(smtpUser),
          smtpPasswordConfigured: Boolean(
            smtpPassword
          ),
          contactEmailConfigured: Boolean(
            contactEmail
          ),
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------
    // 8. Validate SMTP port
    // ---------------------------------------
    if (
      !Number.isInteger(smtpPort) ||
      smtpPort <= 0 ||
      smtpPort > 65535
    ) {
      console.error(
        "Invalid SMTP_PORT configuration."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service configuration is invalid.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------
    // 9. Create Hostinger SMTP transporter
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
    // 10. Escape HTML values
    // ---------------------------------------
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // ---------------------------------------
    // 11. Send email
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
          <head>
            <meta charset="UTF-8" />

            <title>
              New Contact Form Submission
            </title>
          </head>

          <body
            style="
              margin: 0;
              padding: 20px;
              background-color: #f5f7fb;
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #222222;
            "
          >

            <div
              style="
                max-width: 700px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
              "
            >

              <h2
                style="
                  margin-top: 0;
                  color: #1e3a8a;
                "
              >
                New Contact Form Submission
              </h2>

              <p>
                <strong>Name:</strong>
                ${safeName}
              </p>

              <p>
                <strong>Email:</strong>
                ${safeEmail}
              </p>

              <p>
                <strong>Subject:</strong>
                ${safeSubject}
              </p>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #e5e7eb;
                  margin: 24px 0;
                "
              />

              <h3>
                Message
              </h3>

              <p
                style="
                  white-space: pre-wrap;
                  background-color: #f9fafb;
                  padding: 16px;
                  border-radius: 8px;
                "
              >
                ${safeMessage}
              </p>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #e5e7eb;
                  margin: 24px 0;
                "
              />

              <p
                style="
                  color: #6b7280;
                  font-size: 14px;
                "
              >
                <strong>Source:</strong>
                dravit.in contact form
              </p>

            </div>

          </body>
        </html>
      `,
    });

    // ---------------------------------------
    // 12. Log successful submission
    // ---------------------------------------
    console.log(
      `Contact form email sent from ${email}`
    );

    // ---------------------------------------
    // 13. Return success response
    // ---------------------------------------
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // ---------------------------------------
    // 14. Handle unexpected errors
    // ---------------------------------------
    console.error(
      "Contact API error:",
      error
    );

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