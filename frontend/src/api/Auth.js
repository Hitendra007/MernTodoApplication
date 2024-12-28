import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiclient = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
});


const signup = async (name,email , password) => {
    const response = await apiclient.post('/users/signup/',{name,email,password});
    return response;
}

const login = async (email , password) => {
    const response = await apiclient.post('/users/login/',{email,password});
    return response;
}

const logout = async () => {
    const response = await apiclient.get('/users/logout/');
    return response;
}

const checkAuthStatus = async () => {
    const response = await apiclient.get('/users/authStatus/');
    return response;
}   

export {signup,login,logout,checkAuthStatus};




