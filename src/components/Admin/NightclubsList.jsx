import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import Search from "../Common/Search";
import AddEditProfile from "../Common/AddEditProfile";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants";
import { SelectDjModal } from "./SelectDjModal";
import Swal from "sweetalert2";
import * as moment from "moment";
import AddEditNightclub from "./AddEditNightclub";

const sampleObject = {
  fullName: "Indroneel",
  phoneNumber: "7058637206",
  emailId: "indroneelray@gmail.com",
  city: "gurgaon",
  status: 1,
  id: 1,
};

export default class NightClubList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddEditDj: false,
      djDetails: [],
      isAdd: true,
      editProfileData: {},
      itemsPerPage: 5,
      showAlert: false,
      deleteId: 0,
      alertMessage: "",
      filteredDjList: [],
      showDjModal: false,
      alertType: "",
      showModal: false,
    };
    this.columns = [
      {
        key: "column1",
        name: "Nightclub",
        fieldName: "fullName",
        isResizable: false,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        key: "column2",
        name: "Mobile",
        fieldName: "phoneNumber",
        isResizable: false,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        key: "column3",
        name: "Email",
        fieldName: "emailId",
        isResizable: false,
        minWidth: 230,
        maxWidth: 230,
      },
      {
        key: "column4",
        name: "City",
        fieldName: "city",
        isResizable: false,
        minWidth: 125,
        maxWidth: 125,
      },
      {
        key: "column5",
        name: "Plan",
        fieldName: "plan_name",
        isResizable: false,
        minWidth: 125,
        maxWidth: 125,
      },
      {
        key: "column6",
        name: "Valid Till",
        fieldName: "end_date",
        isResizable: false,
        minWidth: 125,
        maxWidth: 125,
      },
      {
        key: "column7",
        name: "Total Hrs",
        fieldName: "total_hours",
        isResizable: false,
        minWidth: 125,
        maxWidth: 125,
      },
      {
        key: "column8",
        name: "Hrs Used",
        fieldName: "hours_used",
        isResizable: false,
        minWidth: 125,
        maxWidth: 125,
      },
      {
        key: "column9",
        name: "Action",
        isResizable: false,
        minWidth: 220,
        maxWidth: 220,
        onRender: (item) => {
          return (
            <div className="nightclub-options">
              <button
                className="customBtnWhite ml-1"
                onClick={() => this.toggleStatus(item)}
              >
                {item.status == 1 ? (
                  <i
                    className="fa fa-check-circle text-success"
                    title="Deactivate account?"
                  />
                ) : (
                  <i
                    className="fa fa-times text-warning"
                    title="Activate Account?"
                  />
                )}
              </button>
              <button
                className="customBtn mx-1"
                onClick={() => this.editProfile(item)}
                title="Edit Account"
              >
                <i className="fa fa-edit" />
              </button>
              <button
                className="customBtnWhite"
                onClick={() => this.showDeleteAlert(item.id)}
                title="Delete Account"
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          );
        },
      },
    ];

    this.getAllNightclubsList();
  }

  showDeleteAlert = (id) => {
    this.setState({
      showAlert: true,
      deleteId: id,
      alertMessage: Constants.ACTION_DELETE,
    });
  };

  onDismissAlert = () => {
    this.setState({
      showAlert: false,
      deleteId: 0,
      alertMessage: "",
    });
  };

  deleteProfile = () => {
    apiAxios
      .delete("/api/admin/user/nightclub/" + this.state.deleteId, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.onDismissAlert();
        this.getAllNightclubsList();
        Swal.fire("", "Nightclub deleted!", "success");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  getAccounts = () => {
    apiAxios
      .get("/api/admin/account-tracker", {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        let accounts = {};
        res.data.subscriptions.forEach((item) => {
          accounts[item.id] = item;
        });
        console.log(accounts);
        let djDetails = [...this.state.djDetails];
        djDetails.forEach((item) => {
          item.account = accounts[item.id];
          if (item.account) {
            item["start_date"] = moment(item?.account?.startDate).format(
              "DD/MM/YYYY"
            );
            item["end_date"] = moment(item?.account?.endDate).format(
              "DD/MM/YYYY"
            );
            item["total_hours"] = this.getHours(item.account.plan);
            item["hours_used"] = this.getRemainingHours(item.account.plan);
            item["plan_name"] = item?.account?.plan?.planName;
          } else {
            item["start_date"] = "N/A";
            item["end_date"] = "N/A";

            item["total_hours"] = 0;
            item["hours_used"] = 0;
            item["plan_name"] = "N/A";
          }
        });
        console.log(djDetails);
        this.setState({ djDetails, filteredDjList: djDetails });
      });
  };

  getHours = (item) => {
    let unlimited = false;
    let count = 0;
    item.categories.forEach((element) => {
      if (unlimited !== true) {
        if (element.unlimited === true) {
          unlimited = true;
          return;
        }
        count += Number(element.hours);
      }
    });

    return unlimited ? "Unlimited" : count;
  };

  getRemainingHours = (item) => {
    let unlimited = false;
    let count = 0;
    item.categories.forEach((element) => {
      if (unlimited !== true) {
        if (element.unlimited === true) {
          unlimited = true;
          return;
        }

        count += (element.usedHours || 0);
      }
    });

    return unlimited ? "Unlimited" : count;
  };

  getAllNightclubsList = () => {
    apiAxios
      .get("/api/admin/user", {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
        params: {
          role: "nightclub",
        },
      })
      .then((res) => {
        res.data.map((val) => {
          val.fullName = val.firstName;
        });
        this.setState(
          {
            djDetails: res.data,
            filteredDjList: res.data,
          },
          () => this.getAccounts()
        );
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          djDetails: [],
          filteredDjList: [],
        });
      });
  };

  onAddDjClick = () => {
    this.setState({
      showAddEditDj: true,
      isAdd: true,
      editProfileData: {},
    });
  };

  dismissAddEditModalProps = () => {
    this.setState({
      showAddEditDj: false,
    });
    this.getAllNightclubsList();
  };

  editProfile = (item) => {
    //used
    this.setState({
      isAdd: false,
      showModal: true,
      editProfileData: item,
    });
  };

  onLoadMoreClick = () => {
    this.setState({
      itemsPerPage: this.state.itemsPerPage + 5,
    });
  };

  onSearchDj = (event) => {
    if (event.target.value.trim().length > 0) {
      this.setState({
        filteredDjList: this.state.filteredDjList.filter((x) =>
          x.fullName
            .toLowerCase()
            .includes(event.target.value.trim().toLowerCase())
        ),
      });
    } else {
      this.setState({
        filteredDjList: this.state.djDetails,
      });
    }
  };

  showDjModal = (type) => {
    this.setState({
      showDjModal: true,
      alertType: type,
    });
  };

  dismissDjModal = () => {
    this.setState({
      showDjModal: false,
    });
  };

  toggleStatus = (item) => {
    delete item["license"];
    delete item["profileImage"];
    delete item["start_date"];
    delete item["end_date"];
    delete item["total_hours"];
    delete item["hours_used"];
    delete item["plan_name"];
    delete item["account"];
    delete item["data"];

    let formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ ...item, status: item.status == 1 ? 0 : 1 })
    );
    apiAxios
      .put("/api/admin/user/nightclub/" + item.id, formData, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.getAllNightclubsList();
        Swal.fire(
          "",
          `Nightclub is now ${item.status == 1 ? "inactive" : "active"}`,
          "success"
        );
      })
      .catch((error) => {
        formData = null
      });
  };

  render() {
    return (
      <React.Fragment>
        <Layout history={this.props.history}>
          <div className="container" style={{ marginTop: "1%" }}>
            <div className="row" style={{ marginBottom: "1%" }}>
              <h5 className={"col-md-3"}>Nightclubs List</h5>
              <div className={"row col-md-7"} style={{ textAlign: "right" }}>
                <input
                  type="search"
                  placeholder="Search Nightclubs"
                  onChange={this.onSearchDj}
                  className="px-1 form-control col-md-5"
                />
                {/* <button
                  className="customBtn"
                  style={{ marginLeft: "5%" }}
                  onClick={() => this.onAddDjClick()}
                >
                  Add Nightclub
                </button> */}
              </div>
            </div>

            <div className="row">
              <DetailsList
                selectionMode={SelectionMode.none}
                items={this.state.filteredDjList.slice(
                  0,
                  this.state.itemsPerPage
                )}
                columns={this.columns}
              />
            </div>
            <div>
              {this.state.filteredDjList.length > this.state.itemsPerPage ? (
                <button onClick={this.onLoadMoreClick}>Load More</button>
              ) : null}
            </div>
          </div>
          <AddEditNightclub
            showModal={this.state.showModal}
            dismissModal={() => this.setState({ showModal: false })}
            isAdd={this.state.isAdd}
            roleToBeAdded={"nightclub"}
            profileData={this.state.editProfileData}
            refetchData={this.getAllNightclubsList}
          />
          <Popups
            showModal={this.state.showAlert}
            message={this.state.alertMessage}
            isMultiButton={true}
            button1Click={() => {
              this.deleteProfile();
            }}
            button2Click={() => {
              this.onDismissAlert();
            }}
          />
          <SelectDjModal
            showAlert={this.state.showDjModal}
            onDismiss={() => this.dismissDjModal()}
            djDetails={this.state.djDetails}
            type={this.state.alertType}
          />
        </Layout>
      </React.Fragment>
    );
  }
}
