import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import GenreList from "../../DashboardElements/Artists";
import NewReleaseList from "../../DashboardElements/NewReleaseList";
import Layout from "../../Home/Layout";
import Artists from "../../DashboardElements/Artists";
import Genre from "../../DashboardElements/Genre"

export default class GuestUserDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history} id="guest-user-dashboard" >
                <div className="row">
                    <div className="col-md-12 getStarted" style={{ padding: "3% 0" }}>
                        <h3>Register Your Nightclub Today !</h3>
                        <p style={{color: "#777676", padding: "4px 20px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button style={{padding: "5px 15px", backgroundColor: "#fff", color: "#202020", borderRadius: "40px"}}>Get Started</button>
                    </div>
                </div>    
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