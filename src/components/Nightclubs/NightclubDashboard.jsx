import React, { Component } from "react";
import FeaturedPlaylist from "../DashboardElements/FeaturedPlaylist";
import NewReleaseList from "../DashboardElements/NewReleaseList";
import Layout from "../Home/Layout";
import Artists from "../DashboardElements/Artists";
import Genre from "../DashboardElements/Genre"

export default class GuestUserDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history} id="guest-user-dashboard" >
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-md-7 offset-md-1">
                        <NewReleaseList history={this.props.history} />
                        <Artists history={this.props.history} />
                        <Genre history={this.props.history} />
                    </div>
                    <div className="col-md-3">
                        <FeaturedPlaylist history={this.props.history} />
                    </div>
                </div>
            </Layout>
        )
    }
}