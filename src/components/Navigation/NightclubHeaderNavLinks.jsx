import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserHeaderNavLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                <Link to={{ pathname: "/nightclub" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
                    <Link to={{ pathname: "/nightclub/MySubscriptions" }}
                        href="#"
                        style={{
                            paddingRight: "7px",
                            textDecoration: 'none'
                        }}>
                        My Subscriptions
                    </Link>
                    <Link to={{ pathname: "/nightclub/my-wallet" }}
                        style={{
                            textDecoration: 'none'
                        }}>
                        My wallet
                    </Link>
                </div>
            </React.Fragment>

        )
    }
}