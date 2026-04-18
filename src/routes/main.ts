import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { UserController } from  "../controllers/users.controller.js"

const router = Router();
const taskController = new TaskController();
const userController = new UserController();

//Rotas de Tasks:
router.get("/tasks", taskController.getAll);
router.post("/tasks", taskController.create);
router.get("/tasks/:id", taskController.getById);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

//Rotas de Users
router.get("/users", userController.getAll);
router.post("/users", userController.create);
router.get("/users/:id", userController.getById);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//Main Router:
router.get("/", (req, res) => {
  res.send("API is running");
});


export default router;