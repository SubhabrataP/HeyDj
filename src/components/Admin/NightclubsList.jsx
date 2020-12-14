import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import Search from "../Common/Search";
import AddEditProfile from "../Common/AddEditProfile";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants";
import { SelectDjModal } from "./SelectDjModal";

const sampleObject = {
  fullName: "Indroneel",
  phoneNumber: "7058637206",
  emailId: "indroneelray@gmail.com",
  city: "gurgaon",
  status:1,
  id:1
};

export default class DjList extends Component {
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
        name: "Action",
        isResizable: false,
        minWidth: 220,
        maxWidth: 220,
        onRender: (item) => {
          return (
            <div className="nightclub-options">
              <button
                className="customBtn"
                onClick={() => this.editProfile(item)}
              >
                <i className="fa fa-edit" />
              </button>
              <button
                className="customBtnWhite ml-1"
                onClick={() => this.showDeleteAlert(item.id)}
              >
                <i className="fa fa-trash" />
              </button>
              <button
                className="customBtnWhite ml-1"
                onClick={() => this.toggleStatus(item)}
              >{item.status == 1 ? <i className="fa fa-check-circle" title="Deactivate account?"/> : <i className="fa fa-times" title="Activate Account?" />}</button>
            </div>
          );
        },
      },
    ];

    this.getAllDjsList();
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
      .delete("/api/admin/user/" + this.state.deleteId, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.onDismissAlert();
        this.getAllDjsList();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  getAllDjsList = () => {
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
          djDetails: res.data,
          filteredDjList: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          djDetails: [{ ...sampleObject }],
          filteredDjList: [{ ...sampleObject }],
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
    this.getAllDjsList();
  };

  editProfile = (item) => {
    this.setState({
      isAdd: false,
      showAddEditDj: true,
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
    apiAxios.put(
        "/api/admin/user/" + item.id, {...item, status: item.status == 1 ? 0 : 1},
        {
            headers: {
                'Authorization': localStorage.getItem('Token')
            },
        }
    )
        .then((res) => {
            this.getAllDjsList()
        })
        .catch((error) => {
            console.log(error.response === undefined ? error.response : error.response.data);
        });
  }

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
                />
                <button className="customBtn" style={{ marginLeft: "5%" }} onClick={() => (this.onAddDjClick())}>Add Nightclub</button>
                                {/* <button className="customBtn" style={{ marginLeft: "2%" }} onClick={() => (this.showDjModal("playlist"))}>Add Playlist</button>
                                <button className="customBtn" style={{ marginLeft: "2%" }} onClick={() => (this.showDjModal("content"))}>Add Content</button> */}
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
          <AddEditProfile
            showModal={this.state.showAddEditDj}
            dismissModalProps={() => this.dismissAddEditModalProps()}
            isAdd={this.state.isAdd}
            roleToBeAdded={"nightclub"}
            profileData={this.state.editProfileData}
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
