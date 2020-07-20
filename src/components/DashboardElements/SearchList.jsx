import React, { Component } from "react";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import CardTemplate from "../Common/CardTemplate";

export default class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [],
            filteredPlaylist: [],
            playlistsPerPage: 10,
            artists: [],
            filteredArtists: [],
            artistsPerPage: 10,
            genres: [],
            filteredGenres: [],
            genresPerPage: 10,
            searchKey: this.props.history.location.state.serachKey ? this.props.history.location.state.serachKey : ""
        }

        this.getPlaylist();
        this.getArtists();
        this.getGenres();
    }

    UNSAFE_componentWillReceiveProps() {
        this.getPlaylist();
        this.getArtists();
        this.getGenres();
        this.setState({
            searchKey: this.props.history.location.state.serachKey
        })
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
                }, () => {
                    this.setState({
                        filteredPlaylist: this.state.playlistItems.filter(x => x.title.toLowerCase().includes(this.state.searchKey.toLowerCase()))
                    })
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    getArtists = () => {
        apiAxios.get(
            "/api/user/dj"
        )
            .then((res) => {
                this.setState({
                    artists: res.data.djs,
                }, () => {
                    this.setState({
                        filteredArtists: this.state.artists.filter(x => x.firstName.toLowerCase().includes(this.state.searchKey.toLowerCase()))
                    })
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    getGenres = () => {
        apiAxios.get(
            "/api/genre"
        )
            .then((res) => {
                this.setState({
                    genres: res.data.genres,
                }, () => {
                    this.setState({
                        filteredGenres: this.state.genres.filter(x => x.name.toLowerCase().includes(this.state.searchKey.toLowerCase()))
                    })
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    onLoadMore = (type) => {
        if (type === "playlist") {
            this.setState({
                playlistsPerPage: this.state.playlistsPerPage + 5
            })
        }
        else if (type === "artist") {
            this.setState({
                artistsPerPage: this.state.artistsPerPage + 5
            })
        }
        else if (type === "genre") {
            this.setState({
                genresPerPage: this.state.genresPerPage + 5
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div style={{ marginBottom: "1%" }}>
                            Results for "{this.state.searchKey}"
                        </div>

                        {this.state.filteredPlaylist.length > 0 ?
                            <div style={{ marginBottom: "5%" }}>
                                <div className="row" style={{ paddingBottom: "10px" }}>
                                    <h3>Playlists</h3>
                                </div>
                                <div className="row" >
                                    {this.state.filteredPlaylist.slice(0, this.state.playlistsPerPage).map((data) => (
                                        <div className="col-md-2 m-3">
                                            <CardTemplate
                                                playlistData={data}
                                                type={"playlist"}
                                                history={this.props.history}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {this.state.filteredPlaylist.length > this.state.playlistsPerPage
                                    ? <button onClick={() => {this.onLoadMore("playlist")}}>Load More</button>
                                    : null}
                            </div> : null}

                            {this.state.filteredArtists.length > 0 ?
                            <div style={{ marginBottom: "5%" }}>
                                <div className="row" style={{ paddingBottom: "10px" }}>
                                    <h3>Artists</h3>
                                </div>
                                <div className="row" >
                                    {this.state.filteredArtists.slice(0, this.state.artistsPerPage).map((data) => (
                                        <div className="col-md-2 m-3">
                                            <CardTemplate
                                                playlistData={data}
                                                type={"artist"}
                                                history={this.props.history}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {this.state.filteredArtists.length > this.state.artistsPerPage
                                    ? <button onClick={() => {this.onLoadMore("artist")}}>Load More</button>
                                    : null}
                            </div> : null}

                            {this.state.filteredGenres.length > 0 ?
                            <div style={{ marginBottom: "5%" }}>
                                <div className="row" style={{ paddingBottom: "10px" }}>
                                    <h3>Genres</h3>
                                </div>
                                <div className="row" >
                                    {this.state.filteredGenres.slice(0, this.state.genresPerPage).map((data) => (
                                        <div className="col-md-2 m-3">
                                            <CardTemplate
                                                playlistData={data}
                                                type={"genre"}
                                                history={this.props.history}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {this.state.filteredGenres.length > this.state.genresPerPage
                                    ? <button onClick={() => {this.onLoadMore("genre")}}>Load More</button>
                                    : null}
                            </div> : null}
                    </div>
                </Layout>
            </React.Fragment>
        )
    }
}