import React, {useState, useEffect} from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  // console.log(props);

  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  });


    const handleChange = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }


    const handleSubmit = e => {
      e.preventDefault();

      axiosWithAuth().post("/api/login",credentials)
      .then(response => {
        // console.log(response);
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles-page');
      })
      .then(() => console.log(localStorage.token))
      .catch(err => console.log(err))
    }



  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input 
        type='text'
        name='password'
        placeholder='Password'
        value={credentials.password}
        onChange={handleChange}
        />
      <button>Login</button>
      </form>
    </>
  );
};

export default Login;
