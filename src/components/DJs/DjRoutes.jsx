import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Util/ProtectedRoute"
import DjDashboard from "./DjDashboard";

const DjRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute path="/Dj" exact component={DjDashboard} />
        </Switch>
    );
};

export default DjRoutes;