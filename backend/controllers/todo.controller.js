import { Todo } from '../models/todo.model.js'

export const getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find({})
        if (!todos) {
            res.status(404).json({success:false, message:'No Todos are Created!'})
        }

        res.status(200).json({success:true, message:todos})
    } catch (err) {
        res.status(500).json({success:false, message:err.message})
    }
}

export const addTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        if (!todo) {
            return res.status(400).json({success:false, message:'Todo is required!'})
        }

        const data = await Todo.create({ todo })
        data.save();
        res.status(200).json({success:true, message:'Todo created successfully!'})

        res.status(200).json({success:true, message:todo})
    } catch (err) {
        res.status(500).json({success:false, message:err.message})
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: 'Id is required!' });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found!' });
        }
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: 'Id is required!' });
        }
        const deleteTodo = await Todo.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found!' });
        }
        res.status(200).json({ success: true, message:'Todo Deleted successfully'});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}