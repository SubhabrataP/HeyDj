import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRouteAdmin } from "../Util/ProtectedRoute"
import AdminDashboard from "./AdminDashboard";
import DjList from "./DjList";

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteAdmin path="/Admin" exact component={AdminDashboard} />
            <ProtectedRouteAdmin path={"/Admin/Djs"} exact component={DjList} />
        </Switch>
    );
};

export default AdminRoutes;