import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRouteUser from "../Util/ProtectedRoute"
import GuestUserDashboard from "./GuestUser/GuestUserDashboard";
import UserPlaylist from "./RegisteredUser/UserPlaylist";
import UserSubscriptions from "./RegisteredUser/UserSubscriptions";

const UserRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteUser exact path="/User" render={(props) => <GuestUserDashboard history={props.history} />} />
            <ProtectedRouteUser path="/User/userplaylist" exact component={UserPlaylist} />
            <ProtectedRouteUser path="/User/MySubscriptions" exact component={UserSubscriptions} />
        </Switch>
    );
};

export default UserRoutes;