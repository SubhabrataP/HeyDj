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
import DjMetric from "./DjMetric";
import PayoutModal from "./PayoutModal";

export default class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      djList: [],
      selectedItem: null,
      showModal: null,
    };
  }

  componentDidMount() {
    this.fetchDjs();
  }

  fetchDjs = () => {
    apiAxios
      .get("/api/admin/user", {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
        params: {
          role: "dj",
        },
      })
      .then((res) => {
        console.log("djs: ", res.data);
        res.data.map((val) => {
          val.fullName = val.firstName + " " + val.lastName;
        });
        this.setState({
          djList: res.data,
          filteredDjList: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  getPayouts = () => {};

  updatePayout = (item) => () => {
    this.setState({
      selectedItem: item,
      showModal: true,
    });
  };

  dismissModal = () => {
    this.setState({
      selectedItem: null,
      showModal: false,
    });
  };

  submitPayoutForm = (values) => {
    console.log(values);
  };

  render() {
    return (
      <React.Fragment>
        <Layout history={this.props.history}>
          <div className="container" style={{ marginTop: "1%" }}>
            <div className="row" style={{ marginBottom: "1%" }}>
              <div className={"col-md-7 top-col"}>
                <Link className="account-btn">Accounts</Link>
                <input
                  type="search"
                  className="form-control custome-input"
                  placeholder="Search DJs"
                />
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
                        <th>
                          <b>Djs</b>
                        </th>
                        <th>
                          <b>Total Hrs Subscribed</b>
                        </th>
                        <th>
                          <b>Total Revenue Earned</b>
                        </th>
                        <th>
                          <b>Total Revenue Paid (Till Date)</b>
                        </th>
                        <th>
                          <b>Last Paid</b>
                        </th>
                        <th>
                          <b>Outstanding Amt </b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.state.djList || []).map((item) => {
                        return (
                          <tr>
                            <td>{item.fullName}</td>
                            <DjMetric id={item.id} />
                            <td>
                              <Link onClick={this.updatePayout(item)}>
                                UPDATE
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

          <PayoutModal
            dismissModal={this.dismissModal}
            showModal={this.state.showModal}
            selectedDj={this.state.selectedItem}
            id={this.state?.selectedItem?.id}
          />
        </Layout>
      </React.Fragment>
    );
  }
}
