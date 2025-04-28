import { z } from "zod";

export const deleteTaskInputSchema = z.object({
  id: z.number(),
});