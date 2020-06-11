import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import Layout from "../Home/Layout";


export default class NewReleaseFullPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistItems: [1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            itemsPerPage: 20,
        }
    }

    onLoadMore = () => {
        this.setState({
            itemsPerPage: this.state.itemsPerPage + 5
        })
    }

    render() {
        return (
            <Layout>
                <div className="container" style={{ marginTop: "1%" }}>
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            New Releases
                        </div>
                        <div className="row" >
                            {this.state.playlistItems.slice(0,this.state.itemsPerPage).map(() => (
                                <div style={{ paddingRight: "15px", paddingBottom: "15px" }}>
                                    <CardTemplate />
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