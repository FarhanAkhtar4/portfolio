import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Check SMTP configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error: "Email service not configured. Please set SMTP_USER and SMTP_PASS environment variables.",
        },
        { status: 503 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // TLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email to portfolio owner
    const contactEmail = process.env.CONTACT_EMAIL || smtpUser;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Message: ${message}`,
        "",
        `---`,
        `Sent from portfolio contact form`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Message</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 80px;">From:</td>
                <td style="padding: 8px 0; color: #6b7280;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border-left: 4px solid #7c3aed;">
              <p style="margin: 0; color: #374151; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
