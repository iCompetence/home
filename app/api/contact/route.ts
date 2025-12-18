import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission (for development)
    console.log('Contact form submission:', { name, email, message });

    // TODO: Integrate with your email service here
    // Examples:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Nodemailer with SMTP
    //
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@icompetence.de',
    //   to: 'info@icompetence.de',
    //   subject: `New contact form submission from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}
