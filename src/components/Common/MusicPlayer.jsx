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
                    <div className="row text-center pb-2 loginBg" style={{ borderBottom: '1px solid #fff' }}>
                        <div className="col-md-12">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: 'black' }} onClick={() => { this.props.onDismiss() }}>
                                <span aria-hidden="true" style={{color:'#fff'}}>&times;</span>
                            </button>
                        </div>
                        
                        <div className="col-md-3">
                            <img src={this.props.thumbnail} />
                        </div>
                        <div className="col-md-7 text-left">
                            <h2><b>{this.props.title}</b></h2>
                            <h6><b><span style={{color:'#6eb1c2'}}>Subscription Cost:</span>Rs {this.props.price}</b></h6>
                            <h6><b><span style={{color:'#6eb1c2'}}>Duration:</span>58 mins</b></h6>
                        </div>
                        <span className="col-md-7 offset-md-3 text-left">
                            <h6><b><span style={{color:'#6eb1c2'}}>Play Sample:</span></b></h6>
                            <audio style={{ width: "100%" }} src={this.props.sampleContent} controls></audio>
                        </span>
                        <div className="col-md-12 text-right mt-3 mb-3">   
                            <button className="customBtn">Subscribe</button>
                        </div> 
                    </div>
                </Modal>
            </div>
        )
    }
}

