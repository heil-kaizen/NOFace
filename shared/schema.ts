import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cardRequests = pgTable("card_requests", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  tokenAmount: integer("token_amount").notNull(),
  status: text("status", { enum: ["pending", "active", "expired"] }).default("pending").notNull(),
  cardNumber: text("card_number"), // Partial/masked for demo
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCardRequestSchema = createInsertSchema(cardRequests).pick({
  amount: true,
  tokenAmount: true,
});

export type InsertCardRequest = z.infer<typeof insertCardRequestSchema>;
export type CardRequest = typeof cardRequests.$inferSelect;

export type CreateCardResponse = CardRequest;
