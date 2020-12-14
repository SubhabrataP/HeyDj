import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRouteAdmin } from "../Util/ProtectedRoute"
import AdminDashboard from "./AdminDashboard";
import DjList from "./DjList";
import GenreList from "./GenreList";
import FeaturedList from "./FeaturedList";
import NightclubsList from "./NightclubsList";

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteAdmin path="/Admin" exact component={AdminDashboard} />
            <ProtectedRouteAdmin path={"/Admin/Djs"} exact component={DjList} />
            <ProtectedRouteAdmin path="/Admin/Nightclubs" exact component={NightclubsList} />
            <ProtectedRouteAdmin path={"/Admin/Genres"} exact component={GenreList} />
            <ProtectedRouteAdmin path={"/Admin/Featured"} exact component={FeaturedList} />
        </Switch>
    );
};

export default AdminRoutes;