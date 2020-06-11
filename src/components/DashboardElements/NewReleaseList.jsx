import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import { withRouter } from "react-router";

class NewReleaseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        }
    }

    onMoreClick = () => {
        this.props.history.push('/NewReleases');
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div>
                        <div style={{ paddingBottom: "10px" }}>
                            New Releases
                            <button onClick={this.onMoreClick}>More</button>
                        </div>
                        <div>
                            {this.state.playlistItems.slice(0,5).map(() => (
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

export default withRouter(NewReleaseList)