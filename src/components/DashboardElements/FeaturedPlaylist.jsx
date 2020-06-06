import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";


export default class FeaturedPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [1, 1, 1, 1, 1]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Featured Playlists
                            <button>More</button>
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