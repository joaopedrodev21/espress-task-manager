import { type Request, type Response } from "express";
import { UserRepository } from "../repositories/user.repository.js"
import { updateUserSchema } from "../schemas/user.schema.js";

const userRepository = new UserRepository();

export class UserController {
    async getMe(req: Request, res: Response){
        try {
            const userId = req.user!.id;
            const user = await userRepository.getById(userId);

            if(!user){
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.json(user);

        } catch (error: any) {
            return res.status(500).json({
            message: "Erro interno do servidor"
            });
        }
    }
    async updateMe(req: Request, res: Response){
        try {
            const userId = req.user!.id;
            const userExists = await userRepository.getById(userId);

            if(!userExists){
                return res.status(400).json({
                    message: "Usuário não encontrado"
                });
            }

            const validatedData = updateUserSchema.parse(req.body);
            const updateData: any = {};
            if (validatedData.name !== undefined) updateData.name = validatedData.name;
            if (validatedData.email !== undefined) updateData.email = validatedData.email;
            const user = await userRepository.update(
                userId,
                updateData,
            );
            return res.json(user);
        } catch (error: any) {
            return res.status(400).json({
            message: error.errors?.[0]?.message || "Dados inválidos"
            });
        }
    }
    async deleteMe(req: Request, res: Response){
        try {
            const userId = req.user!.id;

            await userRepository.delete(userId)
            return res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
