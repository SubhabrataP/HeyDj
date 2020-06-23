import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteDj } from "../Util/ProtectedRoute"
import DJDashboard from "./DJDashboard";
import MyPlayList from "./MyPlayList";
import MyContent from "./MyContent";

const DjRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteDj path="/Dj" exact component={DJDashboard} />
            <ProtectedRouteDj path="/Dj/Playlists" exact component={MyPlayList} />
            <ProtectedRouteDj path="/Dj/Contents" exact component={MyContent} />
        </Switch>
    );
};

export default DjRoutes;