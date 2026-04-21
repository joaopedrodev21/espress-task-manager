import { type Request, type Response } from "express";
import { TaskRepository } from "../repositories/task.repository.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";


const taskRepository = new TaskRepository();

export class TaskController {
    async getAll(req: Request, res: Response) {
        const tasks = await taskRepository.getAll();
        res.json(tasks);
    };
    async create(req: Request, res: Response) {
        try {
            const validatedData = createTaskSchema.parse(req.body);
            const createData: any = {
                title: validatedData.title,
                done: validatedData.done,
                priority: validatedData.priority,
                user: { connect: { id: validatedData.userId } }
            };
            if (validatedData.description !== undefined) createData.description = validatedData.description;
            if (validatedData.dueDate !== undefined) createData.dueDate = validatedData.dueDate;
            const task = await taskRepository.create(createData);
            res.status(201).json(task);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    };
    async getById(req: Request, res: Response) {
        try {
            const taskId = Number(req.params.id);
            
            if(isNaN(taskId)){
                return res.status(404).json({
                    message: 'ID invalido'
                });
            }
            const task = await taskRepository.getById(taskId);
            if(!task){
                return res.status(404).json({
                    message: 'Tarefa nao encontrada'
                });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    };
    async update(req: Request, res: Response) {
        try {
            const taskId = Number(req.params.id);

            if (isNaN(taskId)) {
                return res.status(400).json({
                message: "ID inválido"
                });
            }

            const taskExists = await taskRepository.getById(taskId);

            if (!taskExists) {
                return res.status(404).json({
                message: "Tarefa não encontrada"
                });
            }
            const validatedData = updateTaskSchema.parse(req.body);
            const updateData: any = {};
            if (validatedData.title !== undefined) updateData.title = validatedData.title;
            if (validatedData.description !== undefined) updateData.description = validatedData.description;
            if (validatedData.done !== undefined) updateData.done = validatedData.done;
            if (validatedData.priority !== undefined) updateData.priority = validatedData.priority;
            if (validatedData.dueDate !== undefined) updateData.dueDate = validatedData.dueDate;
            const task = await taskRepository.update(
                taskId,
                updateData
            );
            return res.json(task);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const taskId = Number(req.params.id);

            if (isNaN(taskId)) {
                return res.status(400).json({
                message: "ID inválido"
                });
            }

            const task = await taskRepository.getById(taskId);

            if (!task) {
                return res.status(404).json({
                message: "Tarefa não encontrada"
                });
            }

            await taskRepository.delete(taskId);
            return res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}   

