import React, { useState } from "react";
import Navbar from "../components/Navbar";
import '../index.css';


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, password);
    setName('')
    setPassword('')
  }
  
  return (
    <>
      <Navbar />
      <div className="container">
      <div className="fill-form form-box">
      <h1>Title</h1>
        <form className="col-lg-6 col-md-6 col-sm-12">
            <div className="mt-4">
              <input
                id="name"
                autoComplete="false"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text' />
            </div>
            <div className="mt-4">
              <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type='password' />
            </div>

            <div className="mt-4">
              <input 
                type='submit'
                onClick={handleSubmit}
                value='Login' />
            </div>
        </form>

      </div>
    </div>
    </>
  );
}

export default Login;
