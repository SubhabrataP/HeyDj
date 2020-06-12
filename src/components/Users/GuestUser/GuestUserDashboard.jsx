import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import GenreList from "../../DashboardElements/GenreList";
import NewReleaseList from "../../DashboardElements/NewReleaseList";
import Layout from "../../Home/Layout";

export default class GuestUserDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history} >
                <div style={{ marginTop: "2%" }}>
                    <FeaturedPlaylist history={this.props.history} />
                    <GenreList history={this.props.history} />
                    <NewReleaseList history={this.props.history} />
                </div>
            </Layout>
        )
    }
}