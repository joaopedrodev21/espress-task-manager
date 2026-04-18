//criação dos controllers de tarefas: 
import { type Request, type Response } from "express";
import { TaskRepository } from "../repositories/task.repository.js";
import { updateTaskSchema } from "../schemas/task.schema.js";


const taskRepository = new TaskRepository();

export class TaskController {
    async getAll(req: Request, res: Response) {
        const tasks = await taskRepository.getAll();
        res.json(tasks);
    };
    async create(req: Request, res: Response) {
        const { title, userId, priority, done, description} = req.body;
        
        if(!title || !userId){
            return res.status(400).json({
                message: 'title e userId são obrigatorios'
            })
        }
        const task = await taskRepository.create({title, userId, priority, done, description});
        res.status(201).json(task);
    };
    async getById(req: Request, res: Response) {
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
    };
    async update(req: Request, res: Response) {
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
        const task = await taskRepository.update(
            taskId,
            validatedData
        );
        return res.json(task);
    }
    async delete(req: Request, res: Response) {
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
    }
}   

