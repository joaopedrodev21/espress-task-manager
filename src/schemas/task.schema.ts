import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  done: z.boolean().optional(),
  priority: z.enum(["LOW", "HIGH"]).optional()
}).refine(data =>
  data.title !== undefined ||
  data.description !== undefined ||
  data.done !== undefined ||
  data.priority !== undefined,
{
  message: "Envie ao menos um campo para atualizar"
});