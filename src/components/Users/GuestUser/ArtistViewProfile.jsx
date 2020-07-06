import React, { Component } from "react";
import Layout from "../../Home/Layout";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";
import CardTemplate from "../../Common/CardTemplate";

export default class ArtistViewProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            userData: this.props.history.location.state.djDetails ? this.props.history.location.state.djDetails : "",
            userPlaylists: []
        }

        this.getDjPlaylists();
    }

    getDjPlaylists = () => {
        apiAxios.get(
            "/api/playlist",
            {
                params: {
                    user: this.state.userData.id
                }
            }
        )
            .then((res) => {
                this.setState({
                    userPlaylists: res.data.playlists,
                })
            })
            .catch(function (error) {
                alert(error.response);
            });
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-sm-2 offset-sm-1" style={{ backgroundColor: '#252133' }}>
                        <div className="text-center" style={{ color: '#fff' }}>
                            <img
                                src={this.state.userData.profileImage}
                                alt="logo"
                                style={{ borderRadius: '50%', padding: '5% 15%' }}
                            />
                            <h4>{this.state.userData.firstName + this.state.userData.lastName}</h4>
                            <span>
                                {this.state.userData.city === "" ? "" :
                                    <React.Fragment>
                                        <i class="fa fa-map-marker"></i>{this.state.userData.city}
                                    </React.Fragment>}
                            </span>
                            <h4>
                                <i class="fa fa-facebook-f"></i><i class="fa fa-twitter"></i><i class="fa fa-instagram"></i><i class="fa fa-youtube"></i>
                            </h4>
                            <p>{"+" + this.state.userData.phoneNumber}</p>
                            <p>{this.state.userData.emailId}</p>
                        </div>
                        <div className="text-left mt-5 mb-3">
                            {(this.state.userData.workExperience === "" || this.state.userData.workExperience === undefined) ?
                                null :
                                this.state.userData.workExperience.map((data) => (
                                    <div style={{ marginBottom: "15px" }}>
                                        <h5><b>{data.jobTitle}</b></h5>
                                        <p>{"At " + data.company}</p>
                                        <small>{data.description}</small>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="col-sm-8 ml-2 dj-play-list p-3">
                        <h4>Portfolio</h4>
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
                                <h4>Spotify</h4>
                            </div>
                            <div className="col-sm-12">
                                <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="100%" height="220" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <h4>Playlists</h4>
                            </div>
                            <div className="row col-sm-12">
                                {this.state.userPlaylists.map((data) => (
                                    <div className="col-md-3 m-3">
                                        <CardTemplate
                                            playlistData={data}
                                            type={"playlist"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
