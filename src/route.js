import React from 'react';
import GuestUserDashboard from './components/Users/GuestUser/GuestUserDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewReleaseFullPage from "./components/DashboardElements/NewReleaseFullPage";
import FeaturedPlaylistFullPage from "./components/DashboardElements/FeaturedPlaylistFullPage";
import ArtistsFullPage from "./components/DashboardElements/ArtistsFullPage";
import GenreFullPage from "./components/DashboardElements/GenreFullPage";
import PageNotFound from "./components/ErrorPages/PageNotFound";
import UserSection from "./components/LazyLoading/UserSection";
import DjSection from "./components/LazyLoading/DjSection";
import AdminSection from "./components/LazyLoading/AdminSection";
import LoginSuccess from "./components/LoginPages/LoginSuccess";
import ArtistViewProfile from "./components/Users/GuestUser/ArtistViewProfile"
import Subscription from './components/Subscription/Subscription';
import SearchList from './components/DashboardElements/SearchList'
import GenrePlaylists from './components/Users/GuestUser/GenrePlaylists';

const createRoutes = (props) => (
    <Router>
        <Switch>
            <Route exact path="/" render={(props) => <GuestUserDashboard history={props.history} />} />
            <Route exact path="/NewReleases" component={NewReleaseFullPage} />
            <Route exact path="/FeaturedPlaylists" component={FeaturedPlaylistFullPage} />
            <Route exact path="/Artists" component={ArtistsFullPage} />
            <Route exact path="/Genres" component={GenreFullPage} />
            <Route exact path="/login/success" render={(props) => <LoginSuccess history={props.history} />} />

            <Route path="/User" component={UserSection} />
            <Route path="/Dj" component={DjSection} />
            <Route path="/Admin" component={AdminSection} />

            <Route exact path="/Search" render={(props) => <SearchList history={props.history} />} />

            <Route exact path="/Profile/:artistname" render={(props) => <ArtistViewProfile history={props.history} />} />
            <Route exact path="/Genre/:genrename" render={(props) => <GenrePlaylists history={props.history} />} />
            <Route exact path="/Subscription" render={(props) => <Subscription history={props.history} />} />

            <Route path="/**" component={PageNotFound} />
        </Switch>
    </Router>
);

export default createRoutes;