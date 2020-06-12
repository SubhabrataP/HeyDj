import React from 'react';
import GuestUserDashboard from './components/Users/GuestUser/GuestUserDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewReleaseFullPage from "./components/DashboardElements/NewReleaseFullPage";
import FeaturedPlaylistFullPage from "./components/DashboardElements/FeaturedPlaylistFullPage";
import GenreListFullPage from "./components/DashboardElements/GenreListFullPage";
import PageNotFound from "./components/ErrorPages/PageNotFound";
import UserSection from "./components/LazyLoading/UserSection";
import DjSection from "./components/LazyLoading/DjSection";
import AdminSection from "./components/LazyLoading/AdminSection";

const createRoutes = (props) => (
    <Router>
        <Switch>
            <Route exact path="/" render={(props) => <GuestUserDashboard history={props.history} />} />
            <Route exact path="/NewReleases" component={NewReleaseFullPage} />
            <Route exact path="/FeaturedPlaylists" component={FeaturedPlaylistFullPage} />
            <Route exact path="/Genres" component={GenreListFullPage} />

            <Route exact path="/User" component={UserSection} />} />
            <Route exact path="/Dj" component={DjSection} />} />
            <Route exact path="/Admin" component={AdminSection} />} />

            <Route path="/**" component={PageNotFound} />
        </Switch>
    </Router>
);

export default createRoutes;