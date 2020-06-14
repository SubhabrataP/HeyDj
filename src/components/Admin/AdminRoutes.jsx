import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteAdmin } from "../Util/ProtectedRoute"
import AdminDashboard from "./AdminDashboard";

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteAdmin path="/Admin" exact component={AdminDashboard} />
        </Switch>
    );
};

export default AdminRoutes;