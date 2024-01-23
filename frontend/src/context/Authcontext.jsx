import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Authcontext = createContext();

export const AuthcontextProvider = ({ children }) => {
  const [currUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currUser));
  },[currUser]);

  return (
    <Authcontext.Provider value={{currUser,login,logout}}>{children}</Authcontext.Provider>
  )
};
