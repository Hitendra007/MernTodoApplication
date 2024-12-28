import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { isAuthenticated, login } = useAuth()
    const  navigate  = useNavigate();
    const HandelLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        try {
            await login(email,password)
            navigate('/home')
            console.log('home')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id='main-div-login'>
            <form onSubmit={HandelLogin} id='loginform'>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className='form-group'> 
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
