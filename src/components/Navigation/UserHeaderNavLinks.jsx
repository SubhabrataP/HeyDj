import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserHeaderNavLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
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