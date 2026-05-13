// Criação do userRepository com CRUD de usuários:
import { prisma } from "../database/prismaClient.js"
import { Prisma } from "@prisma/client"

export class UserRepository {
    create(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data })
    }
    getAll(){
        return prisma.user.findMany();
    }
    getById(id: number){
        return prisma.user.findUnique({where: {id}})
    }
    getByEmail(email: string){
        return prisma.user.findUnique({where: {email}})
    }
    update(id: number, data: Prisma.UserUpdateInput){
        return prisma.user.update({where: {id}, data})
    }
    delete(id: number){
        return prisma.user.delete({where: {id}})
    }
}