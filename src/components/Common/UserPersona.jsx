import React, { Component } from "react";
import { Persona, PersonaSize, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { Callout } from 'office-ui-fabric-react';
import UserRegistration from "../Registration/UserRegistration";
import Login from "../Common/Login";

export default class UserPersona extends Component {
    constructor(props) {
        super(props);
        this._personaButtonElementRef = React.createRef();
        this.state = {
            isCalloutVisible: false,
            showLoginModal: false
        }
    }

    onDismiss = () => {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible,
            showLoginModal: false
        });
    }

    onDismissFromProps = () => {
        this.setState({
            isCalloutVisible: false,
            showLoginModal: false
        });
    }

    showModals = (modalType) => {
        modalType === "Login" ?
        this.setState({
            isCalloutVisible: false,
            showLoginModal:true
        }) :
        this.setState({
            isCalloutVisible: false,
            showLoginModal:false
        })
    }

    onLogout = () => {
        localStorage.removeItem("Id");
        localStorage.removeItem("PhoneNumber");
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <span ref={ this._personaButtonElementRef } onClick={() => {this.onDismiss()}}>
                    <Persona
                        initialsColor={PersonaInitialsColor.coolGray}
                        size={PersonaSize.size32}
                        text={"User Name"}
                        hidePersonaDetails={true}
                    />
                </span>
                {this.state.isCalloutVisible && (
                    <Callout
                        target={this._personaButtonElementRef.current}
                        setInitialFocus
                        onDismiss={this.onDismiss}
                    >
                        <span role="list">
                            <span role="listitem" onClick={() => {this.showModals("Login")}}>
                                Login
                            </span>
                            <hr />
                            <span role="listitem">
                                Admin Login
                            </span>
                            
                            {localStorage.getItem("Id") ?
                                <React.Fragment>
                                    <hr />
                                    <span role="listitem" onClick={this.onLogout}>
                                        Logout
                                    </span>
                                </React.Fragment>
                                : null}
                        </span>
                    </Callout>
                )}
                <UserRegistration
                    showModal={this.state.showRegistrationModal}
                    dismissModalProps={() => {this.onDismissFromProps()}}
                />
                <Login
                    showModal={this.state.showLoginModal}
                    dismissModalProps={() => { this.onDismissFromProps() }}
                    history={this.props.history}
                />
            </React.Fragment>
        )
    }
}