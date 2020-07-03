import React, { Component } from "react";
import { Modal } from "react-bootstrap";


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Modal
                    show={this.props.showPlayer}
                    className="ml-3 mr-3"
                >
                    <div className="col-sm-12 text-center mb-2" style={{ borderBottom: '1px solid #fff' }}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: 'black' }} onClick={() => { this.props.onDismiss() }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <audio style={{ width: "100%" }} src={this.props.sampleContent} controls></audio>
                    </div>
                </Modal>
            </div>
        )
    }
}

