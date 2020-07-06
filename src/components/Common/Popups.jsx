import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";

export default class Popups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Modal
                    show={this.props.showModal}
                    className="ml-3 mr-3"
                >
                    <div className="row popupModal">
                        <div className="col-sm-12">
                            <div style={{ textAlign: "center", margin: "15px 0" }}>
                                {this.props.message ? this.props.message : ""}
                            </div>
                            <div style={{ textAlign: "center", margin: "15px 0" }}>
                                {this.props.secondaryMessage ? this.props.secondaryMessage : ""}
                            </div>
                            {this.props.isMultiButton === true ?
                                <div style={{ textAlign: "center", margin: "15px 0" }}>
                                    <button type="button" className="customBtn" onClick={()=>{this.props.button1Click()}}>
                                        {this.props.button1Text ?
                                            this.props.button1Text === "" ?
                                                "Ok" : this.props.button1Text : "Ok"}
                                    </button>
                                    <button type="button" className="customBtnWhite ml-4" onClick={() => { this.props.button2Click() }}>
                                        {this.props.button2Text ?
                                            this.props.button2Text === "" ?
                                                "Cancel" : this.props.button2Text : "Cancel"}
                                    </button>
                                </div> :
                                <div style={{ textAlign: "center", margin: "15px 0" }}>
                                    <button type="button" className="customBtn" onClick={() => { this.props.button1Click() }}>
                                        {this.props.button1Text ?
                                            this.props.button1Text === "" ?
                                                "Ok" : this.props.button1Text : "Ok"}
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}