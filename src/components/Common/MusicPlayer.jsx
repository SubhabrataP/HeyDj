import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Popups from './Popups';
import TextField from '@material-ui/core/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import * as Constants from "./Constants";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubscribeClicked: false,
            subscribeLater: false,
            isLoggedIn: localStorage.getItem('Token') === null ? false : true,
            showAlert: false,
            alertMessage: "",
            subscriptionDateTime: "",
            selectedHours: 4,
            isPay: false,
            paymentDetails: ""
        }

        this.subscriptionHours = [
            { id: 4, name: 4 },
            { id: 8, name: 8 },
            { id: 12, name: 12 },
            { id: 24, name: 24 }
        ];
    }

    onSubscribe = (type) => {
        if (this.state.isLoggedIn) {
            if (type === "later") {
                let tempDate = new Date();
                let date = tempDate.getFullYear() + '-' + ("0" + (tempDate.getMonth() + 1)).slice(-2) + '-' + ("0" + tempDate.getDate()).slice(-2) + 'T' + tempDate.getHours() + ':' + tempDate.getMinutes();
                this.setState({
                    isSubscribeClicked: true,
                    showAlert: false,
                    alertMessage: "",
                    subscriptionDateTime: date,
                    subscribeLater: true
                })
            }
            else if (type === "now") {
                let tempDate = new Date();
                let date = tempDate.getFullYear() + '-' + ("0" + (tempDate.getMonth() + 1)).slice(-2) + '-' + ("0" + tempDate.getDate()).slice(-2) + 'T' + tempDate.getHours() + ':' + tempDate.getMinutes();
                this.setState({
                    isSubscribeClicked: true,
                    showAlert: false,
                    alertMessage: "",
                    subscriptionDateTime: date,
                    subscribeLater: false
                })
            }
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

    onDropDownChange = (ev) => {
        this.setState({
            selectedHours: ev.target.value
        })
    }

    onDismiss = () => {
        this.setState({
            isSubscribeClicked: false,
            subscribeLater: false,
            subscriptionDateTime: "",
            selectedHours: 4,
            isPay: false
        })
        this.props.onDismiss();
    }

    continueToPay = () => {
        if (this.state.isPay) {
            let options = {
                "key": Constants.PAY_KEY_ID,
                "amount": this.state.paymentDetails.amount,
                "name": "this.props.playlistData.title",
                "order_id": this.state.paymentDetails.id,
                "handler": function (response) {
                    alert(response.razorpay_payment_id);
                },
                "theme": {
                    "color": "#F37254"
                }
            };

            let rzp = new window.Razorpay(options);
            rzp.open();
        }
        else {
            if (this.state.subscribeLater) {
                apiAxios.put('/api/playlist/' + this.props.playlistData.id + '/subscribe',
                    {
                        "hours": this.state.selectedHours,
                        "dateTime": this.state.subscriptionDateTime
                    },
                    {
                        headers: {
                            'Authorization': localStorage.getItem('Token')
                        },
                    })
                    .then((res) => {
                        this.setState({
                            isPay: true,
                            paymentDetails: res.data
                        })
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                apiAxios.put('/api/playlist/' + this.props.playlistData.id + '/subscribe?now=true',
                    {
                        "hours": this.state.selectedHours
                    },
                    {
                        headers: {
                            'Authorization': localStorage.getItem('Token')
                        },
                    })
                    .then((res) => {
                        this.setState({
                            isPay: true,
                            paymentDetails: res.data
                        })
                        console.log(this.state.paymentDetails)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
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
                                <h6><b><span style={{ color: '#6eb1c2' }}>Duration: </span>
                                    {this.props.playlistData.duration ? this.props.playlistData.duration : "1"} mins
                                </b></h6>
                            </div>
                            <span className="col-md-7 offset-md-3 text-left">
                                <h6><b><span style={{ color: '#6eb1c2' }}>Play Sample: </span></b></h6>
                                {this.props.playlistData.sampleType === "audio" ?
                                    <audio style={{ width: "100%" }} src={this.props.playlistData.sampleContent} controls></audio>
                                    :
                                    <video style={{ height: "90%", width: "100%" }} src={this.props.playlistData.sampleContent} controls></video>}
                            </span>
                            {localStorage.getItem('Role') === "user" ?
                                this.state.isSubscribeClicked ?
                                    <React.Fragment>
                                        <div className="col-md-12 text-right mt-3 mb-3">
                                            <div className="col-md-12 text-left" style={{ marginTop: "15px" }}>
                                                {this.state.isPay ?
                                                    <React.Fragment>
                                                        <h5>Payment Details</h5>
                                                        <h6><b>
                                                            <span style={{ color: '#6eb1c2' }}>Total Amount: </span>
                                                            {this.state.paymentDetails.currency + " " + (this.state.paymentDetails.amount / 100)}
                                                        </b></h6>
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <h5>Subscription Details</h5>
                                                        {this.state.subscribeLater ?
                                                            <h6><b>
                                                                <span style={{ color: '#6eb1c2' }}>From: </span>
                                                                <TextField
                                                                    id="datetime-local"
                                                                    type="datetime-local"
                                                                    defaultValue={this.state.subscriptionDateTime}
                                                                    style={{ background: "#fff", height: "100%", marginLeft: "15px" }}
                                                                    onChange={(ev) => { this.onDateChange(ev) }}
                                                                />
                                                            </b></h6> : null}
                                                        <h6><b>
                                                            <span style={{ color: '#6eb1c2' }}>Duration: </span>
                                                            <select className="col-md-2"
                                                                style={{ marginLeft: "15px" }}
                                                                value={this.state.selectedHours}
                                                                onChange={(ev) => { this.onDropDownChange(ev) }}>
                                                                {this.subscriptionHours.map((data) => {
                                                                    return (
                                                                        <option value={data.id}>{data.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <span style={{ marginLeft: "15px", color: 'white' }}> Hours</span>
                                                        </b></h6>
                                                    </React.Fragment>
                                                }
                                            </div>

                                            <button className="customBtn" style={{ marginTop: "2%" }} onClick={() => { this.continueToPay() }}>
                                                {this.state.isPay ? "Pay" : "Continue To Pay"}
                                            </button>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className="col-md-12 text-right mt-3 mb-3">
                                        <button className="customBtn" disabled={this.state.showAlert} onClick={() => { this.onSubscribe("now") }}>Subscribe Now</button>
                                        <button className="customBtn" disabled={this.state.showAlert} onClick={() => { this.onSubscribe("later") }}>Subscribe Later</button>
                                    </div>
                                : null
                            }
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

