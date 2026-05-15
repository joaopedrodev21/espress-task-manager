import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  priority: z.enum(["LOW", "HIGH"]).optional().default("LOW"),
  done: z.boolean().optional().default(false),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional()
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  done: z.boolean().optional(),
  priority: z.enum(["LOW", "HIGH"]).optional(),
  dueDate: z.string().datetime().optional()
}).refine(data =>
  data.title !== undefined ||
  data.description !== undefined ||
  data.done !== undefined ||
  data.priority !== undefined ||
  data.dueDate !== undefined,
{
  message: "Envie ao menos um campo para atualizar"
});