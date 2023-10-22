import React, { useState } from 'react';
import axios from 'axios'
import './register.css'; // Import the CSS file
import { toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (event) => {
    event.preventDefault();
    const {name,email,password} = data;

    try {
      const responseData = await axios.post('/register',{
        name,
        email,
        password
      })
      if(responseData.error){
        toast.error(responseData.error)
      }
      else{
        setData({})
        toast.success('Register Successful, Welcome');
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={registerUser} className="register-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={e => setData({
            ...data, name: e.target.value
          })}
          placeholder="Enter Name" />

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

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
