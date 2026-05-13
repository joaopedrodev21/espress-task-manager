import { type Request, type Response } from "express";
import { UserRepository } from "../repositories/user.repository.js"
import { createUserSchema } from "../schemas/user.schema.js"
import { updateUserSchema } from "../schemas/user.schema.js";

const userRepository = new UserRepository();

export class UserController {
    async getAll(req: Request, res: Response){
        const users = await userRepository.getAll();
        res.json(users);
    };
    async create(req: Request, res: Response){
        try {
            const validatedData = createUserSchema.parse(req.body);

            const user = await userRepository.create(validatedData);

            return res.status(201).json(user);

        } catch (error: any) {
            return res.status(400).json({
            message: error.errors?.[0]?.message || "Dados inválidos"
            });
        }
    }
    async getById(req: Request, res: Response){
        try {
            const userId = Number(req.params.id);

            if(isNaN(userId)){
                return res.status(400).json({
                    message: "ID inválido"
                });
            }
            const user = await userRepository.getById(userId);

            if(!user){
                return res.status(404).json({
                    message: "Usuário não encontrado"
                })
            }
            return res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    async update(req: Request, res: Response){
        try {
            const userId = Number(req.params.id)
            
            if(isNaN(userId)){
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const userExists = await userRepository.getById(userId);

            if(!userExists){
                return res.status(404).json({
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
    async delete(req: Request, res: Response){
        try {
            const userId = Number(req.params.id);

            if(isNaN(userId)){
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            await userRepository.delete(userId)
            return res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
