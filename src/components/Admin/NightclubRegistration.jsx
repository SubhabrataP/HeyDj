import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from 'office-ui-fabric-react';
import Search from '../Common/Search';
import AddEditProfile from '../Common/AddEditProfile';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants"
import { SelectDjModal } from "./SelectDjModal";
import { Link } from "react-router-dom";

export default class Accounts extends Component{
    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                        
                            <div className={"col-md-7 top-col"}>
                            <h5>Nightclub Registration</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Nightclub*</label>
                                <input type="text" className="form-control" placeholder="Enter Nightclub Name" />
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                    <label>Email*</label>
                                <input type="text" className="form-control" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                    <label>Contact*</label>
                                <input type="tel" className="form-control" placeholder="Enter Contact Number" />
                                </div>
                            </div>
                            <div className="col-md-12">
                            <div className="form-group">
                                    <label>Address*</label>
                                    <textarea className="form-control" cols="3" rows="3" placeholder="Enter Address"></textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                    <label>City*</label>
                                <input type="text" className="form-control" placeholder="Enter City" />
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                    <label>License No*</label>
                                <input type="tel" className="form-control" placeholder="Enter License Number" />
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                    <label>License*</label>
                                <input type="file" className="form-control" />
                                </div>
                            </div>
                           
                            
                            <div className="col-md-12">
                            <div className="form-group">
                                <button type="button" className="submit-btn">Submit</button>
                            </div>
                            </div>
                        </div>

                        
                       
                    </div>
                   
                </Layout>
            </React.Fragment>
        )
    }
}

