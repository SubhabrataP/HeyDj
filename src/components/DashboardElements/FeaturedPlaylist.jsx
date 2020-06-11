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
                <div className="container">
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Featured Playlists
                            <button onClick={this.onMoreClick}>More</button>
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