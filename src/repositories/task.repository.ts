import { prisma } from "../database/prismaClient.js";
import { Prisma } from "@prisma/client";

//Criação do TaskRepository com crud de tarefas

export class TaskRepository {
    create(data: Prisma.TaskCreateInput){
        return prisma.task.create({data});
    }
    getAllByUser(userId: number){
        return prisma.task.findMany({ where: { userId } });
    }
    getByIdAndUser(id: number, userId: number){
        return prisma.task.findFirst({ where: { id, userId } });
    }
    updateByIdAndUser(id: number, userId: number, data: Prisma.TaskUpdateInput){
        return prisma.task.updateMany({ where: { id, userId }, data });
    }
    deleteByIdAndUser(id: number, userId: number){
        return prisma.task.deleteMany({ where: { id, userId } });
    }
}