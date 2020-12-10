import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";


export default class FeaturedPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: []
        }
    }

    componentDidMount(){
        this.getFeaturedPlaylist();
    }

    getFeaturedPlaylist = () => {
        apiAxios.get("api/featured")
        .then((res)=>{
            this.setState({
                playlistItems: res.data.playlists
            })
        })
        .catch((res) => {
            console.log(res)
        })
    }

    onMoreClick = () =>{
        this.props.history.push('/FeaturedPlaylists');
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Featured Playlists
                            {this.state.playlistItems.length > 6 ?
                                <a onClick={this.onMoreClick}>More</a> : null}
                        </div>
                        <div>
                            {this.state.playlistItems.slice(0,6).map((data) => (
                                <div className="m-3">
                                    <CardTemplate
                                        history={this.props.history}
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