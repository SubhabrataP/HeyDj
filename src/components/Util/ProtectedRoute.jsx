import React from "react";
import { Route } from "react-router";
import UnAuthorizedPage from "../ErrorPages/UnauthorizedPage";

const ProtectedRoute = (props) => {
  if (localStorage.getItem("Id")) return <Route {...props} />;
  return <UnAuthorizedPage />;
};

export default ProtectedRoute;
