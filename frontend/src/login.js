import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    if (username && password) {
        console.log(username, password)
        const requestOptions = {
            "credential": username,
            "password": password,
        };

      fetch('http://127.0.0.1:8000/user/authenticate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestOptions),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data === true) {
          history('/home');
        } else {
          throw new Error('Data is not true');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
    }
  };


  return (
   <div className='body'>
    <div className="box-form" >
	<div className="left">
	  <div className="overlay">
		<h1>Tale Genius</h1>
		<p >
		  Where Imaginations Come To Life!
		</p>
	  </div>
	</div>

	<div className="right">
	  <h5>Login</h5>
	  <p>
		Don't have an Account?<a href="http://localhost:3000/signup">Create a new Account</a>
	  </p>
	  <form>
		<div className="inputs">
		  <br />
		  <input
                type="text"
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
		  <br />
		  <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
		</div>
		<br />
		<br />


		<br />
		<button type="button" onClick={handleLogin}>
			Login
		  </button>
	  </form>
	</div>
  </div>
  </div> 
  );
}

export default LoginPage;