import React, { Component } from "react";
import Search from "../Common/Search";
import HeaderNavLink from "../Navigation/HeaderNavLinks"
import UserPersona from "../Common/UserPersona"

export default class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container headerSection">
                    <div className="row">
                        <div className="col-md-1 p-0">
                            <img className="w-100" src={process.env.PUBLIC_URL + "/images/logoWhite.png"} alt="logo" />
                        </div>
                        <div className="col-md-3 offset-md-1 pt-3">
                            <Search />
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <HeaderNavLink />
                        </div>
                        <div className="col-md-1">
                            <UserPersona history={this.props.history} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}