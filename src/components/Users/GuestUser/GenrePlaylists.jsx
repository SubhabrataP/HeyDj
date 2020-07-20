import React, { Component } from "react";
import Layout from "../../Home/Layout";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";
import CardTemplate from "../../Common/CardTemplate";


export default class GenrePlaylists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
            genreData: this.props.history.location.state.genreData ? this.props.history.location.state.genreData : ""
        }

    }

    componentDidMount() {
        this.getPlaylistByGenre();
    }

    getPlaylistByGenre = () => {
        apiAxios.get(
            "/api/playlist",
            {
                params: {
                    genre: this.state.genreData.id
                }
            }
        )
            .then((res) => {
                this.setState({
                    playlists: res.data.playlists
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="container" style={{ marginTop: "1%" }}>
                    <div className="row" style={{ paddingBottom: "10px" }}>
                        <h3>Playlists</h3>
                    </div>
                    <div className="row">
                        {this.state.playlists.map((data) => (
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
            </Layout >
        )
    }
}
