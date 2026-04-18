import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome precisa ter no mínimo 3 caracteres"),

  email: z
    .string()
    .email("Email inválido")
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional()
}).refine(data =>
  data.name !== undefined ||
  data.email !== undefined,
{
  message: "Envie ao menos um campo para atualizar"
});