import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRouteUser from "../Util/ProtectedRoute"
import UserDashboard from "./RegisteredUser/UserDashboard";
import UserPlaylist from "./RegisteredUser/UserPlaylist";

const UserRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteUser path="/User" exact component={UserDashboard} />
            <ProtectedRouteUser path="/userplaylist" exact component={UserPlaylist} />
        </Switch>
    );
};

export default UserRoutes;