import React, { useState, useEffect } from "react";
import { db } from "../App";
import "../index.css";
import { ref, onValue } from "firebase/database";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Animated} from "react-animated-css";
import Snackbar from "../components/Snackbar";

const Login = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  useEffect(() => {
    // try {
    //   let user = JSON.parse(localStorage.getItem('user'))
    //   if (user) {
    //     navigate('/home')
    //   }
    // } catch(e) {
    //     console.log(e);
    // }
    // return () => {
    // };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let member = null;

    if (team.find((m) => m.code === code && m.password === password)) {
      member = team.find((m) => {
        if (m.code === code) {
          return m;
        }
      });

      navigate('/home')
      localStorage.setItem('user', JSON.stringify(member))
      // remove admin on logout

    } else {
      setToast('Invalid code or password')
      setTimeout(() => {
        setToast('')
      }, 3000);
    }

    setCode("");
    setPassword("");
  };

  const readTeam = async () => {
    let list = [];
    onValue(ref(db, "users"), (snapshot) => {
      list = Object.keys(snapshot.val()).map((key) => {
        return snapshot.val()[key];
      });
      setTeam(list);
    });
  };

  useEffect(() => {
    readTeam();
    return () => {};
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="container p-3">
        <div className="fill-form form-box">
          <div className="row p-4">
            <div className="justify-center align-middle text-center col-lg-5 col-md-5">
            <Animated
                animationIn="rotateInDownLeft"
              >
              <img
                style={{ width: "45%", margin: ".2em auto" }}
                src={logo}
                alt="CRL"
              />
              <h1>Login as team member</h1>
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
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
        />
      </div>

      <div className="mt-4">
        <input
          id="password"
          value={password}
          autoComplete="off"
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
        <div className="mt-4">
          <Link to={"/admin-login"}>Admin Login</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
