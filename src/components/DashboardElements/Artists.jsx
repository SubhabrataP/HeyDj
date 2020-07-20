import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";


export default class Artists extends Component {
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
            "/api/user/dj"
        )
            .then((res) => {
                this.setState({
                    playlistItems: res.data.djs,
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    onMoreClick = () => {
        this.props.history.push('/Artists');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Artists
                            {this.state.playlistItems.length > 6 ?
                                <a onClick={this.onMoreClick}>More</a> : null}
                        </div>
                        <div className="row">
                            {this.state.playlistItems.slice(0,6).map((data) => (
                                <div className="col-md-3 m-3">
                                    <CardTemplate
                                        playlistData={data}
                                        type={"artist"}
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