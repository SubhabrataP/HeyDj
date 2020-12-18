import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteNightclub } from "../Util/ProtectedRoute";
import NightClubDashboard from "../Nightclubs/NightclubDashboard";
import UserSubscriptions from "../Users/RegisteredUser/UserSubscriptions";
// import GuestUserDashboard from "../Users/GuestUser/GuestUserDashboard";

const DjRoutes = () => {
  return (
    <Switch>
      <ProtectedRouteNightclub
        path="/nightclub"
        exact
        render={(props) => <NightClubDashboard history={props.history} />}
      />
      <ProtectedRouteNightclub
        path="/nightclub/MySubscriptions"
        exact
        component={UserSubscriptions}
      />
    </Switch>
  );
};

export default DjRoutes;
