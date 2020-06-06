import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";


export default class NewReleaseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [1, 1, 1, 1]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div>
                        <div style={{ paddingBottom: "10px" }}>
                            New Releases
                            <button>More</button>
                        </div>
                        <div>
                            {this.state.playlistItems.map(() => (
                                <div style={{ paddingBottom: "15px" }}>
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