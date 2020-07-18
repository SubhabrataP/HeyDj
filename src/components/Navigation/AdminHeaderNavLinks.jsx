import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminHeaderNavLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
                    <Link to={{ pathname: "/Admin" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Dashboard
                    </Link>
                    <Link to={{ pathname: "/Admin/Djs" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Djs
                    </Link>
                    <Link to={{ pathname: "/Admin/Genres" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Genres
                    </Link>
                    <Link to={{ pathname: "/Admin/Featured" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Featured
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