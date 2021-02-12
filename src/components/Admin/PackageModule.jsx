import React, { Component } from "react";
import Layout from "../Home/Layout";
// import { DetailsList, SelectionMode } from "office-ui-fabric-react";
// import Search from "../Common/Search";
// import AddEditProfile from "../Common/AddEditProfile";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
// import Popups from "../Common/Popups";
// import * as Constants from "../Common/Constants";
// import { SelectDjModal } from "./SelectDjModal";
import { Link } from "react-router-dom";
import AddEditPackage from "./AddEditPackageModal";
import Swal from "sweetalert2";
import { UNLIMITED_HOURS_CAP, ACTION_DELETE } from "../Common/Constants";
import Popups from "../Common/Popups";

export default class PackageModule extends Component {
  constructor() {
    super();
    this.state = {
      plans: [],
      showModal: false,
      categories: [],
      isAdd: true,
      selectedItem: null,
      showAlert: false,
      alertMessage: "",
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchPlans().then(() => this.fetchCategories());
  }

  fetchPlans() {
    return apiAxios
      .get("/api/admin/package", {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) =>
        this.setState({
          plans: res.data.subscriptions,
        })
      );
  }

  confirmDelete = () => {
    apiAxios
      .delete("/api/admin/package/" + this.state.deleteId, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.onDismissAlert();
        this.fetchPlans();
        Swal.fire("", "Plan deleted!", "success");
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

  deletePlan = (id) => {
    this.setState({
      showAlert: true,
      alertMessage: ACTION_DELETE,
      deleteId: id,
    });
  };

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
          loaded: true,
          // count: res.data.data.count,
        })
      );
  };
  getCategoryHours(planConfig = []) {
    let isUnlimited = false;
    if (this.state.categories) {
      let text = [];
      let total = 0;
      planConfig.forEach((item) => {
        if (item.unlimited == true) isUnlimited = true;
        let name = this.state.categories.filter(
          (elem) => elem.id == item.category
        )[0]?.categoryName;
        text.push(
          ` ${name} - ${item.unlimited == true ? "Unlimited" : item.hours}`
        );
        total += Number(item.hours);
      });
      return (
        <>
          <td>{isUnlimited ? "Unlimited" : total} Hours</td>
          <td>{text.join(", ")}</td>
        </>
      );
    }
  }

  getCost(plan) {
    if (this.state.categories.length !== 0) {
      let count = Number(plan.additionalCost) || 0;
      plan.categories.forEach((element) => {
        console.log(element);
        let catIndex = this.state.categories.findIndex((item) => {
          if (item.id == element.category) return item;
        });
        let costPerHour = this.state.categories[catIndex].costPerHour;

        let hours =
          element.unlimited == true ? UNLIMITED_HOURS_CAP : element?.hours;

        count += Number(costPerHour) * Number(hours);
      });
      return count;
    }
  }

  onPackageAdd = (values) => {
    console.log(values);
    apiAxios
      .post(
        "/api/admin/package",
        {
          ...values,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        return Swal.fire("Success", "Plan successfully added", "success").then(
          () => {
            this.setState({ showModal: false });
            this.fetchPlans();
          }
        );
      })
      .catch((err) => {
        return Swal.fire("Failed", err.resopnse.data.error, "warning");
      });
  };

  dismissModal = () => {
    this.setState({ showModal: false });
  };

  editPackage = (values) => {
    apiAxios
      .put(
        "/api/admin/package/" + values.id,
        {
          ...values,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        return Swal.fire("Success", "Plan successfully edited", "success").then(
          () => {
            this.setState({ showModal: false });
            this.fetchPlans();
          }
        );
      })
      .catch((err) => {
        return Swal.fire(
          "Failed",
          "Could not add plan. Please try again",
          "warning"
        );
      });
  };
  render() {
    if (this.state.loaded) {
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
                <h5 className={"col-md-3"}>Package</h5>
                <div className={"col-md-9"}>
                  <div className="category-top">
                    <input
                      type="search"
                      className="form-control custome-input"
                      placeholder="Search Nightclubs"
                    />
                    <button
                      type="button"
                      className="categories-btn"
                      onClick={() =>
                        this.setState({ isAdd: true, showModal: true })
                      }
                    >
                      Add Package
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
                          <th>Package Name</th>
                          <th>Total Hrs</th>
                          <th>Category Hrs</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.plans &&
                          this.state.plans.map((item) => {
                            return (
                              <tr>
                                <td>{item.planName}</td>
                                {this.getCategoryHours(item.categories)}
                                <td>{this.getCost(item)}</td>
                                <td>
                                  <Link
                                    className="edit-btn"
                                    onClick={() =>
                                      this.setState({
                                        isAdd: false,
                                        showModal: true,
                                        selectedItem: item,
                                      })
                                    }
                                  >
                                    Edit
                                  </Link>{" "}
                                  <Link
                                    onClick={() => this.deletePlan(item.id)}
                                  >
                                    Delete
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <AddEditPackage
              showModal={this.state.showModal}
              isAdd={this.state.isAdd}
              categories={this.state.categories}
              submitPackage={this.onPackageAdd}
              editPackage={this.editPackage}
              dismissModal={this.dismissModal}
              selectedItem={this.state.selectedItem}
            />
          </Layout>
        </React.Fragment>
      );
    } else {
      return "Loading..";
    }
  }
}
