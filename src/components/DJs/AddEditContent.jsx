import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
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
            thumbnail: {
                path: "",
                value: ""
            },
            content: "",
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
                console.log(file);
                if (type === "image") {
                    let image = {
                        path: reader.result,
                        value: file
                    }
                    this.setState({
                        thumbnail: image,
                    });
                }
                else if (type === "multimedia") {
                    this.setState({
                        content: file,
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
        var bodyFormData = new FormData();
        bodyFormData.set('title', this.state.Title);
        bodyFormData.append('thumbnail', this.state.thumbnail.value);
        bodyFormData.append('content', this.state.content);

        apiAxios.post('/api/dj/content', bodyFormData, {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((response) => {
            this.onDismiss();
            console.log(response)
        })
        .catch(function (error) {
            console.log(error.response);
        })
    }

    onDismiss = () => {
        this.props.onDismiss();
    }

    render(){
        return(
            <div className="container">
                <Modal
                    show={this.props.showModal}
                    className="ml-3 mr-3"
                >
                    <h4 style={{marginBottom: "10%", textAlign: "center", color:'black'}}>Add Content</h4>
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
                                src={this.state.thumbnail.path ? this.state.thumbnail.path : ""}
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
                        
                        <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn" onClick={this.onAddEditContent}>
                                Add
                            </button>
                            <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                        </div> 
                    </div>
                </Modal>
            </div>
        )
    }
}