// Criação do userRepository com CRUD de usuários:
import { prisma } from "../database/prismaClient.js"

export class UserRepository {
    create(data: any) {
        return prisma.user.create({ data })
    }
    getAll(){
        return prisma.user.findMany();
    }
    getById(id: number){
        return prisma.user.findUnique({where: {id}})
    }
    update(id: number, data: any){
        return prisma.user.update({where: {id}, data})
    }
    delete(id: number){
        return prisma.user.delete({where: {id}})
    }
}