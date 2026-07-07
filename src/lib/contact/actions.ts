"use server";

import type { ContactFormState } from "@/types";
import { contactSchema } from "./schema";
import { persistContactMessage } from "./store";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: gizli alan botlar tarafından doldurulur, gerçek kullanıcılar görmez.
  if (formData.get("company")) {
    return { status: "success", message: "Mesajınız için teşekkürler!" };
  }

  const validated = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      status: "error",
      message: "Lütfen formu kontrol edip tekrar deneyin.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  await persistContactMessage(validated.data);

  return {
    status: "success",
    message: "Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağım.",
  };
}
