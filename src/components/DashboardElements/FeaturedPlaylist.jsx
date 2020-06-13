import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";


export default class FeaturedPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [1, 1, 1, 1, 1]
        }
    }

    onMoreClick = () =>{
        this.props.history.push('/FeaturedPlaylists');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Featured Playlists
                            <a onClick={this.onMoreClick}>More</a>
                        </div>
                        <div className="row">
                            {this.state.playlistItems.map(() => (
                                <div style={{ paddingRight: "15px", paddingBottom: "15px" }}>
                                    <CardTemplate />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}