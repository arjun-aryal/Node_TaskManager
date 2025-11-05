import express from "express";

import {
    createTaskController, 
    getAllTasksController,
    getTaskByIdController, 
    partialUpdateTaskController, 
    updateTaskController,
    deleteTaskController

} from "../controllers/taskController.js";

import { authenticate } from '../middleware/authMiddleware.js';



const taskRouter = express.Router();

taskRouter.post("/", authenticate, createTaskController);
taskRouter.get("/", authenticate, getAllTasksController);
taskRouter.get("/:id", authenticate, getTaskByIdController);
taskRouter.put("/:id", authenticate, updateTaskController);
taskRouter.patch("/:id", authenticate, partialUpdateTaskController);

taskRouter.delete("/:id", authenticate, deleteTaskController);


export default taskRouter;


