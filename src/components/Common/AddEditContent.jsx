import React, { Component } from "react";
import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export default class AddEditContent extends Component{
    constructor(props){
        super(props);

        this.state={
            Title: "",
            thumbnailPath: "",
            contentPath: "",
            percentComplete: 1,
            showProgress: false
        }
    }

    updateProgress = (evt) => {
        if (evt.lengthComputable) {
            var percentLoaded = (evt.loaded / evt.total);
            this.setState({
                percentComplete: percentLoaded
            })
        }
    }

    editOnChangeHandler = (event, type) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            // if (!file.type.includes("image")) {
            //     //TODO: Show Error
            //     console.error("Image is not Selected");
            //     return;
            // }
            // Encodes Image to upload and Preview
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadstart = function () {
                if (type === "multimedia") {
                    this.setState({
                        showProgress: true
                    })
                }
            }.bind(this)

            reader.onprogress = this.updateProgress.bind(this);
            reader.onloadend = function () {
                if (type === "image") {
                    this.setState({
                        thumbnailPath: reader.result,
                    });
                }
                else if (type === "multimedia") {
                    this.setState({
                        contentPath: reader.result,
                    });
                }
            }.bind(this);
        }
        else
        {
            if (type === "multimedia") {
                this.setState({
                    showProgress: false
                })
            }
        }
    }

    onAddEditContent = () => {
        const data = {
            "title": this.state.Title,
            "thumbnail": this.state.thumbnailPath,
            "content": this.state.contentPath
        }

        console.log(data)

        apiAxios.post('/api/dj/content', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((response) => {
            // this.onDismiss();
            console.log(response)
        })
        .catch(function (error) {
            alert(error.response.data);
        })
    }

    render(){
        return(
            <div className="container">
                <Modal
                    isOpen={true}
                    isModeless={false}
                    dragOptions={false}
                    className="popupModal"
                >
                    <h4 style={{marginBottom: "10%", textAlign: "center"}}>Add Content</h4>
                    <div className="container">
                        <div className="row" style={{ marginBottom: "5%" }}>
                            <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Title:</Label>
                            <TextField
                                className="col-md-10"
                                value={this.state.Title}
                                onChange={(ev, Title) => (this.setState({ Title }))}
                            // errorMessage={this.state.firstNameError}
                            />
                        </div>
                        <div style={{ marginBottom: "8%" }}>
                            <Label className="col-md-3" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Content:</Label>
                            <FormControl
                                type={"file"}
                                style={{ padding: "4px", marginBottom: "6px", width: "100%" }}
                                onChange={(event) => this.editOnChangeHandler(event, "multimedia")}
                                accept={"audio/*, video/*"}
                            />
                            {this.state.showProgress ?
                                this.state.percentComplete === 1 ?
                                    <label style={{ color: "green" }} >Upload Complete</label>
                                    :
                                    <ProgressIndicator barHeight={4} label="Upload Status" percentComplete={this.state.percentComplete} />
                                : null
                            }
                        </div>

                        <div className={"image-edit"} >
                        <Label className="col-md-4" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Thumbnail:</Label>
                            <span className="overlay_profile">
                                <i className="fa fa-plus upload-button"
                                    onClick={() => {
                                        this.upload.click();
                                    }} >
                                </i>
                            </span>
                            <Image
                                // className="profile-pic"
                                src={this.state.thumbnailPath ? this.state.thumbnailPath : ""}
                                thumbnail
                            />
                            <FormControl
                                aria-label="Image"
                                type={"file"}
                                ref={(ref) => (this.upload = ref)}
                                style={{ padding: "4px", marginBottom: "16px", width: "100%" }}
                                onChange={(event) => this.editOnChangeHandler(event, "image")}
                                accept={"image/*"}
                            />
                        </div>
                        

                         

                        {/* <div className="row" style={{marginBottom: "5%"}}>
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
                                onChange={(ev, email) => (this.setState({ email, emailError: "" }))}
                                errorMessage={this.state.emailError}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>Mobile:</Label>
                            <TextField
                                className="col-md-8"
                                errorMessage={this.state.mobileError}
                                value={this.state.mobile}
                                onChange={(ev, mobile) => (this.onMobileNoChange(ev, mobile))}
                            />
                        </div>

                        <div className="row" style={{marginBottom: "5%"}}>
                            <Label className="col-md-4" style={{paddingLeft: "0%", paddingRight: "0%", textAlign: "right"}}>City:</Label>
                            <TextField
                                className="col-md-8"
                                value={this.state.city}
                                onChange={(ev, city) => (this.setState({ city }))}
                            />
                        </div> */}

                        <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn" onClick={this.onAddEditContent}>
                                Add
                            </button>
                            {/* <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button> */}
                        </div> 
                    </div>
                </Modal>
            </div>
        )
    }
}