import React, { Component } from "react";
import Layout from "../Home/Layout";
import { FormControl, Image, Modal } from "react-bootstrap";
import DjProfile from './DjProfile';

export default class DjDashboard extends Component {

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-sm-2 offset-sm-1" style={{backgroundColor:'#252133'}}>
                        <DjProfile />
                    </div>
                    <div className="col-sm-8 ml-2 dj-play-list p-3">
                        <h4>My Portfolio</h4>
                        <div className="row">
                            <div className="col-sm-4">
                                <iframe width="100%" src="https://www.youtube.com/embed/s08gGZ3Tn_4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div className="col-sm-4">
                                <iframe width="100%" src="https://www.youtube.com/embed/tspNk3SwZ9s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div className="col-sm-4">
                                <iframe width="100%" src="https://www.youtube.com/embed/gCYcHz2k5x0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div className="col-sm-4">
                                <iframe width="100%" src="https://www.youtube.com/embed/7BG88HMRVUc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div className="col-sm-4">
                                <iframe width="100%" src="https://www.youtube.com/embed/rp31_j9knMI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <h4>My Spotify</h4>
                            </div>
                            <div className="col-sm-12">
                                <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="100%" height="220" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
