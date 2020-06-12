import React from "react";
import { Route } from "react-router";
import UnAuthorizedPage from "../ErrorPages/UnauthorizedPage";
import LoginToView from "../ErrorPages/LoginToView";

const ProtectedRoute = (props) => {
  if (localStorage.getItem("Id")) return <Route {...props} />;
  return <UnAuthorizedPage />;
};

export const ProtectedRouteUser = (props) => {
  if (localStorage.getItem("Id")) return <Route {...props} />;
  return <LoginToView />;
};

export default ProtectedRoute;
