import React, { Component } from "react";
import Layout from "../Home/Layout";

export default class AdminDashboard extends Component{

    render(){
        return(
            <Layout>
                <div style={{ marginTop: "2%" }}>
                    <h1>Welcome Admin</h1>
                </div>
            </Layout>
        )
    }
}