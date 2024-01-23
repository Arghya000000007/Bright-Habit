import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Authcontext } from '../context/Authcontext';

function Login() {
  const [user,setUser] = useState({
    name: "",
    password: ""
  });

  const [err,setError] = useState(null);
  const {login} = useContext(Authcontext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({...prev,[e.target.name] : e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div className='Login'>
      <h1>Login</h1>
      <form>
        <input type="text" name="name" id="name" placeholder='Enter your name: ' onChange={handleChange}/>
        <input type="password" name="password" id="pass" placeholder='.......' onChange={handleChange} />
        <button onClick={handleSubmit}>Log in</button>
        {err && <p>{err}</p>}
        <span>Don't have an account. Create One! visit <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
