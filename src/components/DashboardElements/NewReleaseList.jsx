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
                <div className="col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            New Releases
                            <a onClick={this.onMoreClick}>More</a>
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