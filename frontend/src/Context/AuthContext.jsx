import React, { useState, useContext, useEffect, createContext } from "react";
import { signup as apiSignup, login as apiLogin, logout as apiLogout, checkAuthStatus } from "../api/Auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    
    const checkAuth = async () => {
        try {
            const response = await checkAuthStatus();
            if (response.status === 200) {
                setUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            console.log(response)
            if (response.status === 200) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                setToken(response.data.accesstoken);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await apiSignup(name, email, password);
            console.log(response);
            if (response.status === 200) {
                // setUser(response.data.user);
                // setIsAuthenticated(true);
                // setToken(response.data.accesstoken);
                console.log('successfull signup')
            } else {
                console.log("Signup failed: ", response.status);
            }
        } catch (err) {
            console.log("Error during signup: ", err);
        }
    };

    const logout = async () => {
        try {
            console.log(token)
            const response = await apiLogout();
            if (response.status === 200) {
                setUser(null);
                setIsAuthenticated(false);
                setToken('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
