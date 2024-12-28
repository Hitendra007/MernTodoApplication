import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const HandelSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);

    try {
      await signup(name, email, password); // Wait for the signup to complete
      navigate('/login'); // Navigate to the Login page after successful signup
    } catch (error) {
      console.log("Error during signup: ", error);
    }
  };

  return (
    <div id="main-div">
      <form onSubmit={HandelSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
