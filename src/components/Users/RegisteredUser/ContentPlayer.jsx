import React, { Component } from "react";
import CardTemplate from "../../Common/CardTemplate";
import { Modal } from "react-bootstrap";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";

export default class ContentPlayer extends Component {

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.props.showAlert}
                    className="ml-3 mr-3"
                >
                    
                </Modal>
            </React.Fragment>
        )
    }
}
