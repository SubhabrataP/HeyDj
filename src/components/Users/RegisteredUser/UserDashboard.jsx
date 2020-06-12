import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import Layout from "../../Home/Layout";

export default class UserDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history} >
                <div style={{ marginTop: "2%" }}>
                    <h1>Welcome User</h1>
                    <FeaturedPlaylist history={this.props.history} />
                </div>
            </Layout>
        )
    }
}