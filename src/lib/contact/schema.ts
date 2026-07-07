import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad Soyad en az 2 karakter olmalı.")
    .max(100, "Ad Soyad çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  message: z
    .string()
    .trim()
    .min(10, "Mesajınız en az 10 karakter olmalı.")
    .max(2000, "Mesajınız çok uzun."),
});

export type ContactInput = z.infer<typeof contactSchema>;
