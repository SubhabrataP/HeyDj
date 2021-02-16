import React, { Component } from "react";
import {
  Persona,
  PersonaSize,
  PersonaInitialsColor,
} from "office-ui-fabric-react/lib/Persona";
import { Callout } from "office-ui-fabric-react";
import Login from "../LoginPages/Login";
import AdminLogin from "../LoginPages/AdminLogin";
import AddEditProfile from "./AddEditProfile";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "./Popups";
import AddEditNightclub from "../Admin/AddEditNightclub";
import * as Constants from "./Constants";

export default class UserPersona extends Component {
  constructor(props) {
    super(props);
    this._personaButtonElementRef = React.createRef();
    this.state = {
      isCalloutVisible: false,
      showLoginModal: false,
      showAdminLoginModal: false,
      showEditProfile: false,
      userData: "",
      userImage: "/images/emptyUser.png",
      showAlert: false,
      alertMessage: "",
      showNightClubModal: false,
      editProfileData: {},
    };

    this.token = localStorage.getItem("Token");
    this.userRole = localStorage.getItem("Role")?.toLowerCase() || null;
    if (!(this.token === null) && this.state.userData === "") {
      this.userRole == "admin" ? this.onEditProfile() : this.onEditNightclub();
    }
  }

  onDismiss = () => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible,
      showLoginModal: false,
      showAdminLoginModal: false,
    });
  };

  onDismissFromProps = () => {
    this.setState({
      isCalloutVisible: false,
      showLoginModal: false,
      showAdminLoginModal: false,
      showEditProfile: false,
    });
    // window.location.reload();
  };

  showModals = (modalType) => {
    modalType === "AdminLogin"
      ? this.setState({
          isCalloutVisible: false,
          showLoginModal: false,
          showAdminLoginModal: true,
        })
      : modalType === "Login"
      ? this.setState({
          isCalloutVisible: false,
          showLoginModal: true,
          showAdminLoginModal: false,
        })
      : this.setState({
          isCalloutVisible: false,
          showLoginModal: false,
          showAdminLoginModal: false,
        });
  };

  onEditProfile = () => {
    this.setState({
      showEditProfile: true,
    });
    apiAxios
      .get("/api/user/" + localStorage.getItem("Id"), {
        headers: {
          Authorization: this.token,
        },
      })
      .then((res) => {
        this.setState({
          userData: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
      alertMessage: Constants.LOGOUT,
    });
  };

  onDismissAlert = () => {
    this.setState({
      showAlert: false,
      alertMessage: "",
    });
  };

  onEditNightclub = () => {
    apiAxios
      .get("/api/user/" + localStorage.getItem("Id"), {
        headers: {
          Authorization: this.token,
        },
      })
      .then((res) => {
        localStorage.setItem('account', JSON.stringify(res.data.account))
        this.setState({
          editProfileData: res.data,
          userData: {
            ...this.state.userData,
            profileImage: res.data.profileImage,
          },
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  };

  renderOtherAdminOptions = () => {
    if (this.userRole == "admin") {
      return (
        <>
          <hr />
          <span
            role="listitem"
            className="loginDropdown"
            onClick={() => this.props.history.push('/Admin/Categories') }
          >
            DJ Categories
          </span>
          <hr />
          <span
            role="listitem"
            className="loginDropdown"
            onClick={() => this.props.history.push('/Admin/Packages')}
          >
            Nightclub Plans
          </span>
        </>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <span
          ref={this._personaButtonElementRef}
          onClick={() => {
            this.onDismiss();
          }}
        >
          <Persona
            initialsColor={PersonaInitialsColor.coolGray}
            size={PersonaSize.size42}
            text={
              this.state.userData.firstName + " " + this.state.userData.lastName
            }
            hidePersonaDetails={true}
            imageUrl={this.state.userData.profileImage}
          />
        </span>
        {this.state.isCalloutVisible && (
          <Callout
            target={this._personaButtonElementRef.current}
            setInitialFocus
            onDismiss={this.onDismiss}
            className="p-4"
          >
            <span role="list">
              {this.token ? (
                <React.Fragment>
                  <span
                    role="listitem"
                    className="loginDropdown"
                    onClick={() =>
                      this.userRole == "nightclub"
                        ? this.setState({ showNightClubModal: true }, () =>
                            this.onEditNightclub()
                          )
                        : this.onEditProfile()
                    }
                  >
                    Edit Profile
                  </span>
                  {this.renderOtherAdminOptions()}
                  <hr />
                  <span
                    className="loginDropdown"
                    role="listitem"
                    onClick={() => {
                      this.showAlert();
                    }}
                  >
                    Logout
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span
                    className="loginDropdown"
                    role="listitem"
                    onClick={() => {
                      this.showModals("Login");
                    }}
                  >
                    Login
                  </span>
                  <hr />
                  <span
                    className="loginDropdown"
                    role="listitem"
                    onClick={() => {
                      this.showModals("AdminLogin");
                    }}
                  >
                    Admin Login
                  </span>
                </React.Fragment>
              )}
            </span>
          </Callout>
        )}
        <Login
          showModal={this.state.showLoginModal}
          dismissModalProps={() => {
            this.onDismissFromProps();
          }}
          history={this.props.history}
        />
        <AdminLogin
          showModal={this.state.showAdminLoginModal}
          dismissModalProps={() => {
            this.onDismissFromProps();
          }}
          history={this.props.history}
        />
        <AddEditProfile
          showModal={this.state.showEditProfile}
          dismissModalProps={() => this.onDismissFromProps()}
          isAdd={false}
          roleToBeAdded={this.userRole}
          profileData={this.state.userData}
        />

        <AddEditNightclub
          showModal={this.state.showNightClubModal}
          dismissModal={() => this.setState({ showNightClubModal: false })}
          isAdd={false}
          roleToBeAdded={"nightclub"}
          profileData={this.state.editProfileData}
          refetchData={() => {}}
        />

        <Popups
          showModal={this.state.showAlert}
          message={this.state.alertMessage}
          secondaryMessage={Constants.SECONDARY_LOGOUT}
          isMultiButton={true}
          button1Text={"Yes"}
          button1Click={() => {
            this.onLogout();
          }}
          button2Text={"No"}
          button2Click={() => {
            this.onDismissAlert();
          }}
        />
      </React.Fragment>
    );
  }
}
