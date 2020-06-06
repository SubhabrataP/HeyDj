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
            showRegistrationModal: false,
            showLoginModal: false
        }
    }

    onDismiss = () => {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible,
            showRegistrationModal: false,
            showLoginModal: false
        });
    }

    userRegisterModal = () => {
        this.setState({
            showRegistrationModal: true,
            isCalloutVisible: false,
            showLoginModal:false
        });
    }

    userLoginModal = () => {
        this.setState({
            showLoginModal: true,
            isCalloutVisible: false,
            showRegistrationModal: false
        });
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
                    >
                        <span role="list">
                            <span role="listitem" onClick={() => {this.userRegisterModal()}}>
                                Register
                            </span>
                            <hr />
                            <span role="listitem" onClick={() => {this.userLoginModal()}}>
                                Login
                            </span>
                            <hr />
                            <span role="listitem">
                                Logout
                            </span>
                            <hr />
                        </span>
                    </Callout>
                )}
                <UserRegistration showModal={this.state.showRegistrationModal} />
                <Login showModal={this.state.showLoginModal} />
            </React.Fragment>
        )
    }
}