import React, { Component } from "react";
import Search from "../Common/Search";
import HeaderNavLink from "../Navigation/HeaderNavLinks"
import UserPersona from "../Common/UserPersona"

export default class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <img src={'./images/logo.png'} alt="logo" />
                        </div>
                        <div className="col-md-3">
                            <Search />
                        </div>
                        <div className="col-md-5">
                            <HeaderNavLink />
                        </div>
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-1">
                            <UserPersona />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}