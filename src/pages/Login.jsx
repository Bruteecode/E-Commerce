// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  const [userdata, setUserData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userdata.email,
        userdata.password
      );

      const token = await userCredential.user.getIdToken();
      login(token);
      navigate("/");
    } catch (error) {
      alert("Login failed. " + error.message);
      console.error("Firebase Login Error:", error);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={userdata.email}
        onChange={(e) => setUserData({ ...userdata, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={userdata.password}
        onChange={(e) => setUserData({ ...userdata, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
  Don't have an account? <a href="/register">Sign up</a>
</p>

    </div>
  );
};

export default Login;
