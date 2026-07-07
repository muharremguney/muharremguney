import type { ContactInput } from "./schema";

// Supabase entegrasyon noktası: gövde `insert` çağrısıyla değişecek, imza aynı kalacak.
export async function persistContactMessage(data: ContactInput): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[contact] Supabase bağlı değil, mesaj kaydedilmedi:", data);
  }
}
