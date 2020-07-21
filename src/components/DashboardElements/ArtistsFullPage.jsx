import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";


export default class ArtistsFullPage extends Component {
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
            .catch((error) => {
                console.log(error.response);
            });
    }

    onLoadMore = () => {
        this.setState({
            itemsPerPage: this.state.itemsPerPage + 5
        })
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="container" style={{ marginTop: "1%" }}>
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            <h3>Artists</h3>
                        </div>
                        <div className="row" >
                            {this.state.playlistItems.slice(0,this.state.itemsPerPage).map((data) => (
                                <div className="col-md-2 m-3">
                                     <CardTemplate
                                        playlistData={data}
                                        type={"artist"}
                                        history={this.props.history}
                                    />
                                </div>
                            ))}
                        </div>
                        {this.state.playlistItems.length > this.state.itemsPerPage
                            ? <button onClick={this.onLoadMore}>Load More</button>
                            : null}
                    </div>
                </div>
            </Layout>
        )
    }
}