import React from "react";
import { Route } from "react-router";
import UnAuthorizedPage from "../ErrorPages/UnauthorizedPage";
import LoginToView from "../ErrorPages/LoginToView";

export const ProtectedRouteAdmin = (props) => {
  if (localStorage.getItem("Token") && localStorage.getItem("Role") === "admin") return <Route {...props} />;
  return <UnAuthorizedPage />;
};


export const ProtectedRouteNightclub = (props) => {
  if (localStorage.getItem("Token") && localStorage.getItem("Role") === "nightclub") return <Route {...props} />;
  return <UnAuthorizedPage />;
};



export const ProtectedRouteDj = (props) => {
  if (localStorage.getItem("Token") && localStorage.getItem("Role") === "dj") return <Route {...props} />;
  return <UnAuthorizedPage />;
};

export const ProtectedRouteUser = (props) => {
  if (localStorage.getItem("Token") && (localStorage.getItem("Role") === "user" || localStorage.getItem("Role") === null)) return <Route {...props} />;
  return <LoginToView />;
};

export default ProtectedRouteUser;
