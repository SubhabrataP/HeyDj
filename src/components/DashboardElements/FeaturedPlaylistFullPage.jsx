import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";


export default class FeaturedPlaylistFullPage extends Component {
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
            .catch(function (error) {
                alert(error.response);
            });
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="container" style={{ marginTop: "1%" }}>
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Featured Playlists
                        </div>
                        <div className="row" >
                            {this.state.playlistItems.map((data) => (
                                <div className="col-md-2 m-3">
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
            </Layout>
        )
    }
}