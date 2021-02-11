import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import Search from "../Common/Search";
import AddEditProfile from "../Common/AddEditProfile";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants";
import { SelectDjModal } from "./SelectDjModal";
import { Link } from "react-router-dom";
import AddEditCategory from './AddEditCategoryModal'

export default class CategoryModule extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    apiAxios
      .get("/api/admin/category", {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) =>
        this.setState({
          categories: res.data.data,
        })
      );
  };
  render() {
    return (
      <React.Fragment>
        <Layout history={this.props.history}>
          <div className="container" style={{ marginTop: "1%" }}>
            <div className="row" style={{ marginBottom: "1%" }}>
              <h5 className={"col-md-3"}>DJ Categories</h5>
              <div className={"col-md-9"}>
                <div className="category-top">
                  <input
                    type="search"
                    className="form-control custome-input"
                    placeholder="Search Nightclubs"
                  />
                  <button type="button" className="categories-btn" onClick={()=>this.setState({showModal:true})}>
                    Add Category
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="responsive-table"
                  style={{ background: "#fff" }}
                >
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Per Hr Price</th>
                        <th>Total Number of DJs</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>145</td>
                        <td>1,45,000</td>
                        <td>1,00,000</td>
                        <td>
                          <Link to="" className="edit-btn">
                            Edit
                          </Link>{" "}
                          <Link>Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>John Doe</td>
                        <td>145</td>/
                        <td>1,45,000</td>
                        <td>1,00,000</td>
                        <td>
                          <Link to="" className="edit-btn">
                            Edit
                          </Link>{" "}
                          <Link>Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>John Doe</td>
                        <td>145</td>
                        <td>1,45,000</td>
                        <td>1,00,000</td>
                        <td>
                          <Link to="" className="edit-btn">
                            Edit
                          </Link>{" "}
                          <Link>Delete</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <AddEditCategory showModal={this.state.showModal}  submit={()=>{}} dismissModal={()=>this.setState({showModal:false})}/>
        </Layout>
      </React.Fragment>
    );
  }
}
