import {React,useState} from 'react';
import axios from 'axios';
import "./register.scss";
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [error,setError] = useState(null);
  const [user,setUser] = useState(null);

  const handleChange = (e) => {
    setUser((prev) => ({...prev,[e.target.name] : e.target.value }));
  } 

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!user) {
      setError("Please enter all the fields");
      return;
    }
    try {
      await axios.post('/auth/register', user);
      navigate("/login");
    } catch (error) {
      setError(error);
    }
  }
  
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Connect.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut beatae architecto saepe ullam vero maiores esse molestiae velit? Voluptate beatae quidem odit sed doloremque culpa, quo dignissimos illo quos laboriosam.</p>
          <span>Do you have an account?</span>
          <button><Link to={"/login"}>Login</Link></button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" name="name" id="name" placeholder='Enter your name' onChange={handleChange}/>

            <input type="email" name="email" id="email" placeholder='Enter your email' onChange={handleChange}/>

            <input type="password" name="password" id="password" placeholder='.......' onChange={handleChange}/>

            <button type='submit' onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
