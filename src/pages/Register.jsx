import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Register = () => {
  const [userdata, setUserData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleRegister() {
    const { email, password, confirmPassword } = userdata;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      login(token);
      navigate('/');
    } catch (error) {
      alert("Registration failed. " + error.message);
      console.error("Firebase Registration Error:", error);
    }
  }

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="First Name"
        value={userdata.firstName}
        onChange={(e) => setUserData({ ...userdata, firstName: e.target.value })} required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={userdata.lastName}
        onChange={(e) => setUserData({ ...userdata, lastName: e.target.value })} required
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={userdata.mobile}
        onChange={(e) => setUserData({ ...userdata, mobile: e.target.value })} required
      />
      <input
        type="email"
        placeholder="Email"
        value={userdata.email}
        onChange={(e) => setUserData({ ...userdata, email: e.target.value })} required
      />
      <input
        type="password"
        placeholder="Password"
        value={userdata.password}
        onChange={(e) => setUserData({ ...userdata, password: e.target.value })} required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={userdata.confirmPassword}
        onChange={(e) => setUserData({ ...userdata, confirmPassword: e.target.value })} required
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
