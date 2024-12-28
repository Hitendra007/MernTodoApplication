import React from 'react'
import './todoForm.css'
import { useTodo } from '../../Context/TodoContext'
function TodoForm() {

  const {addTodo}= useTodo()
  
  const addTodoHandler = async(e)=>{
        e.preventDefault();
        const todo = e.target.todo.value;
        try {
            const response  = await addTodo(todo)
            e.target.reset();
        } catch (error) {
          console.log(error)
        }
  }
  
  

  return (
    <div id='main-div-todo'>
     <form onSubmit={addTodoHandler} id='todo-form'>
           <div id='form-group'>
                <label htmlFor="todo"><b>Todo Form</b></label>
                <input type="text" name='todo' placeholder='Enter your Todo here' />
           </div>
           <div id='form-group'>
                <button type='submit'>Create Todo</button>
           </div>
     </form>
    </div>
  )
}

export default TodoForm
