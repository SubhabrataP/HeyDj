import React, { Component } from "react";
import Layout from "../Home/Layout";
import { FormControl, Image, Modal } from "react-bootstrap";

export default class DjProfile extends Component {

    render() {
        return (
            <>
                <div className="text-center" style={{color:'#fff'}}>
                    <img
                      src={process.env.PUBLIC_URL + "/images/profile.jpg"}
                      alt="logo"
                      style={{borderRadius:'50%', padding:'5% 15%'}}
                    />
                    <h4>Martin Garrix</h4>
                    <span>
                    <i class="fa fa-map-marker"></i>Kolkata, India
                    </span>
                    <h4>
                        <i class="fa fa-facebook-f"></i><i class="fa fa-twitter"></i><i class="fa fa-instagram"></i><i class="fa fa-youtube"></i>
                    </h4>
                    <p>+91 7980499854</p>
                    <p>martingarrix@worlddj.com</p>
                </div>
                <div className="text-left mt-5 mb-3">
                    <h5><b>Executive DJ</b></h5>
                    <p>Roxy, Kolkata.</p>
                    <small>Lorem ipsum dolor sit amet as career highlight text.</small>
                </div>

            </>
        )
    }
}