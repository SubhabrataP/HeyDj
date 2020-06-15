import React from "react";
import { Route } from "react-router";
import UnAuthorizedPage from "../ErrorPages/UnauthorizedPage";
import LoginToView from "../ErrorPages/LoginToView";

export const ProtectedRouteAdmin = (props) => {
  if (localStorage.getItem("Role") === "admin") return <Route {...props} />;
  return <UnAuthorizedPage />;
};

export const ProtectedRouteDj = (props) => {
  if (localStorage.getItem("Role") === "dj") return <Route {...props} />;
  return <UnAuthorizedPage />;
};

export const ProtectedRouteUser = (props) => {
  if ((localStorage.getItem("Id") || localStorage.getItem("Token")) && localStorage.getItem("Role") === null) return <Route {...props} />;
  return <LoginToView />;
};

export default ProtectedRouteUser;
