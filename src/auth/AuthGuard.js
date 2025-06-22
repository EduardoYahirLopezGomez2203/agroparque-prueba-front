import React, { useContext } from "react";
import { Navigate /*, Route*/ } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import ApiService from "../services/ApiService";

export function AuthGuard({ children }) {
  const { isLoggedIn, isLoading, jwt } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  ApiService.setToken(jwt);

  /*Usuario no logeado*/
  if (!isLoggedIn) {
    return <Navigate to="/notauthorized" replace />;
  }

  return children;
}

export default AuthGuard;
