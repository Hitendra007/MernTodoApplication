import React, { useContext, useState, createContext, useEffect } from "react";
import { addTodo as apiAddTodo, getTodos as apiGetTodos, updateTodo as apiUpdateTodos, deleteTodo as apiDeleteTodo, toggleComplete as apiToggleComplete } from "../api/TodoApi";
import {useAuth} from '../Context/AuthContext'
const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const {isAuthenticated}=useAuth()
    const [todos, setTodos] = useState([])
    const addTodo = async (todo) => {
        try {
            const response = await apiAddTodo(todo)
            if (response.status == 200) {
                console.log('todo successfully created!!', response.data)
                setTodos((prevtodos) => [...prevtodos, response.data.data.todo])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTodos = async () => {
        try {
            const response = await apiGetTodos();
            if (response.status == 200) {
                console.log("getTodos Response:", response.data.data);
                setTodos(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await apiDeleteTodo(id)
            if (response.status == 200) {
                console.log('Todo deleted Successfull')
                setTodos((prevtodos) => {
                    const updatedTodos = prevtodos.filter((todo) => todo._id !== id);
                    console.log('Updated todos after delete:', updatedTodos);
                    return updatedTodos; // This should correctly update the todos
                });
                console.log('Todo deleted Successfull below')

            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleComplete = async (id) => {
        try {
            const response = await apiToggleComplete(id);
            if (response.status == 200) {
                setTodos((prevtodos) => prevtodos.map((todo) => todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateTodo = async (id, newtodo) => {
        try {
            const response = await apiUpdateTodos(id, newtodo)
            if (response.status == 200) {
                setTodos((prevtodos) => prevtodos.map((todo) => todo._id === id ? { ...todo, todo: newtodo } : todo))
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
      if(isAuthenticated==false)
      {
        setTodos([])
      }
      else{
        getTodos()
      }
    },[isAuthenticated])
    return (
        <TodoContext.Provider value={{ addTodo, getTodos, deleteTodo, updateTodo, toggleComplete, todos}} >{children}</TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
};