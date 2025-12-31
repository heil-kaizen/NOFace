import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.cards.create.path, async (req, res) => {
    try {
      const input = api.cards.create.input.parse(req.body);
      const card = await storage.createCardRequest(input);
      // Simulate processing delay for "hacker" effect
      setTimeout(() => {
         // In a real app we wouldn't hold the request, but for this demo it's fine
      }, 1000);
      res.status(201).json(card);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.cards.list.path, async (req, res) => {
    const cards = await storage.getRecentCardRequests();
    res.json(cards);
  });

  return httpServer;
}

// Seed function to add some fake recent activity
async function seedData() {
  const recent = await storage.getRecentCardRequests();
  if (recent.length === 0) {
    const amounts = [10, 25, 50, 100];
    for (let i = 0; i < 5; i++) {
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      await storage.createCardRequest({
        amount,
        tokenAmount: Math.floor(amount * 900), // Approx rate
      });
    }
  }
}

// Run seed on startup (non-blocking)
seedData().catch(console.error);
