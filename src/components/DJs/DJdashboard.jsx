import React, { Component } from "react";
import Layout from "../Home/Layout";

export default class DjDashboard extends Component{

    render(){
        return(
            <Layout history={this.props.history}>
                <div style={{ marginTop: "2%" }}>
                    <h1>Welcome Dj</h1>
                </div>
            </Layout>
        )
    }
}