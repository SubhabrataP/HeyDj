import React, { Component } from "react";
import PhoneInput from 'react-phone-input-2';
import { Modal } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

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
            }
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
                })
            })
            .catch(function (error) {
                console.log(error);
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
                console.log(response);
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
                console.log(error);
            });
        }
    }

    // onGoogleLogin = async () => {
    //     // const response = await apiAxios.get("/api/auth/google")

    //     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmYWFkZTFhLWE1NDAtNGI1Zi05YmNiLWNlMzBiY2Q4MGM3NyIsImVtYWlsSWQiOiJhcmlqaXRAY3JhZnR2ZWRhdGVjaG5vbG9neS5jb20iLCJpYXQiOjE1OTE3MjkwMDJ9.N06C2hW1c1lPdJ0rvXGvqGRpq36pZKsS6f4EDZ9svPk"


        
    // }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.showModal}
                    isModeless={false}
                    dragOptions={false}
                >
                    <div className="row">
                        <Label required className="col-md-4">Mobile</Label>
                        <PhoneInput
                            className= "col-md-8"
                            country={'in'}
                            onlyCountries={['in']}
                            value={this.state.phoneNumber}
                            onChange={phone => this.onPhoneNumberChange(phone)}
                            countryCodeEditable={false}
                        />
                        <span style={{ color: "red", marginLeft: "5%" }}>
                            {this.state.formErrors["phone_number"]}
                        </span>
                    </div>
                    <div style={{textAlign:"right", marginTop: "15px"}}>
                            <button type="button" className="btn" onClick={this.onSendOTP}>
                                { this.state.sendOTPClicked ? 
                                "Resend OTP" : "Send OTP"}
                            </button>
                    </div>
                    <div>
                        <TextField
                            label="OTP"
                            value={this.state.OTP}
                            onChange={(ev, val) => (this.onOTPChange(ev, val))}
                        />
                        <span style={{ color: "red", marginLeft: "5%" }}>
                            {this.state.formErrors["otp"]}
                        </span>
                    </div>
                    <div style={{textAlign:"center", marginTop: "15px"}}>
                        <button type="button" className="btn" onClick={this.verifyOTP}>Verify</button>
                        <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                    </div>
                    {/* <div>
                        <button type="button" className="btn" onClick={this.onGoogleLogin}>Google Login</button>
                    </div> */}
                </Modal>
            </React.Fragment>
        )
    }
}