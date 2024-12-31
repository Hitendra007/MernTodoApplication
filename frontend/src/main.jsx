import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Signup from './Components/Signup/Signup.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import WelcomePage from './Components/WelcomePage/welcomePage.jsx';
import { TodoProvider } from './Context/TodoContext.jsx';
import Profile from './Components/Profile/Profile.jsx';
// Router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
      <Route index element={<WelcomePage/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
        {/* PrivateRoute will protect this route */}
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TodoProvider>
      <RouterProvider router={router} />
      </TodoProvider>
    </AuthProvider>
  </StrictMode>
);
