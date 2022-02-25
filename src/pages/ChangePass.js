import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const ChangePass = ({ member }) => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // confirm pass // attach new pass
    navigate("/");
    localStorage.setItem("user", JSON.stringify(member));
  };

  return (
    <form className="text-center col-lg-6 col-md-6 col-sm-12">
      <h1>Change Password</h1>
      <div className="mt-4">
        <input
          autoComplete="none"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setoldPassword(e.target.value)}
          type="text"
        />
      </div>

      <div className="mt-4">
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          type="password"
        />
      </div>

      <div className="mt-4">
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm New Password"
          type="password"
        />
      </div>

      <div className="mt-4">
        <div>
          <input
            type="submit"
            style={
              !oldPassword || !newPassword || !confirm
                ? { background: "#d55" }
                : {}
            }
            disabled={!oldPassword || !newPassword || !confirm}
            onClick={handleSubmit}
            value="Login"
          />
        </div>
      </div>
    </form>
  );
};

export default ChangePass;
