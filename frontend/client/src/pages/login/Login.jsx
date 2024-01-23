import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.scss";
import "./login.css";
import { Authcontext } from "../../context/AuthContext";

const Login = () => {
  const { send,handleChange,user } = useContext(Authcontext);
  const navigate = useNavigate();
  if(user) {
    navigate("/");
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Welcome to our blog website.
          </p>
          <span>Don't have an account?</span>
          <button>
            <Link to={"/register"}>Register</Link>
          </button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              name="email"
              id="name"
              placeholder="Enter Username"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="......."
              onChange={handleChange}
            />

            <button type="submit" onClick={send}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
