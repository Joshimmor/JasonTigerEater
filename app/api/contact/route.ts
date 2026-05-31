// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const BOOKING_EMAIL = process.env.BOOKING_EMAIL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inquiryType, name, email, message, eventDate, venue } = body;

    // Basic validation
    if (!inquiryType || !name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isBooking = inquiryType === 'booking';
    const subject = isBooking
      ? `Booking Inquiry from ${name}`
      : `General Contact from ${name}`;

    const bookingDetails = isBooking
      ? `
        <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
        <p><strong>Venue / Location:</strong> ${venue || 'Not specified'}</p>
      `
      : '';

    const html = `
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #C84B00; text-transform: uppercase; letter-spacing: 0.05em;">${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Inquiry Type:</strong> ${isBooking ? 'Booking Inquiry' : 'General Contact'}</p>
        ${bookingDetails}
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <p style="font-size: 11px; color: #999;">Sent via jasontigereater.com</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Jason Tiger Eater <noreply@yourdomain.com>', // ← swap with your verified domain
      to: BOOKING_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
