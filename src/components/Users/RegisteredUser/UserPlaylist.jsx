import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import Layout from "../../Home/Layout";

export default class UserPlaylist extends Component {

    render() {
        return (
            <Layout history={this.props.history} >
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-md-10 offset-md-1">
                        <h4>Play</h4>
                        <FeaturedPlaylist history={this.props.history} />
                    </div>
                </div>
            </Layout>
        )
    }
}