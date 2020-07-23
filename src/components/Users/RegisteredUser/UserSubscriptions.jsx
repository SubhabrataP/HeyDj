import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import Layout from "../../Home/Layout";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";
import Popups from "../../Common/Popups";
import * as Constants from "../../Common/Constants"
import CardTemplate from "../../Common/CardTemplate"

export default class UserSubscriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertMessage: "",
            isMultiButton: false,
            allPlaylists: [],
            currentSubscriptions: [],
            upcomingSubscriptions: [],
            expiredSubscriptions: [],
            currentPlaylists: [],
            upcomingPlaylists: [],
            expiredPlayLists: []
        }

        this.getAllSubscriptions();
        this.getAllPlaylist();
    }

    getAllPlaylist = () => {
        apiAxios.get(
            "/api/playlist",
            {
                params: {
                    all: "true"
                }
            }
        )
            .then((res) => {
                this.setState({
                    allPlaylists: res.data.playlists,
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    getAllSubscriptions = () => {
        apiAxios.get("api/subscription",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            })
            .then((res) => {
                let today = new Date();
                today.setSeconds(0);

                res.data.currentSubscriptions.map((data) => {
                    let startDate = new Date(data.startFrom);
                    let endDate = new Date(data.startFrom);
                    endDate.setHours(endDate.getHours() + parseInt(data.hours));
                    startDate.setSeconds(0);
                    endDate.setSeconds(0);

                    if (startDate > today) {
                        this.state.upcomingSubscriptions.push(data);
                    }
                    if (startDate <= today && endDate >= today) {
                        this.state.currentSubscriptions.push(data);
                    }
                })

                this.setState({
                    expiredSubscriptions: res.data.expiredSubscriptions
                });

                this.getFilteredPlaylists();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.setState({
                        showAlert: true,
                        alertMessage: Constants.NO_DATA_FOUND,
                        isMultiButton: false,
                    })
                }
            })
    }

    formatDate = (date) => {
        var d = new Date(date);
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }
        m = m < 10 ? "0" + m : m;

        s = s < 10 ? "0" + s : s;

        /* if you want 2 digit hours: */
        h = h < 10 ? "0" + h : h;

        var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
        return date.replace(pattern, h + ":" + m + ":" + s + " " + dd)
    }


    getFilteredPlaylists = () => {
        let expired= [];

        this.state.currentSubscriptions.map((elem) => {
            if (this.state.allPlaylists.find(x => x.id === elem.playlistId) !== undefined) {
                this.state.currentPlaylists.push(this.state.allPlaylists.find(x => x.id === elem.playlistId))
            }
        })

        this.state.upcomingSubscriptions.map((elem) => {
            if (this.state.allPlaylists.find(x => x.id === elem.playlistId) !== undefined) {
                this.state.upcomingPlaylists.push(this.state.allPlaylists.find(x => x.id === elem.playlistId))
            }
        })

        this.state.expiredSubscriptions.map((elem) => {
            if (this.state.allPlaylists.find(x => x.id === elem.playlistId) !== undefined) {
                expired.push(this.state.allPlaylists.find(x => x.id === elem.playlistId))
            }
        })

        this.setState({
            expiredPlayLists: expired
        })
    }

    dismissAlert = () => {
        this.setState({
            showAlert: false,
            alertMessage: "",
            isMultiButton: false,
        })
    }

    render() {
        console.log(this.state.expiredPlayLists)
        return (
            <Layout history={this.props.history} >

                {this.state.currentSubscriptions.length > 0 ?
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>Current Subscriptions</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-12 dj-play-list p-4">
                                <div className="row listView">
                                    {this.state.currentPlaylists.map((item, index) => {
                                    return (
                                        <div className="col-md-3 text-center ml-2 mr-2" style={{ color: '#fff', marginBottom: "15px" }}>
                                            <img src={item.thumbnail} style={{ width: "100%" }} />
                                            <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                            <button className="customBtnWhite" onClick={() => { this.deleteFeaturedAlert(item.id) }}>Remove</button>
                                        </div>
                                    )
                                })
                                }
                                </div>
                            </div>
                        </div>
                    </div> : null}

                {this.state.upcomingSubscriptions.length > 0 ?
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>Upcoming Subscriptions</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-12 dj-play-list p-4">
                                <div className="row listView">
                                    {this.state.upcomingPlaylists.map((item, index) => {
                                    return (
                                        <div className="col-md-3 text-center ml-2 mr-2" style={{ color: '#fff', marginBottom: "15px" }}>
                                            <img src={item.thumbnail} style={{ width: "100%" }} />
                                            <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                        </div>
                                    )
                                })
                                }
                                </div>
                            </div>
                        </div>
                    </div> : null}

                {this.state.expiredSubscriptions.length > 0 ?
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>Expired Subscriptions</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-12 dj-play-list p-4">
                                <div className="row listView">
                                    {this.state.expiredPlayLists.map((item) => {
                                    return (
                                        <div className="col-md-3 text-center ml-2 mr-2" style={{ color: '#fff', marginBottom: "15px" }}>
                                            <img src={item.thumbnail} style={{ width: "100%" }} />
                                            <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                        </div>
                                    )
                                })
                                }
                                </div>
                            </div>
                        </div>
                    </div> : null}

                {this.state.isMultiButton ?
                    null
                    :
                    <Popups
                        showModal={this.state.showAlert}
                        message={this.state.alertMessage}
                        isMultiButton={false}
                        button1Click={() => { this.dismissAlert() }}
                    />}
            </Layout>
        )
    }
}