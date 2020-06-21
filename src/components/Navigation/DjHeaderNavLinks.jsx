import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DjHeaderNavLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
                    <Link to={{ pathname: "/Dj" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        Dashboard
                    </Link>
                    <Link to={{ pathname: "/Dj/Playlists" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        My Playlists
                    </Link>
                    <Link to={{ pathname: "/Dj/Contents" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        My Contents
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