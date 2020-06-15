import React, { Component } from "react";
import PhoneInput from 'react-phone-input-2';
import { Modal } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import "../Styles/Icons.css";

const onlyDigitRegex = RegExp(/^[0-9]+$/);

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            showModal: false,
            sendOTPClicked: false,
            OTP: "",
            formErrors: {
                phone_number: "",
                otp: "",
            },
            isSendOTPDisabled: false
        }
    }

    isFormValid = () => {
        let formErrors = this.state.formErrors;
        let isValid = true;

        this.state.phoneNumber.length < 12 ?
            formErrors.phone_number = "Please enter a valid Phone Number."
            : formErrors.phone_number = "";
        
        this.state.OTP.length < 4 ?
            formErrors.otp = "Please enter a valid 4 digit OTP."
            : !onlyDigitRegex.test(this.state.OTP) ?
                formErrors.otp = "Please enter numbers only."
                : formErrors.otp = "";

        this.setState({
            formErrors : formErrors
        })

        Object.values(formErrors).forEach((val) => {
            val.length > 0 ?
                isValid = false
                : isValid = true
        });

        return isValid;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        });
    }

    emptyErrors = () => {
        let formErrors =  this.state.formErrors;
        formErrors.otp = "";
        formErrors.phone_number = "";
        this.setState({
            formErrors: formErrors
        });
    }

    onDismiss = () => {
        this.emptyErrors();
        this.setState({
            showModal: false,
            sendOTPClicked: false,
            phoneNumber: "",
            OTP: ""
        });
        this.props.dismissModalProps();
    }

    onSendOTP = () => {
        let formErrors = this.state.formErrors;

        this.state.phoneNumber.length < 12 ?
            formErrors.phone_number = "Please enter a valid Phone Number."
            : formErrors.phone_number = "";
        
        formErrors.otp = "";

        this.setState({
            formErrors : formErrors
        })

        if (formErrors.phone_number === "") {
            this.setState({
                isSendOTPDisabled: true
            })

            apiAxios.get(
                "/api/auth/otp",
                {
                    params: {
                        phonenumber: this.state.phoneNumber
                    }
                }
            )
            .then((response) => {
                this.setState({
                    sendOTPClicked: true,
                    isSendOTPDisabled: false

                })
            })
            .catch(function (error) {
                alert('Error');
            });
        }
    }

    onPhoneNumberChange = (value) => {
        this.emptyErrors();
        this.setState({
            phoneNumber: value,
        })
    }

    onOTPChange = (event, value) => {
        this.emptyErrors();
        if(value.length < 5)
        {
            this.setState({
                OTP: value
            })
        }
    }

    verifyOTP = () => {
        if (this.isFormValid()) {
            apiAxios.get(
                "/api/auth/otp/verify",
                {
                    params: {
                        phonenumber: this.state.phoneNumber,
                        code: this.state.OTP
                    }
                }
            )
            .then((response) => {
                if (response) {
                    // if (response.data.hasOwnProperty("statusCode")) {
                    //   if (response.data.statusCode === 200) {
                        localStorage.setItem("Id", response.data.id);
                        localStorage.setItem("PhoneNumber", response.data.phoneNumber);
                    //   }
                    // }
                }
                this.onDismiss();
                this.props.history.push('/User');
            })
            .catch(function (error) {
                alert('Error');
            });
        }
    }

    onGoogleLogin = () => {
        window.open("https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/google", "_self");
    }

    onFacebookLogin = () => {
        window.open("https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/facebook", "_self");
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.showModal}
                    isModeless={false}
                    dragOptions={false}
                >
                    <div className="container">
                        <div className="row" style={{ marginTop: "2%" }}>
                            <Label
                                className="col-md-3"
                                style={{ textAlign: "right", paddingRight: "2%", paddingTop: "3%" }}
                            >
                                Mobile:
                        </Label>
                            <PhoneInput
                                className="col-md-7"
                                country={'in'}
                                onlyCountries={['in']}
                                value={this.state.phoneNumber}
                                onChange={phone => this.onPhoneNumberChange(phone)}
                                countryCodeEditable={false}
                            />
                        </div>
                        <span className="col-md-12" style={{ color: "red" }}>
                            {this.state.formErrors["phone_number"]}
                        </span>
                        <div className="col-md-12" style={{ textAlign: "center", marginTop: "5px", marginBottom: "15px" }}>
                            <button type="button" className="btn" onClick={this.onSendOTP} style={{padding: "1px"}} disabled={this.state.isSendOTPDisabled}>
                                {this.state.sendOTPClicked ?
                                    "Resend OTP" : "Send OTP"}
                            </button>
                        </div>
                        <div className="row">
                            <Label className="col-md-3" style={{ textAlign: "right" }}>OTP:</Label>
                            <TextField
                                value={this.state.OTP}
                                onChange={(ev, val) => (this.onOTPChange(ev, val))}
                                className="col-md-8"
                                style={{ padding: "0%", textAlign: "center" }}
                            />
                        </div>
                        <span className="col-md-12" style={{ color: "red", marginLeft: "5%" }}>
                            {this.state.formErrors["otp"]}
                        </span>
                        <div style={{ textAlign: "center", marginTop: "5px" }}>
                            <button type="button" className="btn" style={{padding: "1px", marginRight: "15px"}} onClick={this.verifyOTP}>Verify</button>
                            <button type="button" className="btn" style={{padding: "1px"}} onClick={() => { this.onDismiss() }}>Cancel</button>
                        </div>
                        <div className="row" style={{textAlign: "center", marginTop: "4%"}}>
                            <div className="col-md-12">
                                <span style={{paddingTop:"3%", paddingRight: "2%"}}>Login With:</span>
                                <i className="fa fa-google" onClick={this.onGoogleLogin}></i>
                                <i className="fa fa-facebook" onClick={this.onFacebookLogin}></i>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}