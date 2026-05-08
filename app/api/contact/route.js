import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEnvValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createEmailTemplate({ name, email, message }) {
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Calcutta",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `
    <div style="background:#f4f1ea;padding:32px 16px;font-family:Arial,sans-serif;color:#1f2328;">
      <table style="max-width:640px;width:100%;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e8dfcf;overflow:hidden;">
        <tr>
          <td style="padding:28px 32px;background:linear-gradient(135deg,#111313 0%,#2b2e2f 100%);color:#ffffff;">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#ffc107;">
              Portfolio Contact Form
            </p>
            <h1 style="margin:0;font-size:28px;line-height:1.2;">New message received</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 18px;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6b00;">
                    Sender Name
                  </p>
                  <p style="margin:0;font-size:18px;font-weight:700;color:#111313;">${safeName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6b00;">
                    Sender Email
                  </p>
                  <p style="margin:0;font-size:16px;color:#1f2328;">${safeEmail}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6b00;">
                    Received At
                  </p>
                  <p style="margin:0;font-size:16px;color:#1f2328;">${submittedAt}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6b00;">
                    Message
                  </p>
                  <div style="padding:18px;border-radius:16px;background:#f8f4ea;border:1px solid #eadfc8;font-size:15px;line-height:1.7;color:#2b2e2f;">
                    ${safeMessage}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body?.name?.trim() || "";
    const email = body?.email?.trim() || "";
    const message = body?.message?.trim() || "";

    if (!name || name.length < 3) {
      return NextResponse.json(
        { message: "Please enter a valid name." },
        { status: 400 }
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 20) {
      return NextResponse.json(
        { message: "Please enter a message with at least 20 characters." },
        { status: 400 }
      );
    }

    const SMTP_HOST = normalizeEnvValue(process.env.SMTP_HOST);
    const SMTP_PORT = normalizeEnvValue(process.env.SMTP_PORT);
    const SMTP_USER = normalizeEnvValue(process.env.SMTP_USER);
    const SMTP_SECURE = normalizeEnvValue(process.env.SMTP_SECURE);
    const CONTACT_FROM_EMAIL = normalizeEnvValue(process.env.CONTACT_FROM_EMAIL);
    const CONTACT_TO_EMAIL = normalizeEnvValue(process.env.CONTACT_TO_EMAIL);
    const rawSmtpPass = normalizeEnvValue(process.env.SMTP_PASS);
    const isGmailSmtp =
      SMTP_HOST.toLowerCase() === "smtp.gmail.com" ||
      SMTP_USER.toLowerCase().endsWith("@gmail.com");
    const SMTP_PASS = isGmailSmtp
      ? rawSmtpPass.replaceAll(" ", "")
      : rawSmtpPass;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { message: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE
        ? SMTP_SECURE === "true"
        : Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: [
        "New portfolio contact form submission",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: createEmailTemplate({ name, email, message }),
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form email error:", error);

    if (error?.code === "EAUTH") {
      return NextResponse.json(
        {
          message:
            "Email authentication failed. Check your SMTP username and Gmail app password.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong while sending the message." },
      { status: 500 }
    );
  }
}
