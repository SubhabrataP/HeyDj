import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderNavLink extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="responsive-menu">
                    <nav role="navigation">
  <div id="menuToggle">
    
    <input type="checkbox" />
    
    <span></span>
    <span></span>
    <span></span>
    
    <ul id="menu">
    <Link to={{ pathname: localStorage.getItem("Id") ? "/User" : "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}><li>
                        Home</li>
                    </Link>
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
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}><li>
                        Download App</li>
                    </Link>
                    <Link to={{ pathname: "/register" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}><li>
                        Nightclub Registration</li>
                    </Link>
      
    </ul>
  </div>
</nav>
                    </div>
                <div className="row">
                    
                    <Link to={{ pathname: localStorage.getItem("Id") ? "/User" : "/" }}
                        href="#"
                        style={{
                            paddingRight: "13px",
                            textDecoration: 'none'
                        }}>
                        Home
                    </Link>
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
                    <Link to={{ pathname: "/" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}>
                        Download App
                    </Link>
                    <Link to={{ pathname: "/register" }}
                        href="#"
                        style={{
                            textDecoration: 'none'
                        }}>
                        Nightclub Registration
                    </Link>
                </div>
            </React.Fragment>

        )
    }
}