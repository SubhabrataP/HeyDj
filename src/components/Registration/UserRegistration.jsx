import React, { Component } from "react";
import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class UserRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            profile_picture: {
                value: "",
                name: null
            },
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

    onDismiss = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.showModal}
                    isModeless={false}
                    dragOptions={false}
                >
                    User Registration
                    <div>
                        <div
                            className={"image-edit"}
                            onClick={() => {
                                this.upload.click();
                            }}
                        >
                            <span className="overlay_profile">
                                <i>
                                    <span className="fa fa-camera" />
                                </i>
                            </span>
                            <Image
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

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label className="col-md-4">LAst Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div className="row">
                            <Label required className="col-md-4">First Name</Label>
                            <TextField className="col-md-8" errorMessage="Error message" />
                        </div>

                        <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn">Sign Up</button>
                            <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}