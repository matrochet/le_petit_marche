"use client";

import { useCallback, useMemo, useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<{
  name: string;
  email: string;
  subject: string;
  message: string;
  root: string;
}>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validate(values: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  }
  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "Veuillez saisir un e‑mail valide.";
  }
  if (!values.subject || values.subject.trim().length < 2) {
    errors.subject = "Le sujet doit contenir au moins 2 caractères.";
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<{ owner?: string | null; user?: string | null } | null>(null);

  const isValid = useMemo(() => {
    const es = validate(values);
    return !es.name && !es.email && !es.subject && !es.message;
  }, [values]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // live validation per field
    setErrors((prev) => {
      const clone = { ...prev };
      if (name === "name") {
        clone.name = value.trim().length >= 2 ? undefined : "Le nom doit contenir au moins 2 caractères.";
      }
      if (name === "email") {
        clone.email = emailRegex.test(value) ? undefined : "Veuillez saisir un e‑mail valide.";
      }
      if (name === "subject") {
        clone.subject = value.trim().length >= 2 ? undefined : "Le sujet doit contenir au moins 2 caractères.";
      }
      if (name === "message") {
        clone.message = value.trim().length >= 10 ? undefined : "Le message doit contenir au moins 10 caractères.";
      }
      return clone;
    });
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const es = validate(values);
    if (es.name || es.email || es.subject || es.message) {
      setErrors(es);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors((prev) => ({ ...prev, root: data?.message || "Une erreur est survenue. Veuillez réessayer." }));
        return;
      }
      setSubmitted(true);
      setPreviewUrls(data?.preview || null);
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrors((prev) => ({ ...prev, root: "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez." }));
    } finally {
      setSubmitting(false);
    }
  }, [values]);

  if (submitted) {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <p className="font-medium">Merci, votre message a bien été envoyé.</p>
        <p>Nous vous répondrons dans les meilleurs délais.</p>
        {previewUrls && (previewUrls.owner || previewUrls.user) && (
          <div className="mt-3 space-x-3">
            {previewUrls.owner && (
              <a
                href={previewUrls.owner}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border border-emerald-300 bg-white px-3 py-1 text-emerald-700 hover:bg-emerald-50"
              >
                Aperçu e‑mail boutique
              </a>
            )}
            {previewUrls.user && (
              <a
                href={previewUrls.user}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border border-emerald-300 bg-white px-3 py-1 text-emerald-700 hover:bg-emerald-50"
              >
                Aperçu e‑mail client
              </a>
            )}
          </div>
        )}
        <button
          type="button"
          className="mt-3 inline-flex items-center rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          onClick={() => setSubmitted(false)}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {errors.root && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-red-900">
          {errors.root}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom{String.fromCharCode(160)}:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-emerald-200"}`}
          placeholder="Votre nom"
          value={values.name}
          onChange={onChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E‑mail{String.fromCharCode(160)}:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-emerald-200"}`}
          placeholder="votre@email.fr"
          value={values.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Sujet{String.fromCharCode(160)}:
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${errors.subject ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-emerald-200"}`}
          placeholder="Sujet de votre demande"
          value={values.subject}
          onChange={onChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message{String.fromCharCode(160)}:
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${errors.message ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-emerald-200"}`}
          placeholder="Expliquez votre demande"
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !isValid}
          className={`inline-flex items-center rounded bg-emerald-600 px-4 py-2 text-white transition-colors ${submitting || !isValid ? "opacity-60 cursor-not-allowed" : "hover:bg-emerald-700"}`}
        >
          {submitting ? "Envoi en cours…" : "Envoyer"}
        </button>
        <span className="text-sm text-gray-500">Réponse sous 24 à 48h ouvrées.</span>
      </div>
    </form>
  );
}
