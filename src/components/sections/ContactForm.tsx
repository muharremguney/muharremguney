"use client";

import { useRef, useState } from "react";
import { contactSchema } from "@/lib/contact/schema";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get("company")) {
      setState({ status: "success", message: "Mesajınız için teşekkürler!" });
      formRef.current?.reset();
      return;
    }

    const validated = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validated.success) {
      setState({
        status: "error",
        message: "Lütfen formu kontrol edip tekrar deneyin.",
        errors: validated.error.flatten().fieldErrors,
      });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setState({
        status: "error",
        message: "Form şu anda yapılandırılmamış. Lütfen doğrudan e-posta gönderin.",
      });
      return;
    }

    setPending(true);
    setState(initialState);

    try {
      formData.delete("company");
      formData.set("name", validated.data.name);
      formData.set("email", validated.data.email);
      formData.set("message", validated.data.message);
      formData.append("access_key", accessKey);
      formData.append("subject", `Portföy sitesi | Yeni mesaj: ${validated.data.name}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setState({
          status: "success",
          message: "Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağım.",
        });
        formRef.current?.reset();
      } else {
        setState({
          status: "error",
          message:
            "Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.",
        });
      }
    } catch {
      setState({
        status: "error",
        message:
          "Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs uppercase tracking-wide text-muted"
        >
          ad_soyad
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
          placeholder="Adınız Soyadınız"
        />
        {state.errors?.name && (
          <p className="mt-1.5 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-wide text-muted"
        >
          e_posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
          placeholder="ornek@eposta.com"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-wide text-muted"
        >
          mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
          placeholder="Mesajınızı buraya yazın..."
        />
        {state.errors?.message && (
          <p className="mt-1.5 text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>

      {state.status !== "idle" && state.message && (
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === "success"
              ? "text-sm font-medium text-emerald-500"
              : "text-sm font-medium text-red-500"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
