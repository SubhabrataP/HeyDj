import React, { Component } from "react";
import Layout from "../Home/Layout";
import Popups from "../Common/Popups";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { AddFeaturedPlaylistModal } from "./AddFeaturedPlaylistModal";
import * as Constants from "../Common/Constants"

export default class FeaturedList extends Component {
    constructor(props) {
        super(props);

        this.state={
            playlists: [],
            showModal: false,
            showAlert: false,
            alertMessage: "",
            deleteId: ""
        }

        this.getAllFeaturedPlaylist();
    }

    getAllFeaturedPlaylist = () => {
        apiAxios.get("api/featured")
        .then((res)=>{
            this.setState({
                playlists: res.data.playlists
            })
        })
        .catch((res) => {})
    }

    addFeaturedPlaylist = () => {
        this.setState({
            showModal: true
        })
    }

    onDismiss = () => {
        this.setState({
            showModal: false
        });
        this.getAllFeaturedPlaylist();
    }

    deleteFeaturedAlert = (id) => {
        this.setState({
            showAlert: true,
            alertMessage: Constants.ACTION_DELETE,
            deleteId: id
        })
    }

    onDismissAlert = () => {
        this.setState({
            showAlert: false,
            alertMessage: "",
            deleteId: ""
        })
    }

    deleteFeatured = () => {
        this.onDismissAlert();
        apiAxios.delete("api/admin/featured/" + this.state.deleteId,
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
            .then((res) => {
                this.getAllFeaturedPlaylist();
            })
            .catch((res) => { })
    }

    render() {
        return (
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>Featured Playlists</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-8 dj-play-list p-4">

                                <div className="row listView">

                                    {this.state.playlists.map((item, index) => {
                                        return (
                                            <div className="col-md-3 text-center ml-2 mr-2" style={{ color: '#fff', marginBottom: "15px" }}>
                                                <img src={item.thumbnail} style={{ height: "160px", width: "100%" }} />
                                                <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                                <button className="customBtnWhite" onClick={() => {this.deleteFeaturedAlert(item.id)}}>Remove</button>
                                            </div>
                                        )
                                    })
                                    }

                                </div>

                            </div>
                            <div className="col-md-3 ml-3 mr-3">
                                <div className="p-4" style={{ backgroundColor: '#252033', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#fff' }}>Add To Featured</h4>
                                    <button className="customBtn" onClick={() => {this.addFeaturedPlaylist()}}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddFeaturedPlaylistModal
                        showModal={this.state.showModal}
                        onDismiss={() => { this.onDismiss() }}
                    />
                    <Popups
                        showModal={this.state.showAlert}
                        message={this.state.alertMessage}
                        isMultiButton={true}
                        button1Click={() => { this.deleteFeatured() }}
                        button2Click={() => { this.onDismissAlert() }}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}