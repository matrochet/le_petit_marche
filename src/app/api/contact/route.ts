import { NextResponse } from "next/server";
import { buildTextConfirmation, buildTextOwner, buildHtmlConfirmation, buildHtmlOwner, getTransport, loadLogoAttachment } from "@/lib/email";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function getClientIp(req: Request) {
  try {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0]?.trim();
    const cf = req.headers.get("cf-connecting-ip");
    if (cf) return cf.trim();
    const realIp = req.headers.get("x-real-ip");
    if (realIp) return realIp.trim();
  } catch {}
  return "unknown";
}


export async function POST(req: Request) {
  const timestamp = new Date().toISOString();
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "unknown";
  const attemptId = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

  try {
    const body = (await req.json()) as Payload;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    // Log initial attempt (sanitized)
    console.log("[contact:attempt]", { attemptId, timestamp, ip, ua, nameLen: name.length, email, subjectLen: subject.length, messageLen: message.length });

    // Validation
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Le nom doit contenir au moins 2 caractères.";
    if (!emailRegex.test(email)) errors.email = "Veuillez saisir un e‑mail valide.";
    if (subject.length < 2) errors.subject = "Le sujet doit contenir au moins 2 caractères.";
    if (message.length < 10) errors.message = "Le message doit contenir au moins 10 caractères.";
    if (Object.keys(errors).length > 0) {
      console.warn("[contact:validation-failed]", { attemptId, errors });
      return NextResponse.json({ ok: false, message: "Données invalides", errors }, { status: 400 });
    }

    // Choose transport mode: simulate | ethereal | smtp
    const mode = (process.env.EMAIL_MODE as "simulate" | "ethereal" | "smtp") || "simulate";
    const transport = await getTransport(mode);

    // Send email to site owner
    const ownerTo = process.env.CONTACT_RECIPIENT || "contact@lepetitmarche.fr";
    const ownerFrom = process.env.CONTACT_SENDER || "no-reply@lepetitmarche.fr";
  const ownerText = buildTextOwner(name, email, subject, message);
  const ownerLogoCid = "logo@lepetitmarche";
  const ownerHtml = buildHtmlOwner(name, email, subject, message, ownerLogoCid);
    const ownerSubject = `[Contact] ${subject}`;
    const ownerAttachment = await loadLogoAttachment(ownerLogoCid);
    const ownerRes = await transport.sendMail({
      to: ownerTo,
      from: ownerFrom,
      subject: ownerSubject,
      text: ownerText,
      html: ownerHtml,
      attachments: ownerAttachment ? [ownerAttachment] : undefined,
      replyTo: email,
    });

    // Send confirmation email to user
  const userText = buildTextConfirmation(name, subject, message);
  const userLogoCid = "logo-user@lepetitmarche";
  const userHtml = buildHtmlConfirmation(name, subject, message, userLogoCid);
    const userSubject = `Nous avons bien reçu votre message`;
    const userAttachment = await loadLogoAttachment(userLogoCid);
    const userRes = await transport.sendMail({
      to: email,
      from: ownerFrom,
      subject: userSubject,
      text: userText,
      html: userHtml,
      attachments: userAttachment ? [userAttachment] : undefined,
    });

    console.log("[contact:success]", { attemptId, ownerMessageId: ownerRes.messageId, userMessageId: userRes.messageId, mode });
    return NextResponse.json({
      ok: true,
      message: "Votre message a été envoyé.",
      attemptId,
      preview: mode === "ethereal" ? { owner: ownerRes.previewUrl, user: userRes.previewUrl } : undefined,
    });
  } catch (err) {
    const msg = (err as Error)?.message || String(err);
    console.error("[contact:error]", { attemptId, timestamp, ip, ua, err: msg });
    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json({ ok: false, message: isDev ? msg : "Requête invalide" }, { status: 400 });
  }
}
