import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRouteNightclub } from "../Util/ProtectedRoute";
import NightClubDashboard from "../Nightclubs/NightclubDashboard";
import UserSubscriptions from "../Users/RegisteredUser/UserSubscriptions";
import NightclubWallet from '../Nightclubs/NightclubWallet'
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
       <ProtectedRouteNightclub
        path="/nightclub/my-wallet"
        exact
        component={NightclubWallet}
      />
    </Switch>
  );
};

export default DjRoutes;
