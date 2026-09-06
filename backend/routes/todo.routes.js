import express from 'express'
import {getAllTodo, addTodo, updateTodo, deleteTodo} from '../controllers/todo.controller.js'

const router = express.Router();

router.get("/todos", getAllTodo);

router.post("/", addTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);


export default router;
