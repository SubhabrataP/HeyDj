import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import { withRouter } from "react-router";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

class NewReleaseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: []
        }
    }

    componentDidMount(){
        this.getPlaylist();
    }

    getPlaylist = () => {
        apiAxios.get(
            "/api/playlist",
            {
                params: {
                    all: "true"
                }
            }
        )
            .then((res) => {
                this.setState({
                    playlistItems: res.data.playlists,
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    onMoreClick = () => {
        this.props.history.push('/AllPlaylists');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row2 col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Playlists
                            {this.state.playlistItems.length > 6 ?
                                <a onClick={this.onMoreClick}>More</a> : null}
                        </div>
                        <div className="row">
                            {this.state.playlistItems.slice(0,6).map((data) => (
                                <div className="col-md-3 m-3">
                                    <CardTemplate
                                        playlistData={data}
                                        type={"playlist"}
                                        history={this.props.history}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(NewReleaseList)