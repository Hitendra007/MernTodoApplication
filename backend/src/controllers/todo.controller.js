import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";


const addTodo = asyncHandler(async(req,res)=>{
       const userId = req.user.id;
       const {todo}=req.body;
       const newTodo  = await Todo.create({todo,creator:userId})
       if(!newTodo)
       {
           throw new ApiError(500,'Unable to create Todo')
       }
       res.status(200).json(new ApiResponse(200,{todo:newTodo},'Todo Created Successfully!!'))
})



const getTodos = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const todos = await Todo.find({ creator: userId });

    if (!todos || todos.length === 0) {
        throw new ApiError(404, "Todos not found");
    }

    res.status(200).json(new ApiResponse(200, todos, "Fetched Todos successfully"));
});


const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.body
    console.log('deltete todo ',req.body)
    const userId = req.user.id; // Get the user's ID from the authenticated request

    // Find and delete the todo
    const todo = await Todo.findOneAndDelete({ _id: id, creator: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, null, "Todo deleted successfully"));
});


const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { todo: newTodo } = req.body;
    const userId = req.user.id;

    
    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id, creator: userId },
        { todo: newTodo },
        { new: true } 
    );

    if (!updatedTodo) {
        throw new ApiError(404, "Todo not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
});

// Toggle the completion status of a todo by ID
const toggleComplete = asyncHandler(async (req, res) => {
    const { id } = req.body; // Get the todo ID from the URL
    const userId = req.user.id; // Get the user's ID from the authenticated request

    // Find the todo
    const todo = await Todo.findOne({ _id: id, creator: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized");
    }

    // Toggle the isCompleted field
    todo.isCompleted = !todo.isCompleted;

    // Save the updated todo
    await todo.save();

    res.status(200).json(new ApiResponse(200, todo, "Todo completion status toggled successfully"));
});

// Export all functions
export { getTodos, deleteTodo, updateTodo, toggleComplete,addTodo};
