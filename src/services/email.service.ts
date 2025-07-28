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
export async function sendUserWelcomeEmail(user: { name: string; email: string }, courseName: string) {
  const html = `
    <h2>שלום ${user.name},</h2>
    <p>נרשמת בהצלחה לקורס <strong>${courseName}</strong>!</p>
    <p>בקרוב תקבל גישה לקורס במערכת.</p>
  `;

  await sendMail(user.email, `נרשמת לקורס ${courseName}`, html);
}
const ADMIN_EMAIL= process.env.ADMIN_EMAIL || 'bandmapplication@gmail.com';    
export async function notifyAdminUserRegistered(user: { name: string; email: string }, courseName: string) {
  const html = `
    <p>יוזר חדש נרשם לקורס:</p>
    <ul>
      <li>שם: ${user.name}</li>
      <li>אימייל: ${user.email}</li>
      <li>קורס: ${courseName}</li>
    </ul>
    <p>יש להעניק לו גישה לקורס.</p>
  `;

  await sendMail(ADMIN_EMAIL, `משתמש חדש נרשם לקורס ${courseName}`, html);
}