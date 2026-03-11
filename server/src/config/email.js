const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@bniglobal.com';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'BNI Platform';

/**
 * Send a generic email via SendGrid
 */
const sendEmail = async ({ to, subject, html, text }) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('📧 Email skipped: SENDGRID_API_KEY not configured');
    return false;
  }
  const msg = {
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    text: text || '',
    html: html || '',
  };

  try {
    await sgMail.send(msg);
    console.log(`📧 Email sent to: ${to}`);
    return true;
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    throw new Error('Email delivery failed');
  }
};

/**
 * Send visit request confirmation to visitor
 */
const sendVisitRequestConfirmation = async ({ visitorEmail, visitorName, chapterName, meetingDate }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #E31837; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">BNI</h1>
        <p style="color: white; margin: 8px 0 0; font-size: 14px;">Business Network International</p>
      </div>
      <div style="padding: 32px; background: #ffffff;">
        <h2 style="color: #222222; margin-top: 0;">Visit Request Confirmed!</h2>
        <p style="color: #444; line-height: 1.6;">
          Dear ${visitorName},
        </p>
        <p style="color: #444; line-height: 1.6;">
          Thank you for requesting to visit <strong>${chapterName}</strong>. 
          Your request has been received and the chapter leader will be in touch shortly to 
          confirm your visit.
        </p>
        ${meetingDate ? `<p style="color: #444;">Scheduled visit date: <strong>${meetingDate}</strong></p>` : ''}
        <div style="background: #F5F5F5; border-left: 4px solid #E31837; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #444; font-style: italic;">
            "Givers Gain" — The BNI philosophy that has helped millions of members grow their businesses worldwide.
          </p>
        </div>
        <p style="color: #444; line-height: 1.6;">
          If you have any questions, please don't hesitate to reply to this email.
        </p>
        <p style="color: #444;">Warm regards,<br/><strong>The BNI Team</strong></p>
      </div>
      <div style="background: #222222; padding: 16px; text-align: center;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} BNI. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: visitorEmail,
    subject: `Visit Request Confirmed - ${chapterName}`,
    html,
  });
};

/**
 * Notify chapter leader about a new visit request
 */
const sendVisitRequestToChapterLeader = async ({ leaderEmail, leaderName, visitorName, visitorEmail, visitorPhone, visitorProfession, chapterName, message }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #E31837; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">BNI</h1>
        <p style="color: white; margin: 8px 0 0; font-size: 14px;">New Visit Request</p>
      </div>
      <div style="padding: 32px; background: #ffffff;">
        <h2 style="color: #222222; margin-top: 0;">New Visitor Request for ${chapterName}</h2>
        <p style="color: #444; line-height: 1.6;">Dear ${leaderName},</p>
        <p style="color: #444; line-height: 1.6;">
          A new visitor has requested to attend your chapter meeting. Please review their details below:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr style="background: #F5F5F5;">
            <td style="padding: 10px 16px; font-weight: bold; color: #444; width: 40%;">Name</td>
            <td style="padding: 10px 16px; color: #444;">${visitorName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-weight: bold; color: #444;">Email</td>
            <td style="padding: 10px 16px; color: #444;">${visitorEmail}</td>
          </tr>
          <tr style="background: #F5F5F5;">
            <td style="padding: 10px 16px; font-weight: bold; color: #444;">Phone</td>
            <td style="padding: 10px 16px; color: #444;">${visitorPhone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; font-weight: bold; color: #444;">Profession</td>
            <td style="padding: 10px 16px; color: #444;">${visitorProfession}</td>
          </tr>
          ${message ? `<tr style="background: #F5F5F5;">
            <td style="padding: 10px 16px; font-weight: bold; color: #444;">Message</td>
            <td style="padding: 10px 16px; color: #444;">${message}</td>
          </tr>` : ''}
        </table>
        <p style="color: #444; line-height: 1.6;">
          Please reach out to confirm the visit date and provide any necessary information.
        </p>
        <p style="color: #444;">Best regards,<br/><strong>The BNI Platform Team</strong></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: leaderEmail,
    subject: `New Visit Request from ${visitorName} - ${chapterName}`,
    html,
  });
};

/**
 * Send contact form acknowledgement
 */
const sendContactAcknowledgement = async ({ name, email, subject }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #E31837; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">BNI</h1>
      </div>
      <div style="padding: 32px; background: #ffffff;">
        <h2 style="color: #222222; margin-top: 0;">We received your message!</h2>
        <p style="color: #444; line-height: 1.6;">Dear ${name},</p>
        <p style="color: #444; line-height: 1.6;">
          Thank you for contacting BNI. We have received your message regarding "${subject}" 
          and our team will get back to you within 2 business days.
        </p>
        <p style="color: #444;">Warm regards,<br/><strong>The BNI Team</strong></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'We received your message - BNI',
    html,
  });
};

module.exports = {
  sendEmail,
  sendVisitRequestConfirmation,
  sendVisitRequestToChapterLeader,
  sendContactAcknowledgement,
};
