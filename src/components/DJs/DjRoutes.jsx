import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Util/ProtectedRoute"
import DJDashboard from "./DJDashboard";

const DjRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute path="/Dj" exact component={DJDashboard} />
        </Switch>
    );
};

export default DjRoutes;