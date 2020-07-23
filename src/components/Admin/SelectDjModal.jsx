import React, { Component } from "react";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import AddPlaylistModal from "./AddPlaylistModal"
import AddContentModal from "./AddContentModal"
import { Modal } from "react-bootstrap";

export class SelectDjModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            djs: [],
            selectedDjId: 0,
            showContentModal: false,
            showPlaylistModal: false,
            hideModal: this.props.showAlert
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var x = nextProps.djDetails.map((data) => {
            return {
                id: data.id,
                name: data.fullName
            }
        });

        this.setState({
            djs: x,
            selectedDjId: x[0].id
        })
    }

    onDropDownChange = (ev) => {
        this.setState({
            selectedDjId: ev.target.value
        })
    }

    onDismiss = () => {
        this.setState({
            djs: [],
            showPlaylistModal: false,
            showContentModal: false,
            hideModal: false
        })
        this.props.onDismiss();
    }

    onContinue = () => {
        if (this.props.type === "playlist") {
            this.setState({
                showPlaylistModal: true,
                showContentModal: false,
                hideModal: true
            })
        }

        if (this.props.type === "content") {
            this.setState({
                showPlaylistModal: false,
                showContentModal: true,
                hideModal: true
            })
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.hideModal ? null :
                    <Modal
                        show={this.props.showAlert}
                        className="ml-3 mr-3"
                    >
                        <div className="row popupModal">
                            <div className="col-sm-12 text-center mb-2" style={{ borderBottom: '1px solid #fff' }}>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: '#fff' }} onClick={() => { this.onDismiss() }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 style={{ margin: "2%", textAlign: "left", color: '#fff' }}>
                                    Select Dj
                            </h4>
                            </div>
                            <div className="col-sm-12">
                                <div className="row" style={{ marginBottom: "5%" }}>
                                    <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Djs:</Label>
                                    <select className="col-md-5"
                                        style={{ marginLeft: "15px" }}
                                        value={this.state.selectedDjId}
                                        onChange={(ev) => { this.onDropDownChange(ev) }}
                                    >
                                        {this.state.djs.map((data) => {
                                            return (
                                                <option value={data.id}>{data.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: "center", margin: "15px 0" }}>
                                <button type="button" className="customBtn" onClick={() => { this.onContinue() }} >
                                    Continue
                            </button>
                                <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onDismiss() }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>}
                {this.props.type === "playlist" ?
                    <AddPlaylistModal
                        showModal={this.state.showPlaylistModal}
                        onDismiss={() => (this.onDismiss())}
                        djId={this.state.selectedDjId}
                    /> : null}

                {this.props.type === "content" ?
                    <AddContentModal
                        showModal={this.state.showContentModal}
                        onDismiss={() => (this.onDismiss())}
                        djId={this.state.selectedDjId}
                    /> : null}
            </div>
        )
    }
}