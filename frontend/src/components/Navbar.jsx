import React, { useContext } from 'react'
import logo from "../img/logo.png"
import { Link } from "react-router-dom";
import { Authcontext } from '../context/Authcontext';

function Navbar() {
  const {currUser,logout} = useContext(Authcontext);
  return (
    <div className='Navbar'>
      <div className="container">
        <div className='logo'>
          <Link to={"/"}>
          <img src={logo} alt="Tree logo" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to ="/?cat=art"><h6>Art</h6></Link>
          <Link className='link' to="/?cat=science"><h6>Science</h6></Link>
          <Link className='link' to="/?cat=tech"><h6>Technology</h6></Link>
          <Link className='link' to="/?cat=cinema"><h6>Cinema</h6></Link>
          <Link className='link' to="/?cat=food"><h6>Food</h6></Link>
          <Link className='link' to="/?cat=design"><h6>Design</h6></Link>
          <span>{currUser?.name}</span>
          {currUser ? (<button onClick={logout}>Logout</button>) : (<Link className='link' to={'/login'}>Login</Link>)}
          <span className='write'>
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
