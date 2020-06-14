import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import GenreList from "../../DashboardElements/GenreList";
import NewReleaseList from "../../DashboardElements/NewReleaseList";
import Layout from "../../Home/Layout";

export default class GuestUserDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history} >
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-md-7 offset-md-1">
                        <FeaturedPlaylist history={this.props.history} />
                        <GenreList history={this.props.history} />
                    </div>
                    <div className="col-md-3">
                        <NewReleaseList history={this.props.history} />
                    </div>

                    
                    
                </div>
            </Layout>
        )
    }
}