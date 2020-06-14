import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteDj } from "../Util/ProtectedRoute"
import DJDashboard from "./DJDashboard";

const DjRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteDj path="/Dj" exact component={DJDashboard} />
        </Switch>
    );
};

export default DjRoutes;