import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteUser } from "../Util/ProtectedRoute"
import UserDashboard from "./RegisteredUser/UserDashboard";

const UserRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteUser path="/User" exact component={UserDashboard} />
        </Switch>
    );
};

export default UserRoutes;