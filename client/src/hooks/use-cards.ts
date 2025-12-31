import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateCardResponse } from "@shared/routes";
import { z } from "zod";

// Create Card
export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.cards.create.input>) => {
      const res = await fetch(api.cards.create.path, {
        method: api.cards.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.cards.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to generate card sequence");
      }
      
      return api.cards.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cards.list.path] });
    },
  });
}

// List Recent Cards (Social Proof)
export function useRecentCards() {
  return useQuery({
    queryKey: [api.cards.list.path],
    queryFn: async () => {
      const res = await fetch(api.cards.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch recent transmissions");
      return api.cards.list.responses[200].parse(await res.json());
    },
    refetchInterval: 10000, // Poll every 10s for live feel
  });
}
