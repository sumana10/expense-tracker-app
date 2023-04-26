import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

import { checkValidateUser, setAuthentication } from "../utils/loginLogic";

//import UserContext from "../../utils/UserContext";

const Login = () => {
  const [username, setUserName] = useState("sumana");
  const [password, setPassword] = useState("1234");
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const navigator = useNavigate();

  const login = async () => {
    let userVal;
    userVal = await checkValidateUser(username, password).then(
      (res) => (userVal = res)
    );

    console.log(userVal);

    if (userVal) {
      setAuthUser(userVal);
      setIsLoggedIn(true);
      console.log(authUser);
      setAuthentication();
      navigator("/category");
    } else {
      alert("Authentication Failed");
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
    border: "1px solid rgba(0,0,0,.125)",
    padding: "25px"
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container" style={formStyle}>
        <div className="my-4 text-center">
          <h1 className="text-success">Expense Tracker</h1>
        </div>
        <div className="form-group mb-2">
          <label for="name"></label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label for="date"></label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success text-white btn-block"
          style={{ display: "block", width: "100%" }}
          id="mybtn"
          onClick={() => login()}
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Login;
