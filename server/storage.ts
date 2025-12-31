import { db } from "./db";
import {
  cardRequests,
  type InsertCardRequest,
  type CreateCardResponse
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createCardRequest(request: InsertCardRequest): Promise<CreateCardResponse>;
  getRecentCardRequests(): Promise<CreateCardResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createCardRequest(request: InsertCardRequest): Promise<CreateCardResponse> {
    const [card] = await db.insert(cardRequests)
      .values({
        ...request,
        cardNumber: this.generateMockCardNumber(),
        status: "active"
      })
      .returning();
    return card;
  }

  async getRecentCardRequests(): Promise<CreateCardResponse[]> {
    return await db.select()
      .from(cardRequests)
      .orderBy(desc(cardRequests.createdAt))
      .limit(10);
  }

  private generateMockCardNumber(): string {
    return `4${Math.floor(Math.random() * 1000000000000000)}`;
  }
}

export const storage = new DatabaseStorage();
