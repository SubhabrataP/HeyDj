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
import AddEditCategory from "./AddEditCategoryModal";
import Swal from "sweetalert2";

export default class CategoryModule extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      showModal: false,
      showAlert: false,
      alertMessage: "",
      isAdd: true,
      selectedItem: null,
      count: {}
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
          categories: res.data.data.subscriptions,
          count: res.data.data.count,
        })
      );
  };

  submit = (values) => {
    apiAxios
      .post(
        "/api/admin/category",
        { ...values },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) =>
        Swal.fire("Success", "Category added!", "success").then(() => {
          this.dismissModal();
          this.fetchCategories();
        })
      )
      .catch((err) =>
        Swal.fire(
          "Failed",
          "Could not add category. Please try again",
          "warning"
        )
      );
  };

  dismissAlert = () => {
    this.setState({ showAlert: false });
  };

  confirmDelete = () => {
    apiAxios
      .delete("/api/admin/category/" + this.state.deleteId, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.onDismissAlert();
        this.fetchCategories();
        Swal.fire("", "Category deleted!", "success");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onDismissAlert = () => {
    this.setState({
      showAlert: false,
      deleteId: 0,
      alertMessage: "",
    });
  };

  deleteProfile = (id) => {
    this.setState({
      showAlert: true,
      alertMessage: Constants.ACTION_DELETE,
      deleteId: id,
    });
  };

  dismissModal = () => {
    this.setState({ showModal: false });
  };

  editItem = (item) => () => {
    this.setState({
      selectedItem: item,
      isAdd: false,
      showModal: true,
    });
  };

  edit = (item) => {
    apiAxios
      .put(
        "/api/admin/category/" + item.id,
        {
          ...item,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) =>
        Swal.fire("Success", "Category edited successfully", "success").then(
          () => {
            this.dismissModal();
            this.fetchCategories();
          }
        )
      )
      .catch((err) => Swal.fire("Failed", "Please try  again", "warning"));
  };

  render() {
    return (
      <React.Fragment>
        <Layout history={this.props.history}>
          <Popups
            showModal={this.state.showAlert}
            message={this.state.alertMessage}
            isMultiButton={true}
            button1Click={() => {
              this.confirmDelete();
            }}
            button2Click={() => {
              this.onDismissAlert();
            }}
          />
          <div className="container" style={{ marginTop: "1%" }}>
            <div className="row" style={{ marginBottom: "1%" }}>
              <h5 className={"col-md-3"}>DJ Categories</h5>
              <div className={"col-md-9"}>
                <div className="category-top">
                  <input
                    type="search"
                    className="form-control custome-input"
                    placeholder="Search Categories"
                  />
                  <button
                    type="button"
                    className="categories-btn"
                    onClick={() => this.setState({ showModal: true })}
                  >
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
                      {this.state.categories.map((item) => (
                        <tr>
                          <td>{item.categoryName}</td>
                          <td>{item?.costPerHour}</td>
                          <td>{this.state.count[item.id] || 0}</td>
                          <td>{item?.status == 0 ? "Inactive" : "Active"}</td>
                          <td>
                            <Link
                              className="edit-btn"
                              onClick={this.editItem(item)}
                            >
                              Edit
                            </Link>{" "}
                            <Link onClick={() => this.deleteProfile(item.id)}>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <AddEditCategory
            showModal={this.state.showModal}
            categoryItem={this.state.selectedItem}
            submit={this.submit}
            edit={this.edit}
            isAdd={this.state.isAdd}
            dismissModal={this.dismissModal}
          />
        </Layout>
      </React.Fragment>
    );
  }
}
