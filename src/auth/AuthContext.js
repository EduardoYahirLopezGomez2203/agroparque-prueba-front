import React, { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../services/ApiService';

const AuthContext = createContext();

function AuthProvider(props) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(sessionStorage.getItem("jwt")));
  const [jwt, setJwt] = useState(sessionStorage.getItem("jwt") || null);
  const [profile, setProfile] = useState(sessionStorage.getItem("profile") || null);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || null);
  
  const login = useCallback((jwtToken, userName, profile) => {    
    setIsLoggedIn(true);
    setJwt(jwtToken);
    setUserName(userName)
    setProfile(profile);
    sessionStorage.setItem("jwt", jwtToken);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("profile", profile);
    ApiService.setToken(jwtToken);
  },[]);

  const logout = () => {
    console.log("Cerrado controlado");
    setIsLoggedIn(false);
    setJwt(null);
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("name"); // estos se agregan en el drawer
    sessionStorage.removeItem("email") // estos se agregan en el drawer
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("profile");
    ApiService.setToken("");
    navigate('/');
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    jwt,
    profile,
    userName
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };