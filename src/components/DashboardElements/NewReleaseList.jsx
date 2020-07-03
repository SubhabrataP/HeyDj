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
                console.log(res)
                this.setState({
                    playlistItems: res.data.playlists,
                })
            })
            .catch(function (error) {
                alert(error.response);
            });
    }

    onMoreClick = () => {
        this.props.history.push('/NewReleases');
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            New Releases
                            {this.state.playlistItems.length > 6 ?
                                <a onClick={this.onMoreClick}>More</a> : null}
                        </div>
                        <div>
                            {this.state.playlistItems.slice(0,5).map((data) => (
                                <div className="col-md-3 m-3">
                                    <CardTemplate
                                        playlistData={data}
                                        type={"playlist"}
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