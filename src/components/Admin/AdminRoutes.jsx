import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRouteAdmin } from "../Util/ProtectedRoute"
import AdminDashboard from "./AdminDashboard";
import DjList from "./DjList";
import GenreList from "./GenreList";
import FeaturedList from "./FeaturedList";
import NightclubsList from "./NightclubsList";
import Accounts from "./Accounts";
import NightclubsAdminlist from "./NightclubsAdminlist";
import NightclubRegistration from "./NightclubRegistration";

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRouteAdmin path="/Admin" exact component={AdminDashboard} />
            <ProtectedRouteAdmin path={"/Admin/Djs"} exact component={DjList} />
            <ProtectedRouteAdmin path="/Admin/Nightclubs" exact component={NightclubsList} />
            <ProtectedRouteAdmin path={"/Admin/Genres"} exact component={GenreList} />
            <ProtectedRouteAdmin path={"/Admin/Featured"} exact component={FeaturedList} />
            <ProtectedRouteAdmin path={"/Admin/Accounts"} exact component={Accounts} />
            <ProtectedRouteAdmin path={"/Admin/Night-club-admin-list"} exact component={NightclubsAdminlist} />
            <ProtectedRouteAdmin path={"/Admin/Night-club-registration"} exact component={NightclubRegistration} />
        </Switch>
    );
};

export default AdminRoutes;