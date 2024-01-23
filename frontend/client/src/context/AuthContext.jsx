import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const Authcontext = createContext();

const AuthContext = (props) => {
  const [data,setData] = useState(null);
  const [user,setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({...prev,[e.target.name] : e.target.value }));
  };
  
  const send = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", data);
      setUserData(res.data.user);
      return;
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    try {
      axios.post("/api/v1/auth/logout");
      setUserData(null);
      return;
    } catch (error) {
      setError(error.message);
      return;
    }
  }
  return (
    <Authcontext.Provider value={{user,send,error,logout,handleChange}}>{props.children}</Authcontext.Provider>
  );
};

export default AuthContext;
