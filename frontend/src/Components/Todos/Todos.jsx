import React, { useState } from "react";
import './todo.css';
import { useTodo } from "../../Context/TodoContext";

function Todos() {
    const { todos, deleteTodo, updateTodo, toggleComplete } = useTodo();
    const [editingTodoId, setEditingTodoId] = useState(null); // Track which todo is being edited
    const [updatedTodoValue, setUpdatedTodoValue] = useState(''); // Track updated value

    const deleteTodoHandler = async (id) => {
        try {
            await deleteTodo(id);
            console.log("Todo Deleted Successfully", id);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCompleteHandler = async (id) => {
        try {
            await toggleComplete(id);
            console.log("Toggled Complete", id);
        } catch (error) {
            console.log(error);
        }
    };

    const startEditing = (todo) => {
        setEditingTodoId(todo._id); // Set the todo in edit mode
        setUpdatedTodoValue(todo.todo); // Pre-fill the input with the current todo value
    };

    const saveUpdatedTodo = async (id) => {
        try {
            await updateTodo(id, updatedTodoValue);
            console.log("Todo Updated Successfully", id);
            setEditingTodoId(null); // Exit edit mode
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="todo-div">
            <div id="todos-div">
                {todos.map((t) => (
                    <div key={t._id} className={`todo-item ${t.isCompleted ? 'iscompleted' : ''}`} >
                        <input
                            type="text"
                            value={editingTodoId === t._id ? updatedTodoValue : t.todo}
                            readOnly={editingTodoId !== t._id} // Make input editable only for the todo in edit mode
                            onChange={(e) => setUpdatedTodoValue(e.target.value)}
                            className={t.isCompleted ? "completed" : ""}
                        />
                        <button onClick={() => deleteTodoHandler(t._id)}>🗑️</button>
                        {t.isCompleted ? (
                            <button onClick={() => toggleCompleteHandler(t._id)} style={{ backgroundColor: "white" }}>❌</button>
                        ) : (
                            <button onClick={() => toggleCompleteHandler(t._id)} style={{ backgroundColor: "white" }}>✅</button>
                        )}
                        {editingTodoId === t._id ? (
                            <button  onClick={() => saveUpdatedTodo(t._id)} style={{backgroundColor:'white'}}>✔️</button>
                        ) : (
                            <button disabled={t.isCompleted==true} onClick={() => startEditing(t)} style={{ backgroundColor: 'white' }}>✏️</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todos;
