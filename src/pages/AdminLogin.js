import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Animated } from "react-animated-css";
import Snackbar from "../components/Snackbar";

const AdminLogin = ({}) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  useEffect(() => {
    // try {
    //   let admin = JSON.parse(localStorage.getItem("admin"));
    //   if (admin) {
    //     navigate("/team");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let member = null;

    if (code === "AD1" && password === "123456") {
      member = { code, password };
      localStorage.setItem("admin", JSON.stringify(member));
      navigate("/table");
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          localStorage.removeItem("user");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setToast("Invalid code or password");
      setTimeout(() => {
        setToast('')
      }, 3000);
    }

    setCode("");
    setPassword("");
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container p-3">
        <div className="fill-form form-box">
          <div className="row p-4">
            <div className="justify-center align-middle text-center col-lg-5 col-md-5">
              <Animated animationIn="rotateInDownRight">
                <img
                  style={{ width: "45%", margin: ".2em auto" }}
                  src={logo}
                  alt="CRL"
                />
                <h1>Admin Login</h1>
              </Animated>
            </div>
            <Form
              code={code}
              setCode={setCode}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Snackbar message={toast} />
    </>
  );
};

const Form = ({ code, setCode, password, setPassword, handleSubmit }) => {
  return (
    <form className="text-center col-lg-6 col-md-6 col-sm-12">
      <div className="mt-4">
        <input
          id="name"
          autoComplete="off"
          placeholder="Username"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
        />
      </div>

      <div className="mt-4">
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
      </div>

      <div className="mt-4">
        <div>
          <input
            type="submit"
            style={!code || !password ? { background: "#d55" } : {}}
            disabled={!code || !password}
            onClick={handleSubmit}
            value="Login"
          />
        </div>
      </div>
      <div className="mt-4">
        <Link to={"/login"}>Member Login</Link>
      </div>
    </form>
  );
};

export default AdminLogin;
