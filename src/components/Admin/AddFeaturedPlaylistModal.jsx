import React, { Component } from "react";
//import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { Multiselect } from 'multiselect-react-dropdown';

export class AddFeaturedPlaylistModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
        }
    }

    getAllPlaylists = () => {

    }

    addFeaturedPlaylist = () => {
        apiAxios.get("api/admin/featured",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
            .then((res) => {
                this.getAllFeaturedPlaylist();
            })
            .catch((res) => { })
    }

    
    render() {
        return (
            <div className="container">
                {/* <Modal
                    show={this.props.showAlert}
                    className="ml-3 mr-3"
                >
                    <div className="row popupModal">
                        <div className="col-sm-12 text-center mb-2" style={{ borderBottom: '1px solid #fff' }}>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: '#fff' }} onClick={() => { this.onDismiss() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 style={{ margin: "2%", textAlign: "left", color: '#fff' }}>
                                {this.props.isAdd ? "Add Genre" : "Edit Genre"}
                            </h4>
                        </div>
                        <div className="col-sm-12">
                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Title:</Label>
                                <Multiselect
                                    options={this.state.playlists} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                        </div>
                        <div className="col-sm-12" style={{ textAlign: "center", margin: "15px 0" }}>
                            <button type="button" className="customBtn" onClick={() => { this.onAddEditGenre() }}>
                                {this.props.isAdd ? "Add" : "Update"}
                            </button>
                            <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onDismiss() }}>Cancel</button>
                        </div>
                    </div>
                </Modal> */}
            </div>
        )
    }
}