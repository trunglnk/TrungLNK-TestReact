import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "./useContext/authContext";

function PrivateRoute({ element, isLoggedIn }) {
  const { isAuthenticated, isChecking } = useContext(authContext);
  // console.log(isAuthenticated, isChecking);

  if (isChecking) {
    return <div />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
