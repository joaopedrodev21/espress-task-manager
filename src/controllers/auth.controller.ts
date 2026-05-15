import { type Request, type Response } from 'express';
import { registerSchema } from '../schemas/auth.schema.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response){
        try{
            const validatedData = registerSchema.parse(req.body);

            const user = await authService.register(
                validatedData.name,
                validatedData.email,
                validatedData.password,
            );

            return res.status(201).json(user);
        }
        catch(error: any){
            return res.status(error.statusCode ?? 400).json({
                message: error.errors?.[0]?.message || error.message || "Dados inválidos",
            });
        }
    }
    async login(req: Request, res: Response){
        try{
            const validatedData = loginSchema.parse(req.body);

            const result = await authService.login(validatedData.email, validatedData.password);
            return res.json(result);
        }
        catch(error: any){
            return res.status(error.statusCode ?? 400).json({
                message: error.errors?.[0]?.message || error.message || "Dados inválidos",
            });
        } 
    }
}
