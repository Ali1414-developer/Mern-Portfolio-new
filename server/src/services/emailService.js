const nodemailer = require('nodemailer');

const sendContactNotification = async ({ name, email, subject, message }) => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL || 'aliraza777212@gmail.com';

  if (!host || !user || !pass) {
    // Graceful fallback: SMTP not configured; message saved in DB anyway.
    console.log(`[Email Service Notice] SMTP not configured. Stored contact message from ${name} <${email}> in MongoDB.`);
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${user}>`,
      to: contactEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject || 'New Contact Message'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #a855f7; border-bottom: 1px solid #334155; padding-bottom: 10px;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          <div style="background-color: #1e293b; padding: 16px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #a855f7;">
            <strong>Message:</strong><br/>
            <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Service Error]', error.message);
    return { sent: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
};
