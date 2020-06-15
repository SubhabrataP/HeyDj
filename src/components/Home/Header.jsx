import React, { Component } from "react";
import Search from "../Common/Search";
import HeaderNavLink from "../Navigation/HeaderNavLinks"
import UserPersona from "../Common/UserPersona"
import AdminHeaderNavLinks from "../Navigation/AdminHeaderNavLinks";
import DjHeaderNavLinks from "../Navigation/DjHeaderNavLinks";

export default class Header extends Component {

    onImageClick = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <div className="container headerSection">
                    <div className="row">
                        <div className="col-md-1 p-0">
                            <img className="w-100"
                                src={process.env.PUBLIC_URL + "/images/logoWhite.png"}
                                alt="logo"
                                onClick={this.onImageClick}
                            />
                        </div>
                        <div className="col-md-3 offset-md-1 pt-3">
                            <Search />
                        </div>
                        {localStorage.getItem('Role') === "admin" ?
                            <div className="col-md-5 offset-md-1">
                                <AdminHeaderNavLinks />
                            </div> :
                            localStorage.getItem('Role') === "dj" ?
                                <div className="col-md-5 offset-md-1">
                                    <DjHeaderNavLinks />
                                </div> :
                                <div className="col-md-5 offset-md-1">
                                    <HeaderNavLink />
                                </div>
                        }
                        <div className="col-md-1">
                            <UserPersona history={this.props.history} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}