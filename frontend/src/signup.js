import React, { useState } from 'react';
import './signup.css'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationEndpoint = 'http://127.0.0.1:8000/user/create/';

    const registrationData = {
      "name": formData.name,
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
    };

    fetch(registrationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (response.ok) {
          history('/');
        } else {
          console.error('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="body">
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1 >Tale Genius</h1>
          <p className='font-effect-shadow-multiple'>
            Where Imaginations Come To Life!
          </p>
          
        </div>
      </div>

      <div className="right">
        <h5>Sign-up</h5>
        <p>
          Alerady have an Account? <a href="http://localhost:3000/">Login to your Account.</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <br />


          <br />
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
