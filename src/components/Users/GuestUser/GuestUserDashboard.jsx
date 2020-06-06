import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import GenreList from "../../DashboardElements/GenreList";
import NewReleaseList from "../../DashboardElements/NewReleaseList";

export default class GuestUserDashboard extends Component {

    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                <FeaturedPlaylist />
                <GenreList />
                <NewReleaseList />
            </div>
        )
    }
}