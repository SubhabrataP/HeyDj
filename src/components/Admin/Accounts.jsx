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
                               <Link to="" className="account-btn">Accounts</Link>
                                <input type="search" className="form-control custome-input" placeholder="Search Nightclubs" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="responsive-table" style={{background:'#fff'}}>
                                <table className="table table-borderless">
    <thead>
      <tr>
        <th><b>Djs</b></th>
        <th><b>Total Hrs Subscribed</b></th>
        <th><b>Total Revenue Earned</b></th>
        <th><b>Total Revenue Paid (Till Date)</b></th>
        <th><b>Last Paid</b></th>
        <th><b>Outstanding Amt </b></th>
        <th><b>Action</b></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>145</td>
        <td>1,45,000</td>
        <td>1,00,000</td>
        <td>24-01-2021</td>
        <td>45,000</td>
        <td><Link to="">UPDATE</Link></td>
      </tr>
      <tr>
      <td>John Doe</td>
        <td>145</td>
        <td>1,45,000</td>
        <td>1,00,000</td>
        <td>24-01-2021</td>
        <td>45,000</td>
        <td><Link to="">UPDATE</Link></td>
      </tr>
      <tr>
      <td>John Doe</td>
        <td>145</td>
        <td>1,45,000</td>
        <td>1,00,000</td>
        <td>24-01-2021</td>
        <td>45,000</td>
        <td><Link to="">UPDATE</Link></td>
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

