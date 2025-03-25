import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// GET all tasks
router.get("/", getAllTasks);

// POST create a new task
router.post("/", createTask);

// PUT update a task
router.put("/:id", updateTask);

// DELETE a task
router.delete("/:id", deleteTask);

export default router;
