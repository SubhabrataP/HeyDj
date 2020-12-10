import React, { Component } from "react";

import MusicPlayer from "./MusicPlayer";

export default class CardTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playMusic: false,
    };
  }

  cardClicked = () => {
    if (this.props.type === "playlist") {
      this.setState({
        playMusic: true,
      });
    } else if (this.props.type === "artist") {
      this.props.history.push({
        pathname: `/Profile/${this.props.playlistData.firstName}`,
        state: { djDetails: this.props.playlistData },
      });
    } else if (this.props.type === "genre") {
      this.props.history.push({
        pathname: `/Genre/${this.props.playlistData.name}`,
        state: { genreData: this.props.playlistData },
      });
    } else {
      this.setState({
        playMusic: false,
      });
    }
  };

  onDismiss = () => {
    this.setState({
      playMusic: false,
    });
  };

  render() {
    return (
      <React.Fragment>
     
          <div
            aria-label="Clickable vertical card with image bleeding at the top of the card"
            onClick={() => {
              this.cardClicked();
            }}
            className={this.props.type === "genre" ? "" : "cardBorder"}
          >
            {this.props.type === "playlist" ? (
              <React.Fragment>
                <img
                  className="w-100"
                  style={{ height: "220px" }}
                  src={
                    this.props.playlistData.thumbnail === undefined
                      ? process.env.PUBLIC_URL + "/images/playlist-5.png"
                      : this.props.playlistData.thumbnail
                  }
                  alt="playlist-5"
                />
                <div className="overlayCard m-0 w-100">
                  <div className="textCard text-left">
                    <h5>
                      {this.props.playlistData.title === undefined
                        ? "test"
                        : this.props.playlistData.title}
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            ) : this.props.type === "genre" ? (
              <React.Fragment>
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100px",
                  }}
                  src={process.env.PUBLIC_URL + "/images/genre background.jpg"}
                  alt="image"
                />
                <div>
                  <div className="textCard">
                    <h5>
                      {this.props.playlistData.name === undefined
                        ? "test"
                        : this.props.playlistData.name}
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img
                  className="w-100"
                  style={{ height: "220px" }}
                  src={
                    this.props.playlistData.profileImage === undefined ||
                    this.props.playlistData.profileImage === "undefined"
                      ? process.env.PUBLIC_URL + "/images/emptyUser.png"
                      : this.props.playlistData.profileImage
                  }
                  alt="Profile_Image"
                />
                <div className="overlayCard m-0 w-100">
                  <div className="textCard text-left">
                    <h5>
                      {this.props.playlistData.firstName +
                        " " +
                        this.props.playlistData.lastName}
                    </h5>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        {this.props.type === "playlist" ? (
          <MusicPlayer
            history={this.props.history}
            showPlayer={this.state.playMusic}
            playlistData={this.props.playlistData}
            onDismiss={() => {
              this.onDismiss();
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
