import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Util/ProtectedRoute"
import AdminDashboard from "./AdminDashboard";

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute path="/Admin" exact component={AdminDashboard} />
        </Switch>
    );
};

export default AdminRoutes;