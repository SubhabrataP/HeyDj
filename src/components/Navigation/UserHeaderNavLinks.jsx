import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserHeaderNavLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="responsive-navigation">
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
  <li><Link to={{ pathname: "/User" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link></li>
                    {/* <Link to={{ pathname: localStorage.getItem("Id") ? "/userplaylist" : "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        My Playlist
                    </Link>
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Subscriptions
                    </Link> */}
                    <li><Link to={{ pathname: "/User/MySubscriptions" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        My Subscriptions
                    </Link>
                    </li>
                    <li> <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}>
                        Download App
                    </Link></li>
  </ul>
</div>
                <div className="row responsive-nav1">
                <Link to={{ pathname: "/User" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
                    <Link to={{ pathname: "/User/MySubscriptions" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        My Subscriptions
                    </Link>
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}>
                        Download App
                    </Link>
                </div>
            </React.Fragment>

        )
    }
}