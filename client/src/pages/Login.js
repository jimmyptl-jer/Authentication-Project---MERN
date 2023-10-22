import React, { useState } from 'react';
import './login.css'; // Import the CSS file

import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = data;

    try {
      const response = await axios.post('/login', {
        email: email,
        password: password
      });

      const responseData = response.data;

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({});
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="login-container">
      <form onSubmit={loginUser} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={e => setData({
            ...data, email: e.target.value
          })}
          placeholder="Enter Email" />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={e => setData({
            ...data, password: e.target.value
          })}
          placeholder="Enter Password" />

        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
