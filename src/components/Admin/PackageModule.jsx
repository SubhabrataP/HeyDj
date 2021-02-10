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

export default class PackageModule extends Component{
    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-3"}>Package</h5>
                            <div className={"col-md-9"}>
                                <div className="category-top">
                                <input type="search" className="form-control custome-input" placeholder="Search Nightclubs" />
                                <button type="button" className="categories-btn">Add Package</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="responsive-table" style={{background:'#fff'}}>
                                <table className="table table-borderless">
    <thead>
      <tr>
        <th>Package Name</th>
        <th>Total Hrs</th>
        <th>Category Hrs</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Premium Plan</td>
        <td>100</td>
        <td>25 = Category A, 20 = Category B, 15 = Category C</td>
        <td>1,00,000</td>
        <td><Link to="" className="edit-btn">Edit</Link> <Link>Delete</Link></td>
      </tr>
      <tr>
      <td>Basic Plan</td>
        <td>100</td>
        <td>25 = Category A, 20 = Category B, 15 = Category C</td>
        <td>1,00,000</td>
        <td><Link to="" className="edit-btn">Edit</Link> <Link>Delete</Link></td>
      </tr>
      <tr>
      <td>Gold Plan</td>
        <td>100</td>
        <td>25 = Category A, 20 = Category B, 15 = Category C</td>
        <td>1,00,000</td>
        <td><Link to="" className="edit-btn">Edit</Link> <Link>Delete</Link></td>
      </tr>
    </tbody>
  </table>
                                </div>
                            </div>
                        </div>

                        
                       
                    </div>
                   
                </Layout>
            </React.Fragment>
        )
    }
}

