import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587', 10),
  secure: process.env.MAIL_SECURE === 'true', // true ל־465, false ל־587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * שולח מייל פשוט
 * @param to כתובת יעד
 * @param subject נושא המייל
 * @param html תוכן המייל בפורמט HTML
 */
export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });

  console.log('מייל נשלח:', info.messageId);
}
