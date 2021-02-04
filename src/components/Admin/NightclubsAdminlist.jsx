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
                            <h5>Nightclubs List</h5>
                                <input type="search" className="form-control custome-input" placeholder="Search Nightclubs" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="responsive-table" style={{background:'#fff'}}>
                                <table className="table table-borderless">
    <thead>
      <tr>
        <th>Nightclubs</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>City</th>
        <th>Plan</th>
        <th>Valid till</th>
        <th>Total Hrs</th>
        <th>Hrs Used</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nightclubs Monaco</td>
        <td>9775613702</td>
        <td>monaco@gmail.com</td>
        <td>Delhi</td>
        <td>Premium</td>
        <td style={{color:'#2626c1'}}>25-02-21</td>
        <td style={{color:'#2626c1'}}>100</td>
        <td style={{color:'#2626c1'}}>60</td>
        <td><Link to=""><i style={{color:'#4ca747'}} class="fa fa-check-circle"></i></Link>  <Link to=""><i style={{color:'#2626c1'}} class="fa fa-pencil-square-o"></i></Link>   <Link to=""><i style={{color:'#eb1611'}} class="fa fa-trash-o"></i></Link></td>
      </tr>
      <tr>
      <td>Nightclubs Monaco</td>
        <td>9775613702</td>
        <td>monaco@gmail.com</td>
        <td>Delhi</td>
        <td>Premium</td>
        <td style={{color:'#2626c1'}}>25-02-21</td>
        <td style={{color:'#2626c1'}}>100</td>
        <td style={{color:'#2626c1'}}>60</td>
        <td><Link to=""><i style={{color:'#4ca747'}} class="fa fa-check-circle"></i></Link>  <Link to=""><i style={{color:'#2626c1'}} class="fa fa-pencil-square-o"></i></Link>   <Link to=""><i style={{color:'#eb1611'}} class="fa fa-trash-o"></i></Link></td>
      </tr>
      <tr>
      <td>Nightclubs Monaco</td>
        <td>9775613702</td>
        <td>monaco@gmail.com</td>
        <td>Delhi</td>
        <td>Premium</td>
        <td style={{color:'#2626c1'}}>25-02-21</td>
        <td style={{color:'#2626c1'}}>100</td>
        <td style={{color:'#2626c1'}}>60</td>
        <td><Link to=""><i style={{color:'#4ca747'}} class="fa fa-check-circle"></i></Link>  <Link to=""><i style={{color:'#2626c1'}} class="fa fa-pencil-square-o"></i></Link>   <Link to=""><i style={{color:'#eb1611'}} class="fa fa-trash-o"></i></Link></td>
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

