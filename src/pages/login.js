import React, { useState, useEffect } from "react";
import { db } from "../App";
import "../index.css";
import { ref, onValue } from "firebase/database";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import ChangePass from "./ChangePass";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState([]);
  const [showConfirm, setShowConfirm] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let member = null;

    if (team.find((m) => m.code === code && m.password === password)) {
      member = team.find((m) => {
        if (m.code === code) {
          return m;
        }
      });

      if (member.password === "123456") {
        setUser(member);
        setShowConfirm(true);
      } else {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(member));
      }
      // guard
    } else {
      alert("error");
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
              <img
                style={{ width: "45%", margin: ".2em auto" }}
                src={logo}
                alt="LRC"
              />
            </div>
            {!showConfirm ? (
              <Form
                code={code}
                setCode={setCode}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            ) : (
              <ChangePass member={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Form = ({ code, setCode, password, setPassword, handleSubmit }) => {
  return (
    <form className="text-center col-lg-6 col-md-6 col-sm-12">
      <h1>Login as team member</h1>
      <div className="mt-4">
        <input
          id="name"
          autoComplete="none"
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
        <div className="mt-4">
          <Link to={"/"}>Admin Login</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
