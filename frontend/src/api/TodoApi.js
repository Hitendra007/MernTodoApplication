import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiclient = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
});

const addTodo = async (todo)=>{
    const response  = await apiclient.post('/todos/addTodo',{todo})
    return response;
}

const getTodos = async ()=>{
    const response  = await apiclient.get('/todos/getTodos')
    return response;
}

const toggleComplete = async (id)=>{
      const response = await apiclient.patch('/todos/toggleComplete',{id})
      return response;
}

const deleteTodo = async (id)=>{
    console.log(id)
      const response = await apiclient.delete('/todos/deleteTodo',{data:{id}})
      return response;
}

const updateTodo = async (id,todo)=>{
    console.log(id,todo)
    const response = await apiclient.patch('/todos/updateTodo',{id,todo})
    return response;
}

export {getTodos,toggleComplete,deleteTodo,updateTodo,addTodo}