import React, { Component } from "react";
import Search from "../Common/Search";
import HeaderNavLink from "../Navigation/HeaderNavLinks";
import UserPersona from "../Common/UserPersona";
import AdminHeaderNavLinks from "../Navigation/AdminHeaderNavLinks";
import DjHeaderNavLinks from "../Navigation/DjHeaderNavLinks";
import UserHeaderNavLinks from "../Navigation/UserHeaderNavLinks";
import NightclubHeaderNavLinks from "../Navigation/NightclubHeaderNavLinks";

export default class Header extends Component {
  onImageClick = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container headerSection">
          <div className="row align-items-end">
            <div className="col-md-1 p-0 logo">
              <img
                src={process.env.PUBLIC_URL + "/images/logoWhite.png"}
                alt="logo"
                onClick={this.onImageClick}
              />
            </div>
            <div className="col-md-3 offset-md-1 pt-3">
              <Search history={this.props.history} />
            </div>
            {localStorage.getItem("Role") === "admin" ? (
              <div className="col-md-6">
                <AdminHeaderNavLinks />
              </div>
            ) : localStorage.getItem("Role") === "dj" ? (
              <div className="col-md-6">
                <DjHeaderNavLinks />
              </div>
            ) : localStorage.getItem("Role") === "user" ? (
              <div className="col-md-6 responsive-nav">
                <UserHeaderNavLinks />
              </div>
            ) : localStorage.getItem("Role") === "nightclub" ? (
              <div className="col-md-6 responsive-nav">
                <NightclubHeaderNavLinks />
              </div>
            ) : (
              <div className="col-md-5 offset-md-1 responsive-nav">
                <HeaderNavLink />
              </div>
            )}
            <div className="col-md-1 responsive-pofile">
              <UserPersona history={this.props.history} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
