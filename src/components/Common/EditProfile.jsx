import React, { Component } from "react";
import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class EditProfile extends Component {
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
        this.props.dismissModalProps();
    }

    render() {
        return (
            <div className="container">
                <Modal
                    isOpen={this.state.showModal}
                    // isOpen= {true}
                    isModeless={false}
                    dragOptions={false}
                >
                    <h4 style={{marginBottom: "2%", textAlign: "center"}}>Add User</h4>
                    <div className="container">
                        <div className={"image-edit circle"} style={{marginBottom: "3%", border: "solid 0.5px black"}}>
                            <span className="overlay_profile">
                                <i className="fa fa-plus upload-button" 
                                    onClick={() => {
                                this.upload.click();}} >
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

                        <div className="row" style={{marginBottom: "1%"}}>
                            <Label required className="col-md-4" style={{padding: "0%", paddingLeft: "3%"}}>First Name:</Label>
                            <TextField className="col-md-8" errorMessage="Error" />
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

                        <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn">Update</button>
                            <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}