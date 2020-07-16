import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Popups from './Popups';
import TextField from '@material-ui/core/TextField';


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubscribeClicked: false,
            isLoggedIn: localStorage.getItem('Token') === null ? false : true,
            showAlert: false,
            alertMessage: "",
            subscriptionDateTime: ""
        }
    }

    onSubscribe = () => {
        let tempDate = new Date();
        let date = tempDate.getFullYear() + '-' + ("0" + (tempDate.getMonth() + 1)).slice(-2) + '-' + ("0" + tempDate.getDate()).slice(-2) +'T'+ tempDate.getHours()+':'+ tempDate.getMinutes();
        if (this.state.isLoggedIn) {
            this.setState({
                isSubscribeClicked: true,
                showAlert: false,
                alertMessage: "",
                subscriptionDateTime: date
            })
        }
        else {
            this.setState({
                isSubscribeClicked: false,
                showAlert: true,
                alertMessage: "Please login first, to subscribe."
            })
        }
    }

    alertOkClick = () => {
        this.setState({
            showAlert: false,
            alertMessage: ""
        })
    }

    onDateChange = (event) => {
        this.setState({
            subscriptionDateTime: event.target.value
        })
    }

    onDismiss = () => {
        this.setState({
            isSubscribeClicked: false
        })
        this.props.onDismiss();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" >
                    <Modal
                        show={this.props.showPlayer}
                        className="ml-3 mr-3"
                    >
                        <div className="row text-center pb-2 loginBg" style={{ borderBottom: '1px solid #fff' }}>
                            <div className="col-md-12">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: 'black' }} onClick={() => { this.onDismiss() }}>
                                    <span aria-hidden="true" style={{ color: '#fff' }}>&times;</span>
                                </button>
                            </div>

                            <div className="col-md-3">
                                <img src={this.props.playlistData.thumbnail} />
                            </div>
                            <div className="col-md-7 text-left">
                                <h2><b>{this.props.playlistData.title}</b></h2>
                                <h6><b><span style={{ color: '#6eb1c2' }}>Subscription Cost: </span>Rs {this.props.playlistData.price}</b></h6>
                                <h6><b><span style={{ color: '#6eb1c2' }}>Duration: </span>58 mins</b></h6>
                            </div>
                            <span className="col-md-7 offset-md-3 text-left">
                                <h6><b><span style={{ color: '#6eb1c2' }}>Play Sample: </span></b></h6>
                                {this.props.playlistData.sampleType === "audio" ?
                                    <audio style={{ width: "100%" }} src={this.props.playlistData.sampleContent} controls></audio>
                                    :
                                    <video style={{ height: "90%", width: "100%" }} src={this.props.playlistData.sampleContent} controls></video>}
                            </span>
                            {this.state.isSubscribeClicked ?
                                <React.Fragment>
                                    <div className="col-md-12 text-right mt-3 mb-3">
                                        <div className="col-md-12 text-left">
                                            <h5>Subscription Details</h5>
                                            <h6><b>
                                                <span style={{ color: '#6eb1c2' }}>From: </span>
                                                <TextField
                                                    id="datetime-local"
                                                    type="datetime-local"
                                                    defaultValue={this.state.subscriptionDateTime}
                                                    style={{background: "#fff", height: "100%"}}
                                                    onChange={(ev) => { this.onDateChange(ev) }}
                                                    // className={classes.textField}
                                                    // InputLabelProps={{
                                                    //     shrink: true,
                                                    // }}
                                                />
                                            </b></h6>
                                            <h6><b>
                                                <span style={{ color: '#6eb1c2' }}>Duration: </span>
                                            </b></h6>
                                        </div>
                                        
                                        <button className="customBtn" style={{marginTop: "2%"}}>Continue To Pay</button>
                                    </div>
                                </React.Fragment>
                                :
                                <div className="col-md-12 text-right mt-3 mb-3">
                                    <button className="customBtn" disabled={this.state.showAlert} onClick={() => { this.onSubscribe() }}>Subscribe</button>
                                </div>}
                        </div>
                    </Modal>
                </div>
                <Popups
                    showModal={this.state.showAlert}
                    message={this.state.alertMessage}
                    isMultiButton={false}
                    button1Click={() => { this.alertOkClick() }}
                />
            </React.Fragment>
        )
    }
}

