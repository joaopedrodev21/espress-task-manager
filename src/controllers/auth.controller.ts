import { type Request, type Response } from 'express';
import { registerSchema } from '../schemas/auth.schema.js';
import { loginSchema } from '../schemas/auth.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';

const userRepository = new UserRepository();

export class AuthController {
    async register(req: Request, res: Response){
        try{
            const validatedData = registerSchema.parse(req.body);

            const userAlreadyExists = await userRepository.getByEmail(validatedData.email);
            if(userAlreadyExists){
                return res.status(409).json({
                    message: "Email já cadastrado, esse usuário já existe."
                });
            }

            const passwordHash = await bcrypt.hash(validatedData.password, 10);
            
            const user = await userRepository.create({
                name: validatedData.name,
                email: validatedData.email,
                passwordHash,
            });

            const {passwordHash: _, ...safeUser} = user;
            res.status(201).json(safeUser);
        }
        catch(error: any){
            res.status(400).json({
                message: error.errors?.[0]?.message || "Dados inválidos",
            })
        }
    }
    async login(req: Request, res: Response){
        try{
            const validatedData = loginSchema.parse(req.body);

            const user = await userRepository.getByEmail(validatedData.email);
            if(!user){
                return res.status(401).json({
                    message: "Credenciais inválidas"
                });
            }

            const passwordIsValid = await bcrypt.compare(validatedData.password, user .passwordHash);
            if(!passwordIsValid){
                return res.status(401).json({
                    message: "Credenciais inválidas"
                });
            }

            const secret = process.env.JWT_SECRET;
            if(!secret){
                return res.status(500).json({
                    message: "JWT_SECRET não configurado"
                })
            }

            const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: '1h' });

            const {passwordHash: _, ...safeUser} = user;
            return res.json({ token, user: safeUser });
        }
        catch(error: any){
            return res.status(400).json({
                message: error.errors?.[0]?.message || "Dados inválidos",
            })
        } 
    }
}
