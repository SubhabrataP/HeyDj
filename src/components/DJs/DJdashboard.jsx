import React, { Component } from "react";
import Layout from "../Home/Layout";
import { FormControl, Image, Modal } from "react-bootstrap";

export default class DjDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history}>
                <div style={{ marginTop: "2%" }}>
                    <div className="col-sm-12">
                        <div className={"image-edit"} style={{ marginBottom: "3%", border: "solid 0.5px black" }}>
                            <span className="overlay_profile">
                                <i className="fa fa-plus upload-button"
                                    onClick={() => {
                                        this.upload.click();
                                    }} >
                                </i>
                            </span>
                            <Image
                                // className="profile-pic"
                                // src={this.state.profile_picture.value ? this.state.profile_picture.value : ""}
                                // roundedCircle
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
                    </div>
                </div>
            </Layout>
        )
    }
}