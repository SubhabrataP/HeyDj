import React, { Component } from "react";
import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const onlyDigitRegex = RegExp(/^[0-9]{10}$/);

export default class AddEditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            profile_picture: {
                value: "",
                name: null
            },
            firstNameError: "",
            mobileError: "",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            city: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal
        });
    }

    editOnChangeHandler = (event, element) => {
        if (element === "image") {
            const file = event.target.files[0];
            if (!file.type.includes("image")) {
                //TODO: Show Error
                console.error("Image is not Selected");
                return;
            }
            // Encodes Image to upload and Preview
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                this.setState({
                    profile_picture: {
                        value: reader.result,
                        name: file.name
                    }
                });
            }.bind(this);
        }
        // else {
        //   console.log(element, event.target.value);
        //   this.setState({
        //     editState: { ...this.state.editState, [element]: event.target.value },
        //   });
        // }
    };

    formValidation = () => {
        this.state.firstName.trim().length < 1 ?
            this.setState({
                firstNameError: "First name is required.",
                firstName: ""
            }) :
            this.setState({
                firstNameError: "",
                firstName: this.state.firstName.trim()
            });

        var mobileNumber = this.state.mobile;
        
        mobileNumber.length == 0 ?
            this.setState({
                mobileError: "Mobile number is required."
            }) :
            onlyDigitRegex.test(mobileNumber) ?
                this.setState({
                    mobileError: ""
                }) :
                this.setState({
                    mobileError: "Please enter a valid 10 digit mobile number."
                })
    }

    onDismiss = () => {
        this.setState({
            showModal: false,
            profile_picture: {
                value: "",
                name: null
            },
            firstNameError: "",
            mobileError: "",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            city: ""
        });
        this.props.dismissModalProps();
    }

    render() {
        return (
            <div className="container">
                <Modal
                    isOpen={this.state.showModal}
                    isModeless={false}
                    dragOptions={false}
                >
                    <h4 style={{marginBottom: "2%", textAlign: "center"}}>Add User</h4>
                    <div className="container">
                        <div className={"image-edit circle"} style={{marginBottom: "3%", border: "solid 0.5px black"}}>
                            <span className="overlay_profile">
                                <i className="fa fa-plus upload-button"
                                    onClick={() => {
                                        this.upload.click();
                                    }} >
                                </i>
                            </span>
                            <Image
                                className="profile-pic"
                                src={this.state.profile_picture.value ? this.state.profile_picture.value : ""}
                                roundedCircle
                            />
                            <FormControl
                                aria-label="Image"
                                type={"file"}
                                ref={(ref) => (this.upload = ref)}
                                style={{ padding: "4px", marginBottom: "16px", width: "100%" }}
                                onChange={(event) => this.editOnChangeHandler(event, "image")}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>First Name:</Label>
                            <TextField
                                className="col-md-8"
                                value={this.state.firstName}
                                onChange={(ev, firstName) => (this.setState({ firstName, firstNameError: "" }))}
                                errorMessage={this.state.firstNameError}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>Last Name:</Label>
                            <TextField
                                className="col-md-8"
                                value={this.state.lastName}
                                onChange={(ev, lastName) => (this.setState({ lastName }))}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>Email:</Label>
                            <TextField
                                className="col-md-8"
                                value={this.state.email}
                                onChange={(ev, email) => (this.setState({ email }))}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>Mobile:</Label>
                            <TextField
                                className="col-md-8"
                                errorMessage={this.state.mobileError}
                                value={this.state.mobile}
                                onChange={(ev, mobile) => (this.setState({ mobile, mobileError: "" }))}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>City:</Label>
                            <TextField
                                className="col-md-8"
                                value={this.state.city}
                                onChange={(ev, city) => (this.setState({ city }))}
                            />
                        </div>

                        <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn" onClick={this.formValidation}>
                                {this.props.isAdd ? "Add" : "Update"}
                            </button>
                            <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}