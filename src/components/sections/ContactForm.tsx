"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/lib/contact/actions";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Gönderiliyor..." : "Mesaj Gönder"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Ad Soyad
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
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          E-posta
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
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Mesajınız
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

      <SubmitButton />

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
