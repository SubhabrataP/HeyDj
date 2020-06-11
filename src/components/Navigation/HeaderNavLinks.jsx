import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderNavLink extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Link to={{ pathname: localStorage.getItem("Id") ? "/User" : "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Browse
                    </Link>
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Podcasts
                    </Link>
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        My Music
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