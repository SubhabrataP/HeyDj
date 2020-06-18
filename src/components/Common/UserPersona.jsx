import React, { Component } from "react";
import { Persona, PersonaSize, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { Callout } from 'office-ui-fabric-react';
import Login from "../LoginPages/Login";
import AdminLogin from "../LoginPages/AdminLogin";
import AddEditProfile from "./AddEditProfile"
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

const headers = {
    'Authorization': localStorage.getItem('Token')
}

export default class UserPersona extends Component {
    constructor(props) {
        super(props);
        this._personaButtonElementRef = React.createRef();
        this.state = {
            isCalloutVisible: false,
            showLoginModal: false,
            showAdminLoginModal: false,
            showEditProfile: false,
            userData: {}
        }
    }

    onDismiss = () => {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible,
            showLoginModal: false,
            showAdminLoginModal: false,
        });
    }

    onDismissFromProps = () => {
        this.setState({
            isCalloutVisible: false,
            showLoginModal: false,
            showAdminLoginModal: false,
            showEditProfile: false,
        });
    }

    showModals = (modalType) => {
        modalType === "AdminLogin" ?
            this.setState({
                isCalloutVisible: false,
                showLoginModal: false,
                showAdminLoginModal: true
            }) :
            modalType === "Login" ?
                this.setState({
                    isCalloutVisible: false,
                    showLoginModal: true,
                    showAdminLoginModal: false
                }) :
                this.setState({
                    isCalloutVisible: false,
                    showLoginModal: false,
                    showAdminLoginModal: false
                })
    }

    onEditProfile = () => {
        this.setState({
            showEditProfile: true
        })
        apiAxios.get(
            "/api/user/" + localStorage.getItem('Id'),
            {
                headers: headers,
            }
        )
        .then((res) => {
            this.setState({
                userData: res.data
            })
        })
        .catch(function (error) {
            alert(error.response.data);
        });
    }

    onLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <span ref={ this._personaButtonElementRef } onClick={() => {this.onDismiss()}}>
                    <Persona
                        initialsColor={PersonaInitialsColor.coolGray}
                        size={PersonaSize.size42}
                        text={"User Name"}
                        hidePersonaDetails={true}
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
                            {localStorage.getItem("Token") ?
                                <React.Fragment>
                                    <span role="listitem" className="loginDropdown" onClick={() => (this.onEditProfile())}>
                                        Edit Profile
                                    </span>
                                    <hr />
                                    <span className="loginDropdown" role="listitem" onClick={this.onLogout}>
                                        Logout
                                    </span>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <span className="loginDropdown" role="listitem" onClick={() => { this.showModals("Login") }}>
                                        Login
                                    </span>
                                    <hr />
                                    <span className="loginDropdown"  role="listitem" onClick={() => { this.showModals("AdminLogin") }}>
                                        Admin Login
                                    </span>
                                </React.Fragment>
                            }
                        </span>
                    </Callout>
                )}
                <Login
                    showModal={this.state.showLoginModal}
                    dismissModalProps={() => { this.onDismissFromProps() }}
                    history={this.props.history}
                />
                <AdminLogin 
                    showModal={this.state.showAdminLoginModal}
                    dismissModalProps={() => { this.onDismissFromProps() }}
                    history={this.props.history}
                />
                <AddEditProfile
                        showModal={this.state.showEditProfile}
                        dismissModalProps={() => (this.onDismissFromProps())}
                        isAdd={false}
                        roleToBeAdded={localStorage.getItem('Role')}
                        profileData={this.state.userData}
                />
            </React.Fragment>
        )
    }
}