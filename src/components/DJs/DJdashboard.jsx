import React, { Component } from "react";
import Layout from "../Home/Layout";
import { FormControl, Image, Modal } from "react-bootstrap";
import DjProfile from './DjProfile';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import ReactPlayer from 'react-player'

export default class DjDashboard extends Component {
    constructor(props){
        super(props);

        this.state={

            videoUrl: "",
            videoUrlError: "",
            spotifyUrl: "",
            spotifyUrlError: "",
            portfolioData: {
                id: "",
                spotify: "",
                videoUrls: []
            }
        }
    }

    componentDidMount(){
        this.getDjPortfolio();
    }

    getDjPortfolio = () => {
        apiAxios.get(
            "/api/dj/portfolio",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    if (res.data.spotify) {
                        if (res.data.spotify.indexOf('https://open.spotify.com/embed/') === -1) {
                            if (res.data.spotify.includes('https://open.spotify.com/')) {
                                res.data.spotify = res.data.spotify.replace('https://open.spotify.com/', 'https://open.spotify.com/embed/');
                            }
                        }
                    }
                    this.setState({
                        portfolioData: res.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onAddUrl = (type) => {
        let data = {};

        if(type === "video"){
            if (this.state.videoUrl.trim().length < 1) {
                this.setState({
                    videoUrlError: "Enter a valid URL."
                })
            }
            else {
                this.state.portfolioData.videoUrls.push(this.state.videoUrl);
                this.setState({
                    videoUrlError: "",
                    videoUrl: ""
                });
                data = {
                    "videoUrls": this.state.portfolioData.videoUrls
                }
            }
        }

        if(type === "spotify"){
            if (this.state.spotifyUrl.trim().length < 1) {
                this.setState({
                    spotifyUrlError: "Enter a valid URL."
                })
            }
            else {
                data = {
                    "spotify": this.state.spotifyUrl
                }
                this.setState({
                    spotifyUrlError: "",
                    spotifyUrl: ""
                })
            }
        }
        
        if(this.state.spotifyUrlError === "" && this.state.videoUrlError === "") {
            this.updateApiCall(data);
        }
    }

    updateApiCall = (data) => {
        apiAxios.put(
            "/api/dj/portfolio", data,
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
            .then((res) => {
                if (res.data) {
                    if (res.data.spotify.indexOf('https://open.spotify.com/embed/') === -1) {
                        if (res.data.spotify.includes('https://open.spotify.com/')) {
                            res.data.spotify = res.data.spotify.replace('https://open.spotify.com/', 'https://open.spotify.com/embed/');
                        }
                    }
                    this.setState({
                        portfolioData: res.data
                    })
                }
            })
            .catch(function (error) {
            });
    }

    onRemoveUrl = (type, url) => {
        let formdata= {};

        if(type === "video"){
            formdata = {
                "videoUrls": this.state.portfolioData.videoUrls.filter(x=>x !== url)
            }
        }
        
        if(type === "spotify"){
            formdata = {
                "spotify": ""
            }
            this.setState({
                spotifyUrl: "",
                spotifyUrlError: ""
            })
        }

        this.updateApiCall(formdata);
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-sm-2 offset-sm-1" style={{backgroundColor:'#252133'}}>
                        <DjProfile />
                    </div>
                    <div className="col-sm-8 ml-2 dj-play-list p-3">
                        <h2 style={{ marginBottom: "2%" }}>My Portfolio</h2>
                        <h4>My Videos</h4>
                        <div className="row col-sm-12" style={{ marginBottom: "2%"}} >
                            <Label style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '15px' }}>Enter Video Url : </Label>
                            <TextField
                                className="col-md-6"
                                value={this.state.videoUrl}
                                onChange={(ev, videoUrl) => (this.setState({ videoUrl, videoUrlError: "" }))}
                                errorMessage={this.state.videoUrlError}
                            />
                            <button type="button" className="customBtn" onClick={() => { this.onAddUrl("video") }}>Add</button>
                        </div>
                        <div className="row" style={{ marginBottom: "5%" }}>
                            {Object.entries(this.state.portfolioData).length !== 0 ? this.state.portfolioData.videoUrls.map((data) => (
                                <div className="col-sm-4" style={{ marginBottom: "5%" }}>
                                    <ReactPlayer width='100%' height='90%' auto controls={true} volume={1} loop={true} url={data} />
                                    <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onRemoveUrl("video", data) }}>Remove</button>
                                </div>
                            )) : null}
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <h4>My Spotify</h4>
                            </div>
                            <div className="col-sm-12">
                                {Object.entries(this.state.portfolioData).length !== 0 ?
                                    (this.state.portfolioData.spotify === undefined || this.state.portfolioData.spotify === "") ?
                                        <div className="row col-sm-12" style={{ marginBottom: "2%" }} >
                                            <Label style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '15px' }}>Enter Spotify Url : </Label>
                                            <TextField
                                                className="col-md-6"
                                                value={this.state.spotifyUrl}
                                                onChange={(ev, spotifyUrl) => (this.setState({ spotifyUrl, spotifyUrlError: "" }))}
                                                errorMessage={this.state.spotifyUrlError}
                                            />
                                            <button type="button" className="customBtn" onClick={() => { this.onAddUrl("spotify") }}>Add</button>
                                        </div>
                                        :
                                        <div className="row" style={{ marginBottom: "2%" }}>
                                            <div className="col-sm-12" style={{ marginBottom: "2%" }}>
                                                <iframe src={this.state.portfolioData.spotify} width="100%" height="220" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe >
                                                <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onRemoveUrl("spotify") }}>Remove</button>
                                            </div>
                                        </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
