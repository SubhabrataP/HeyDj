import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteNightclub } from "../Util/ProtectedRoute";
import NightClubDashboard from "../Nightclubs/NightclubDashboard";
// import GuestUserDashboard from "../Users/GuestUser/GuestUserDashboard";

const DjRoutes = () => {
  return (
    <Switch>
      <ProtectedRouteNightclub
        path="/nightclub"
        exact
        render={(props) => <NightClubDashboard history={props.history} />}
      />
    </Switch>
  );
};

export default DjRoutes;
