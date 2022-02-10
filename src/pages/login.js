import React from "react";
import '../index.css';


function Login() {
  return (
    <div className="container justify-center text-center m-4 py-4">
      <div className="fill-form form-box">
      <h1>Login</h1>
        <form className="col-md-12">
            <div className="mt-4">
              <input
                id="name"
                autoComplete="false"
                placeholder="Username"
                type='text' />
            </div>
            <div className="mt-4">
              <input
                id="password"
                placeholder="Password"
                type='password' />
            </div>

            <div className="mt-4">
              <input 
                type='submit'
                value='Login' />
            </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
