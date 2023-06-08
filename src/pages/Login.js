import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { validation } from "../utils/validation";
import { checkValidateUser, setAuthentication } from "../utils/loginLogic";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  }); // Separate error object

  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { username, password } = values;

  const handleChange = (data) => (event) => {
    setValues({ ...values, [data]: event.target.value });
    const value = event.target.value;

    // Copy error object
    let errorsCopy = { ...errors };

    // Called validation
    const errorR = validation(data, value, errorsCopy);

    // Update the state
    setErrors(errorR);
  };

  const login = async () => {
    if (!username || !password) {
      alert("Please fill all the fields");
      return;
    }
    // check if there are any errors in errors object return boolean
    const hasErrors = Object.values(errors).some((val) => val);

    // if there are errors, don't submit the form
    if (hasErrors) return;

    setErrors({
      ...errors,
      username: "",
      password: "",
    });


  let userVal = await checkValidateUser(username, password).then((res) => res);

    console.log(userVal);

    if(userVal){
      setAuthUser(userVal);
      setIsLoggedIn(true);
      setAuthentication();
      navigate("/category");
    } else {
      alert("Authentication Failed");
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
    border: "1px solid rgba(0,0,0,.125)",
    padding: "25px",
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
            onChange={handleChange("username")}
          />
          <small>{errors.username}</small>
        </div>
        <div className="form-group mb-4">
          <label for="date"></label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange("password")}
          />
          <small>{errors.password}</small>
        </div>

        <button
          className="btn btn-success text-white btn-block"
          style={{ display: "block", width: "100%" }}
          id="mybtn"
          onClick={login}
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Login;
