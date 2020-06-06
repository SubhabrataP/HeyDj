import React, { Component } from "react";
import Header from "./Header";
import GuestUserDashboard from "../Users/GuestUser/GuestUserDashboard"


export default class Layout extends Component {

    render() {
        return (
            <div className= "col-md-12" style={{ marginTop: "3%"}}>
                <Header />
                <GuestUserDashboard ></GuestUserDashboard>
            </div>
        )
    }
}