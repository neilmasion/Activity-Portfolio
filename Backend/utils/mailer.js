import nodemailer from 'nodemailer';
import config from '../config/env.js';

/**
 * Creates and validates nodemailer transporter
 */
function createTransporter() {
  const host = config.smtp.host || 'smtp.gmail.com';
  const user = config.smtp.user || config.adminEmail || 'neilmasion2@gmail.com';
  const pass = config.smtp.pass;

  // Check if credentials are placeholders or empty
  const isPlaceholder = !pass || pass === 'your_app_specific_password' || pass.trim() === '';

  if (isPlaceholder) {
    return null;
  }

  const isGmail = host.includes('gmail');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass: pass.replace(/\s+/g, '') // remove spaces from Gmail app passwords
      }
    });
  }

  return nodemailer.createTransport({
    host,
    port: config.smtp.port || 587,
    secure: config.smtp.port === 465,
    auth: { user, pass }
  });
}

/**
 * Send real email notification to Neil's Gmail inbox (neilmasion2@gmail.com)
 * when a client submits an inquiry through the portfolio contact form.
 */
export async function sendInquiryNotification(inquiry) {
  const transporter = createTransporter();
  const recipient = config.adminEmail || 'neilmasion2@gmail.com';

  if (!transporter) {
    console.warn(`[MAIL NOT SENT] SMTP is not configured in Backend/.env. To receive emails in ${recipient}, set SMTP_PASS to your 16-character Gmail App Password.`);
    return {
      sent: false,
      reason: 'SMTP_PASS not configured in Backend/.env. Gmail App Password required.'
    };
  }

  const formattedDate = new Date(inquiry.receivedAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const subject = `📬 New Portfolio Inquiry from ${inquiry.name} (${inquiry.projectType || 'General'})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; background-color: #0B0B0E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8F8FA; }
        .container { max-width: 600px; margin: 30px auto; background-color: #141418; border: 1px solid #22222B; padding: 32px; border-radius: 0px; }
        .header { border-bottom: 1px solid #22222B; padding-bottom: 20px; margin-bottom: 24px; }
        .title { color: #FFFFFF; font-size: 20px; font-weight: 700; margin: 0 0 6px 0; }
        .subtitle { color: #703BF7; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
        .field-group { margin-bottom: 18px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #8E8E9F; margin-bottom: 4px; }
        .value { font-size: 14px; color: #FFFFFF; font-weight: 500; }
        .badge { display: inline-block; background-color: #0B0B0E; border: 1px solid #22222B; padding: 4px 10px; font-size: 12px; color: #A78BFA; }
        .message-box { background-color: #0B0B0E; border: 1px solid #22222B; padding: 18px; color: #E4E4E7; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
        .btn { display: inline-block; background-color: #703BF7; color: #FFFFFF !important; text-decoration: none; padding: 10px 20px; font-weight: 600; font-size: 13px; margin-top: 24px; }
        .footer { margin-top: 30px; padding-top: 18px; border-top: 1px solid #22222B; font-size: 11px; color: #52525B; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="subtitle">Neil Masion Portfolio Inquiry</p>
          <h1 class="title">You received a new client inquiry</h1>
        </div>

        <div class="field-group">
          <div class="label">Sender Name</div>
          <div class="value">${inquiry.name}</div>
        </div>

        <div class="field-group">
          <div class="label">Sender Email</div>
          <div class="value"><a href="mailto:${inquiry.email}" style="color: #A78BFA; text-decoration: none;">${inquiry.email}</a></div>
        </div>

        <div class="field-group">
          <div class="label">Project Type</div>
          <div><span class="badge">${inquiry.projectType || 'General Inquiry'}</span></div>
        </div>

        <div class="field-group">
          <div class="label">Budget Scope</div>
          <div><span class="badge">${inquiry.budget || 'Undisclosed'}</span></div>
        </div>

        <div class="field-group">
          <div class="label">Client Message</div>
          <div class="message-box">${inquiry.message}</div>
        </div>

        <div>
          <a href="mailto:${inquiry.email}?subject=Regarding your inquiry - Neil Masion&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for reaching out!" class="btn">
            Reply to ${inquiry.name}
          </a>
        </div>

        <div class="footer">
          Received on ${formattedDate} • Transmission ID: ${inquiry.id || 'N/A'}<br>
          View all inquiries anytime in your Admin Dashboard: <a href="${config.clientUrl}/admin" style="color: #703BF7;">${config.clientUrl}/admin</a>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Inquiry for Neil Masion Portfolio
------------------------------------------------
From: ${inquiry.name} <${inquiry.email}>
Project: ${inquiry.projectType || 'General Inquiry'}
Budget: ${inquiry.budget || 'Undisclosed'}
Date: ${formattedDate}

Message:
${inquiry.message}
------------------------------------------------
Reply directly to: ${inquiry.email}
View in Dashboard: ${config.clientUrl}/admin
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: `"${inquiry.name} via Portfolio" <${config.smtp.user || recipient}>`,
      to: recipient,
      replyTo: inquiry.email,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`[EMAIL DISPATCHED] Successfully sent inquiry from ${inquiry.email} to ${recipient} (Message ID: ${info.messageId})`);
    return {
      sent: true,
      messageId: info.messageId
    };
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send email via SMTP to ${recipient}:`, err.message);
    return {
      sent: false,
      error: err.message
    };
  }
}
