import { prisma } from "../database/prismaClient.js";

//Criação do TaskRepository com crud de tarefas

export class TaskRepository {
    create(data: any){
        return prisma.task.create({data});
    }
    getAll(){
        return prisma.task.findMany();
    }
    getById(id: number){
        return prisma.task.findUnique({where: {id}});
    }
    update(id: number, data: any){
        return prisma.task.update({where: {id}, data});
    }
    delete(id: number){
        return prisma.task.delete({where: {id}});
    }
}