import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import path from "path";
import { promises as fs } from "fs";

export type EmailMode = "simulate" | "ethereal" | "smtp";

export type SendArgs = {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  attachments?: SendMailOptions["attachments"];
};

export type SendResult = {
  messageId: string;
  previewUrl?: string | null;
};

function sanitize(s: string) {
  return s.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").slice(0, 10000);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

function emailShell({ title, contentHtml, logoCid }: { title: string; contentHtml: string; logoCid?: string }) {
  const logoUrl = `${getSiteUrl()}/icon.svg`;
  const logoTag = logoCid
    ? `<img src="cid:${logoCid}" alt="Le Petit Marché" width="32" height="32" style="display:block" />`
    : `<img src="${logoUrl}" alt="Le Petit Marché" width="32" height="32" style="display:block" />`;
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f6f9fc;color:#111;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellPadding="0" cellSpacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;background:#ecfdf5;">
                <table role="presentation" width="100%" style="width:100%">
                  <tr>
                    <td style="width:40px;" valign="middle">${logoTag}</td>
                    <td valign="middle" style="font-weight:600;color:#065f46;font-size:16px;">Le Petit Marché</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                ${contentHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
                Ceci est un e‑mail automatique, merci de ne pas y répondre. © ${new Date().getFullYear()} Le Petit Marché.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function getTransport(mode: EmailMode = "simulate") {
  if (mode === "simulate") {
    return {
      async sendMail({ to, from, subject, text, html, replyTo }: SendArgs): Promise<SendResult> {
        await new Promise((res) => setTimeout(res, 200));
        const messageId = `sim-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        console.log("[email:simulated]", {
          to,
          from,
          subject: sanitize(subject),
          preview: sanitize(text || html || "").slice(0, 180),
          replyTo,
          messageId,
        });
        return { messageId, previewUrl: null };
      },
    };
  }

  if (mode === "ethereal") {
    try {
      // If provided, allow using pre-created Ethereal credentials (avoids createTestAccount TLS/API calls)
      const ethUser = process.env.EMAIL_ETHEREAL_USER;
      const ethPass = process.env.EMAIL_ETHEREAL_PASS;
      const ethHost = process.env.EMAIL_ETHEREAL_HOST || "smtp.ethereal.email";
      const ethPort = Number(process.env.EMAIL_ETHEREAL_PORT || 587);
      const ethSecure = String(process.env.EMAIL_ETHEREAL_SECURE || "false").toLowerCase() === "true";

      if (ethUser && ethPass) {
        const transporter = nodemailer.createTransport({
          host: ethHost,
          port: ethPort,
          secure: ethSecure,
          auth: { user: ethUser, pass: ethPass },
          tls: { rejectUnauthorized: false },
        });
        return {
          async sendMail(args: SendArgs): Promise<SendResult> {
            const info = await transporter.sendMail(args);
            const url = nodemailer.getTestMessageUrl(info) || null;
            console.log("[email:ethereal]", { messageId: info.messageId, previewUrl: url });
            return { messageId: info.messageId, previewUrl: url };
          },
        };
      }

      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
        // In some environments, Ethereal TLS can fail due to corporate MITM certs.
        tls: { rejectUnauthorized: false },
      });

      return {
        async sendMail(args: SendArgs): Promise<SendResult> {
          const info = await transporter.sendMail(args);
          const url = nodemailer.getTestMessageUrl(info) || null;
          console.log("[email:ethereal]", { messageId: info.messageId, previewUrl: url });
          return { messageId: info.messageId, previewUrl: url };
        },
      };
    } catch (e) {
      console.warn("[email:ethereal:fallback]", (e as Error)?.message || e);
      // Fallback to simulate to avoid breaking the UX
      return {
        async sendMail({ to, from, subject, text, html, replyTo }: SendArgs): Promise<SendResult> {
          await new Promise((res) => setTimeout(res, 150));
          const messageId = `sim-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
          console.log("[email:simulated:fallback]", {
            to,
            from,
            subject: sanitize(subject),
            preview: sanitize(text || html || "").slice(0, 180),
            replyTo,
            messageId,
          });
          return { messageId, previewUrl: null };
        },
      };
    }
  }

  // SMTP (e.g., Mailtrap), configured via env vars
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP mode requires SMTP_HOST, SMTP_USER, SMTP_PASS env vars");
  }
  const rejectUnauthorized = (process.env.EMAIL_TLS_REJECT_UNAUTHORIZED || "true").toLowerCase() !== "false";
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized },
  });

  return {
    async sendMail(args: SendArgs): Promise<SendResult> {
      const info = await transporter.sendMail(args);
      return { messageId: info.messageId, previewUrl: null };
    },
  };
}

export function buildTextConfirmation(name: string, subject: string, message: string) {
  return [
    `Bonjour ${name},`,
    "",
    "Nous avons bien reçu votre message. Voici un récapitulatif:",
    "",
    `Sujet: ${subject}`,
    "",
    "Message:",
    message,
    "",
    "Nous vous répondrons sous 24-48h ouvrées.",
    "",
    "— L'équipe Le Petit Marché",
  ].join("\n");
}

export function buildTextOwner(name: string, email: string, subject: string, message: string) {
  return [
    "Nouveau message depuis le formulaire de contact",
    "",
    `Nom: ${name}`,
    `Email: ${email}`,
    `Sujet: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

export function buildHtmlConfirmation(name: string, subject: string, message: string, logoCid?: string) {
  const content = `
    <h1 style="margin:0 0 8px 0;font-size:20px;color:#111">Bonjour ${escapeHtml(name)},</h1>
    <p style="margin:0 0 12px 0;color:#111">Nous avons bien reçu votre message. Voici un récapitulatif&nbsp;:</p>
    <p style="margin:0 0 8px 0;color:#111"><strong>Sujet&nbsp;:</strong> ${escapeHtml(subject)}</p>
    <div style="margin:12px 0;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa">
      <div style="font-size:12px;color:#6b7280;margin-bottom:6px;">Message</div>
      <pre style="white-space:pre-wrap;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${escapeHtml(message)}</pre>
    </div>
    <p style="margin:12px 0 0 0;color:#111">Nous vous répondrons sous 24–48h ouvrées.</p>
    <p style="margin:8px 0 0 0;color:#065f46"><strong>Merci de votre confiance,</strong><br/>L’équipe Le Petit Marché</p>
  `;
  return emailShell({ title: "Confirmation de votre message", contentHtml: content, logoCid });
}

export function buildHtmlOwner(name: string, email: string, subject: string, message: string, logoCid?: string) {
  const content = `
    <h1 style="margin:0 0 8px 0;font-size:20px;color:#111">Nouveau message de ${escapeHtml(name)}</h1>
    <p style="margin:0;color:#111"><strong>Nom&nbsp;:</strong> ${escapeHtml(name)}<br/>
    <strong>Email&nbsp;:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#065f46">${escapeHtml(email)}</a><br/>
    <strong>Sujet&nbsp;:</strong> ${escapeHtml(subject)}</p>
    <div style="margin:12px 0;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa">
      <div style="font-size:12px;color:#6b7280;margin-bottom:6px;">Message</div>
      <pre style="white-space:pre-wrap;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${escapeHtml(message)}</pre>
    </div>
  `;
  return emailShell({ title: `[Contact] ${subject}`, contentHtml: content, logoCid });
}

export async function loadLogoAttachment(cid: string): Promise<NonNullable<SendMailOptions["attachments"]>[number] | undefined> {
  const candidates = [
    path.join(process.cwd(), "public", "icon.svg"),
    path.join(process.cwd(), "src", "app", "icon.svg"),
  ];
  for (const p of candidates) {
    try {
      const content = await fs.readFile(p);
      return {
        filename: "icon.svg",
        content,
        contentType: "image/svg+xml",
        cid,
      };
    } catch {
      // try next
    }
  }
  return undefined;
}
