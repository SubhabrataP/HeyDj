import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Util/ProtectedRoute"
import UserDashboard from "./RegisteredUser/UserDashboard";

const UserRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute path="/User" exact component={UserDashboard} />
        </Switch>
    );
};

export default UserRoutes;