import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [err,setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  
  return (
    <div className="Login">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          required
          onChange={handleChange}
        />
        {err && <p>{err}</p>}
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
