import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Authcontext } from "../../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user,logout } = useContext(Authcontext);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed left-0 top-0 w-full ease-in duration-200  bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 ">
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-1  text-black  ">
        <Link to={"/"} className="font-bold text-2xl hidden sm:block">
          <h1>Bright Habit</h1>
        </Link>
        <div className="sm:hidden pl-1">
          {" "}
          <input
            type="text"
            className="px-2 py-1 pb-2 rounded-sm border border-current font-semibold"
            placeholder="Search"
          />
        </div>
        <div>
          <ul className="hidden sm:flex p-3">
            {" "}
            <li className="pt-2 px-6 border-spacing-1">
              <input
                type="text"
                className="px-2 w-64 py-1 rounded-sm border border-current font-semibold"
                placeholder="Search"
              />
            </li>
            <li className="pt-2 px-6 ">
              <Link to={"/createPost"}>
                <h1>Post</h1>
              </Link>
            </li>
            { user ? <li className="pt-2 px-6">
              <button onClick={logout}>Logout</button>
            </li> : <li className="pt-2 px-6">
              <Link to={"/login"}>
                <h1>Login</h1>
              </Link>
            </li>}
            <li className="pl-2">
              <img className="w-9 h-9 mr-4 " src="assets/user.png" alt="" />
            </li>
          </ul>
        </div>
        {/*Mobile Button*/}
        <div
          onClick={handleNav}
          className="block sm:hidden z-10 cursor-pointer pr-2"
        >
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
        {/*Mobile Menu*/}
        <div
          className={
            nav
              ? "sm:hidden absolute bg-slate-100 top-0 right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen text-center ease-in duration-200 "
              : "sm:hidden absolute bg-slate-100 top-0 right-0 bottom-0 left-[-100%]  flex justify-center items-center w-full h-screen text-center ease-in duration-200"
          }
        >
          <ul>
            {" "}
            <li>
              <Link href="/">
                <h1 className="p-4  text-4xl hover:text-gray-600 ">Home</h1>
              </Link>
            </li>
            <li>
              <Link href="/">
                <h1 className="p-4  text-4xl hover:text-gray-600">Posts</h1>
              </Link>
            </li>
            <li>
              <Link href="/">
                <h1 className="p-4  text-4xl hover:text-gray-600">About</h1>
              </Link>
            </li>
            <li>
              <Link href="/">
                <h1 className="p-4  text-4xl hover:text-gray-600">
                  Contact US
                </h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
