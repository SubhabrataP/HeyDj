import React, { Component } from "react";
import Layout from "../Home/Layout";
import { FormControl, Image, Modal } from "react-bootstrap";
import DjProfile from './DjProfile';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class DjDashboard extends Component {
    constructor(props){
        super(props);

        this.state={
            portfolioVideos: [],
            url: "",
            urlError: "",
            spotifyUrl: "",
            spotifyData: "",
            spotifyError: ""
        }
    }

    onAddUrl = () => {
        if (this.state.url.trim().length < 1) {
            this.setState({
                urlError: "Enter a valid URL."
            })
        }
        else {
            this.state.portfolioVideos.push(this.state.url);
            this.setState({
                url: "",
                urlError: ""
            })
        }
    }

    onRemoveUrl = (url) => {
        this.setState({
            portfolioVideos: this.state.portfolioVideos.filter(x => x !== url)
        })
    }

    onAddSpotify = () => {
        if (this.state.spotifyUrl.trim().length < 1) {
            this.setState({
                spotifyError: "Enter a valid URL."
            })
        }
        else {
            this.setState({
                spotifyData: this.state.spotifyUrl,
                spotifyUrl: "",
                spotifyError: ""
            })
        }
    }

    onRemoveSpotifyUrl = () => {
        this.setState({
            spotifyData: "",
            spotifyUrl: "",
            spotifyError: ""
        })
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-sm-2 offset-sm-1" style={{backgroundColor:'#252133'}}>
                        <DjProfile />
                    </div>
                    <div className="col-sm-8 ml-2 dj-play-list p-3">
                        <h4>My Portfolio</h4>
                        <div className="row col-sm-12" style={{ marginBottom: "2%"}} >
                            <Label style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '15px' }}>Enter Video Url : </Label>
                            <TextField
                                className="col-md-6"
                                value={this.state.url}
                                onChange={(ev, url) => (this.setState({ url, urlError: "" }))}
                                errorMessage={this.state.urlError}
                            />
                            <button type="button" className="customBtn" onClick={() => { this.onAddUrl() }}>Add</button>
                        </div>
                        <div className="row" style={{ marginBottom: "2%"}}>
                            {this.state.portfolioVideos.map((data) => (
                                <div className="col-sm-4" style={{ marginBottom: "2%"}}>
                                    <iframe width="100%" src={data} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                    <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onRemoveUrl(data) }}>Remove</button>
                                </div>
                            ))}
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <h4>My Spotify</h4>
                            </div>
                            <div className="col-sm-12">
                                {this.state.spotifyData === "" ?
                                    <div className="row col-sm-12" style={{ marginBottom: "2%" }} >
                                        <Label style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '15px' }}>Enter Spotify Url : </Label>
                                        <TextField
                                            className="col-md-6"
                                            value={this.state.spotifyUrl}
                                            onChange={(ev, spotifyUrl) => (this.setState({ spotifyUrl, spotifyError: "" }))}
                                            errorMessage={this.state.spotifyError}
                                        />
                                        <button type="button" className="customBtn" onClick={() => { this.onAddSpotify() }}>Add</button>
                                    </div>
                                    :
                                    <div className="row" style={{ marginBottom: "2%" }}>
                                        <div className="col-sm-12" style={{ marginBottom: "2%" }}>
                                            <iframe src={this.state.spotifyData} width="100%" height="220" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                            <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onRemoveSpotifyUrl() }}>Remove</button>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
