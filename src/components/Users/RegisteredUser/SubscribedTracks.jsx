import React, { Component } from "react";
import CardTemplate from "../../Common/CardTemplate";
import { Modal } from "react-bootstrap";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";
import * as moment from "moment";

export default class SubscribedTracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      dateDetails: {},
      djName: "",
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.showAlert) {
      this.setState(
        {
          contents: nextProps.contents,
          dateDetails: nextProps.dateDetails,
        },
        () => {
          if (nextProps.type === "upcoming") {
            this.getDjName();
          }
        }
      );
    }
  }

  getDjName = () => {
    if (this.state.contents !== undefined) {
      apiAxios
        .get("api/user/" + this.state.contents.createdBy)
        .then((res) => {
          this.setState({
            djName: res.data.firstName + " " + res.data.lastName,
          });
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  onPlay = (url) => {
    this.props.playTrack();
  };

  render() {
    const isPlayable = !moment().isBefore(
      moment(this.state.dateDetails.startDate)
    );
    return (
      <React.Fragment>
        <Modal show={this.props.showAlert} className="ml-3 mr-3">
          <div className="row text-center pb-2 loginBg">
            <div
              className="col-md-12 text-center mb-2"
              style={{ borderBottom: "1px solid #fff" }}
            >
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  marginBottom: "2%",
                  textAlign: "right",
                  color: "#fff",
                }}
                onClick={() => {
                  this.props.onDismiss();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 style={{ margin: "2%", textAlign: "left", color: "#fff" }}>
                Playlist Details
              </h4>
            </div>
            {this.props.type === "current" ? (
              <div className="row text-center mb-2 ml-2">
                <div className="col-md-12 text-left">
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>Started At: </span>
                      {" " + this.state.dateDetails.startDate}
                    </b>
                  </h6>
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>Ends At: </span>
                      {" " + this.state.dateDetails.endDate}
                    </b>
                  </h6>
                </div>
                <div className="col-md-12 text-left mt-2">
                  <h3>
                    <b>Tracks: </b>
                  </h3>
                </div>
                <div className="col-md-12 text-left ml-2 mr-2">
                  {this.state.contents.map((data) => {
                    return (
                      <div className="row col-md-12 mb-4">
                        <img
                          className="mr-2"
                          style={{ height: "100px", width: "100px" }}
                          src={data.thumbnail}
                        />
                        <span>
                          <h6 className="col-md-12">
                            <b>
                              <span style={{ color: "#6eb1c2" }}>Title: </span>
                              {" " + data.title}
                            </b>
                          </h6>
                          <h6 className="col-md-12">
                            <b>
                              <span style={{ color: "#6eb1c2" }}>
                                Duration:{" "}
                              </span>
                              {" " + data.duration} mins
                            </b>
                          </h6>
                          <button
                            className="col-md-12 customBtn"
                            onClick={() => {
                              this.onPlay(data.content);
                            }}
                          >
                            Play
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="row text-center mb-2 ml-2">
                <div className="col-md-3">
                  <img src={this.state.contents.thumbnail} />
                </div>
                <div className="col-md-8 text-left">
                  <h3>
                    <b>{this.state.contents.title}</b>
                  </h3>
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>DJ Name: </span>
                      {this.state.djName}
                    </b>
                  </h6>
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>Starts At: </span>
                      {this.state.dateDetails.startDate}
                    </b>
                  </h6>
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>Ends At: </span>
                      {this.state.dateDetails.endDate}
                    </b>
                  </h6>
                </div>
                <span className="col-md-7 offset-md-3 text-left">
                  <h6>
                    <b>
                      <span style={{ color: "#6eb1c2" }}>Sample Track: </span>
                    </b>
                  </h6>
                  {this.state.contents.sampleType === "audio" ? (
                    <audio
                      style={{ width: "100%" }}
                      src={this.state.contents.sampleContent}
                      controls
                    ></audio>
                  ) : (
                    <video
                      style={{ height: "90%", width: "100%" }}
                      src={this.state.contents.sampleContent}
                      controls
                    ></video>
                  )}
                </span>
              </div>
            )}

            {}

            <button
              className="customBtn d-block mx-auto my-2 bg-light text-dark"
              disabled={!isPlayable}
              onClick={this.props.playAll}
            >
              {isPlayable ? "Play All" : "Playable Soon"}
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
