import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class AddEditPlayList extends Component {
    constructor(props) {
        super(props);

        this.state={
            title: ""
        }

        console.log(this.props.selectedContent)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps.selectedContent)
    }

    onDismiss = () => {
        this.props.onDismiss();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Modal
                        show={this.props.showModal}
                        // className="ml-3 mr-3"
                    >
                        <h4 style={{ marginBottom: "10%", textAlign: "left", color:'black'}}>Add Playlist</h4>
                        <div className="container">
                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Title:</Label>
                                <TextField
                                    className="col-md-10"
                                    value={this.state.Title}
                                    onChange={(ev, title) => (this.setState({ title }))}
                                // errorMessage={this.state.firstNameError}
                                />
                            </div>

                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Price:</Label>
                                <TextField
                                    className="col-md-5"
                                    value={this.state.Title}
                                    onChange={(ev, price) => (this.setState({ price }))}
                                // errorMessage={this.state.firstNameError}
                                />
                                <Label className="col-md-4" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>/per hour</Label>
                            </div>

                            <div style={{ marginBottom: "8%" }}>
                            <Label className="col-md-3" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Sample Preview:</Label>
                            <FormControl
                                type={"file"}
                                style={{ padding: "4px", marginBottom: "6px", width: "100%" }}
                                // onChange={(event) => this.editOnChangeHandler(event, "multimedia")}
                                accept={"audio/*, video/*"}
                            />
                            {/* {this.state.showProgress ?
                                this.state.percentComplete === 1 ?
                                    <label style={{ color: "green" }} >Upload Complete</label>
                                    :
                                    <ProgressIndicator barHeight={4} label="Upload Status" percentComplete={this.state.percentComplete} />
                                : null
                            } */}
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
                                    // src={this.state.thumbnail.path ? this.state.thumbnail.path : ""}
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

                            <div style={{ textAlign: "center", marginTop: "15px" }}>
                                <button type="button" className="btn" onClick={this.onAddEditContent}>
                                    Add
                            </button>
                                <button type="button" className="btn" onClick={() => { this.onDismiss() }}>Cancel</button>
                            </div>
                        </div>

                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}