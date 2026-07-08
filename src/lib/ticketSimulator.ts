export type TicketCategory = "Donanım" | "Yazılım" | "Ağ / İnternet" | "Diğer";
export type TicketPriority = "Düşük" | "Orta" | "Yüksek";
export type TicketStatus = "Açık" | "İnceleniyor" | "Çözüldü";

export const ticketCategories: TicketCategory[] = ["Donanım", "Yazılım", "Ağ / İnternet", "Diğer"];
export const ticketPriorities: TicketPriority[] = ["Düşük", "Orta", "Yüksek"];
export const ticketStatuses: TicketStatus[] = ["Açık", "İnceleniyor", "Çözüldü"];

export type Ticket = {
  id: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  assignedTo: string;
  createdAt: Date;
};

export function generateTicketId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TCK-${year}-${random}`;
}
