import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Popups from "./Popups";
import TextField from "@material-ui/core/TextField";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import * as Constants from "./Constants";

import classes from './MusicPlayer.module.css';

let validRoles = ["user", "nightclub", null];

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubscribeClicked: false,
      subscribeLater: false,
      isLoggedIn: localStorage.getItem("Token") === null ? false : true,
      showAlert: false,
      alertMessage: "",
      subscriptionDateTime: "",
      selectedHours: 4,
      isPay: false,
      paymentDetails: "",
      djName: "",
      djCategory: {
        name: "",
        id: "",
      },
      buttonClick: true,
    };

    this.subscriptionHours = [
      { id: 1, name: 1 },
      { id: 4, name: 4 },
      { id: 8, name: 8 },
      { id: 12, name: 12 },
      { id: 24, name: 24 },
      { id: 36, name: 36 },
    ];
  }

  UNSAFE_componentWillReceiveProps() {
    this.getDjName();
  }

  componentDidMount() {
    if (localStorage.getItem("Role") == "nightclub") {
      this.getAccountTracker();
    }
  }

  getAccountTracker = () => {
    let account = localStorage.getItem("account");
    if (account) {
      let plan = JSON.parse(account).plan;
      let obj = {};
      plan.categories.forEach((element) => {
        obj[element.category] = element;
      });
      plan.categories = obj;
      this.setState({ plan });
    }
  };

  getDjName = () => {
    if (this.props.playlistData !== undefined) {
      apiAxios
        .get("api/user/" + this.props.playlistData.createdBy)
        .then((res) => {
          this.setState({
            djName: res.data.firstName + " " + res.data.lastName,
            djCategory: {
              name: res.data.category.name,
              id: res.data.category.id,
            },
          });
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  onSubscribe = (type) => {
    if (this.state.isLoggedIn) {
      if (type === "later") {
        let tempDate = new Date();
        let date =
          tempDate.getFullYear() +
          "-" +
          ("0" + (tempDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + tempDate.getDate()).slice(-2) +
          "T" +
          tempDate.getHours() +
          ":" +
          tempDate.getMinutes();
        this.setState({
          isSubscribeClicked: true,
          showAlert: false,
          alertMessage: "",
          subscriptionDateTime: date,
          subscribeLater: true,
        });
      } else if (type === "now") {
        let tempDate = new Date();
        let date =
          tempDate.getFullYear() +
          "-" +
          ("0" + (tempDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + tempDate.getDate()).slice(-2) +
          "T" +
          tempDate.getHours() +
          ":" +
          tempDate.getMinutes();
        this.setState({
          isSubscribeClicked: true,
          showAlert: false,
          alertMessage: "",
          subscriptionDateTime: date,
          subscribeLater: false,
        });
      }
    } else {
      this.setState({
        isSubscribeClicked: false,
        showAlert: true,
        alertMessage: "Please login first, to subscribe.",
      });
    }
  };

  alertOkClick = () => {
    this.setState({
      showAlert: false,
      alertMessage: "",
    });
  };

  onDateChange = (event) => {
    this.setState({
      subscriptionDateTime: event.target.value,
    });
  };

  onDropDownChange = (ev) => {
    this.setState({
      selectedHours: ev.target.value,
    });
  };

  onDismiss = () => {
    this.setState({
      isSubscribeClicked: false,
      subscribeLater: false,
      subscriptionDateTime: "",
      selectedHours: 4,
      isPay: false,
    });
    this.props.onDismiss();
  };

  onPaymentSuccess = () => {
    if (window.location.href.includes("/User/MySubscriptions")) {
      window.location.reload();
    } else {
      this.setState({
        isSubscribeClicked: false,
        showAlert: true,
        alertMessage: "Payment Success.",
      });
    }
  };

  continueToPay = () => {
    if (this.state.isPay) {
      let options = {
        key: Constants.PAY_KEY_ID,
        amount: this.state.paymentDetails.amount,
        name: this.props.playlistData.title,
        order_id: this.state.paymentDetails.id,
        handler: function (response) {
          this.onPaymentSuccess();
        }.bind(this),
        theme: {
          color: "#F37254",
        },
      };

      let rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      if (this.state.subscribeLater) {
        let dateTime = this.state.subscriptionDateTime.concat(":00+05:30");

        apiAxios
          .put(
            "/api/playlist/" + this.props.playlistData.id + "/subscribe?wallet=false",
            {
              hours: this.state.selectedHours,
              dateTime: dateTime,
            },
            {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            }
          )
          .then((res) => {
            this.setState({
              isPay: true,
              paymentDetails: res.data,
            });
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        apiAxios
          .put(
            "/api/playlist/" +
              this.props.playlistData.id +
              "/subscribe?now=true&wallet=false",
            {
              hours: this.state.selectedHours,
            },
            {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            }
          )
          .then((res) => {
            this.setState({
              isPay: true,
              paymentDetails: res.data,
            });
            console.log(this.state.paymentDetails);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  deductFromWallet = () => {
    apiAxios
      .put(
        "/api/playlist/" +
          this.props.playlistData.id +
          "/subscribe?now=true&wallet=true",
        {
          hours: this.state.selectedHours,
          category: this.state.djCategory.id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            showAlert: true,
            alertMessage: "You have successfully subscribed to this playlist!",
            redirect: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderBuyingOptions = () => {
    if (localStorage.getItem("Role") == "nightclub") {
      let shouldPay = false; //Should pay if total used hours >= total allowed hours
      let plan = { ...this.state.plan };
      let chosenCategory = plan.categories[this.state.djCategory.id];
      if (chosenCategory == undefined) {
        shouldPay = false;
      } else {
        if (chosenCategory.unlimited == true) shouldPay = false;
        if (!chosenCategory.used) chosenCategory.used = 0;
        if (
          Number(chosenCategory.used) + Number(this.state.selectedHours) >
          Number(chosenCategory.hours)
        ) {
          shouldPay = true;
        }

        console.log(
          Number(chosenCategory.used),
          Number(this.state.selectedHours),
          Number(chosenCategory.hours)
        );
        console.log("SHOULD PAY", shouldPay);
      }

      if (shouldPay == false) {
        return (
          <button
            className="customBtn"
            style={{ marginTop: "2%" }}
            onClick={() => {
              this.deductFromWallet();
            }}
          >
            Deduct from wallet
          </button>
        );
      } else {
        return (
          <button
            className="customBtn"
            style={{ marginTop: "2%" }}
            onClick={() => {
              this.continueToPay();
            }}
          >
            {this.state.isPay ? "Pay" : "Continue To Pay"}
          </button>
        );
      }
    } else {
      return (
        <button
          className="customBtn"
          style={{ marginTop: "2%" }}
          onClick={() => {
            this.continueToPay();
          }}
        >
          {this.state.isPay ? "Pay" : "Continue To Pay"}
        </button>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Modal show={this.props.showPlayer} className="ml-3 mr-3">
            <div
              className="row text-center pb-2 loginBg product-details-modal"
              style={{ borderBottom: "1px solid #fff" }}
            >
              <div className="col-md-12">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    marginBottom: "2%",
                    textAlign: "right",
                    color: "black",
                  }}
                  onClick={() => {
                    this.onDismiss();
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#fff" }}>
                    &times;
                  </span>
                </button>
              </div>

              <div className="col-md-3">
                <img src={this.props.playlistData.thumbnail} />
              </div>
              <div className="col-md-7 text-left">
                <h2>
                  <b>{this.props.playlistData.title}</b>
                </h2>
                <h6>
                  <b>
                    <span style={{ color: "#6eb1c2" }}>DJ Name: </span>
                    {this.state.djName}
                  </b>
                </h6>
                <h6>
                  <b>
                    <span style={{ color: "#6eb1c2" }}>DJ Category: </span>
                    {this.state.djCategory.name}
                  </b>
                </h6>
                <h6>
                  <b>
                    <span style={{ color: "#6eb1c2" }}>
                      Subscription Cost:{" "}
                    </span>
                    Rs {this.props.playlistData.price} <span> / hour </span>
                  </b>
                </h6>
                <h6>
                  <b>
                    <span style={{ color: "#6eb1c2" }}>Duration: </span>
                    {this.props.playlistData.duration
                      ? this.props.playlistData.duration
                      : "1"}{" "}
                    mins
                  </b>
                </h6>
              </div>
              <span className="col-md-7 offset-md-3 text-left">
                <h6>
                  <b>
                    <span style={{ color: "#6eb1c2" }}>Play Sample: </span>
                  </b>
                </h6>
                {this.props.playlistData.sampleType === "audio" ? (
                  <audio
                    style={{ width: "100%" }}
                    src={this.props.playlistData.sampleContent}
                    controls
                  ></audio>
                ) : (
                  <video
                    style={{ height: "90%", width: "100%" }}
                    src={this.props.playlistData.sampleContent}
                    controls
                  ></video>
                )}
              </span>
              {validRoles.includes(localStorage.getItem("Role")) ? (
                this.state.isSubscribeClicked ? (
                  <React.Fragment>
                    <div className="col-md-12 text-right mt-3 mb-3">
                      <div
                        className="col-md-12 text-left"
                        style={{ marginTop: "15px" }}
                      >
                        {this.state.isPay ? (
                          <React.Fragment>
                            <h5>Payment Details</h5>
                            <h6>
                              <b>
                                <span style={{ color: "#6eb1c2" }}>
                                  Total Amount:{" "}
                                </span>
                                {this.state.paymentDetails.currency +
                                  " " +
                                  this.state.paymentDetails.amount / 100}
                              </b>
                            </h6>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <h5>Subscription Details</h5>
                            {localStorage.getItem("Role") == "nightclub" && (
                              <h6>
                                <b>
                                  <span style={{ color: "#6eb1c2" }}>
                                    Your Remaining Hours:{" "}
                                  </span>
                                  {this.state?.plan?.categories[
                                    this.state.djCategory.id
                                  ].unlimited == true
                                    ? "Unlimited"
                                    : Number(
                                        this.state?.plan?.categories[
                                          this.state.djCategory.id
                                        ].hours
                                      ) -
                                      Number(
                                        this.state?.plan?.categories[
                                          this.state.djCategory.id
                                        ].used || 0
                                      )}
                                  <span style={{ color: "white" }}> Hours</span>
                                </b>
                              </h6>
                            )}
                            {this.state.subscribeLater ? (
                              <h6>
                                <b>
                                  <span style={{ color: "#6eb1c2" }}>
                                    From:{" "}
                                  </span>
                                  <TextField
                                    id="datetime-local"
                                    type="datetime-local"
                                    defaultValue={
                                      this.state.subscriptionDateTime
                                    }
                                    style={{
                                      background: "#fff",
                                      height: "100%",
                                      marginLeft: "15px",
                                    }}
                                    onChange={(ev) => {
                                      this.onDateChange(ev);
                                    }}
                                  />
                                </b>
                              </h6>
                            ) : null}
                            <h6>
                              <b>
                                <span style={{ color: "#6eb1c2" }}>
                                  Duration:{" "}
                                </span>
                                <select
                                  className="col-md-2"
                                  style={{ marginLeft: "15px" }}
                                  value={this.state.selectedHours}
                                  onChange={(ev) => {
                                    this.onDropDownChange(ev);
                                  }}
                                >
                                  {this.subscriptionHours.map((data) => {
                                    return (
                                      <option value={data.id}>
                                        {data.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <span
                                  style={{ marginLeft: "15px", color: "white" }}
                                >
                                  {" "}
                                  Hours
                                </span>
                              </b>
                            </h6>
                          </React.Fragment>
                        )}
                      </div>

                      {this.renderBuyingOptions()}
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="col-md-12 text-right mt-3 mb-3">
                    <button
                      className="customBtn"
                      disabled={this.state.showAlert}
                      onClick={() => {
                        this.onSubscribe("now");
                      }}
                    >
                      Subscribe Now
                    </button>
                    <button
                      className="customBtn"
                      disabled={this.state.showAlert}
                      onClick={() => {
                        this.onSubscribe("later");
                      }}
                    >
                      Subscribe Later
                    </button>
                  </div>
                )
              ) : null}
            </div>
          </Modal>
        </div>
        <Popups
          showModal={this.state.showAlert}
          message={this.state.alertMessage}
          isMultiButton={false}
          button1Click={
            this.state.redirect == true
              ? () => {
                  this.props.history.push("/nightclub/MySubscriptions");
                }
              : () => {
                  this.alertOkClick();
                }
          }
        />
      </React.Fragment>
    );
  }
}
