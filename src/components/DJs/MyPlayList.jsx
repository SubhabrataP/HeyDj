import React, { Component } from "react";
import Layout from "../Home/Layout";
import Search from '../Common/Search';
import AddEditPlaylist from "./AddEditPlayList";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants"

export default class MyPlayList extends Component{
    constructor(props){
        super(props);

        this.state={
            showSelectContentModal: false,
            playlistDetails: [],
            isAdd: true,
            editPlaylist: [],
            showAlert: false,
            deleteId: 0,
            alertMessage: "",
            isMultiButton: false,
            secondaryMessage: ""
        }

        this.getPlaylist();
    }

    editContent = (item) => {
        this.setState({
            isAdd: false,
            editPlaylist: item,
            showSelectContentModal: true
        })
    }

    showDeleteAlert = (id) => {
        this.setState({
            showAlert: true,
            deleteId: id,
            alertMessage: Constants.ACTION_DELETE,
            isMultiButton: true
        })
    }

    deletePlaylist = () => {
        apiAxios.delete('/api/dj/playlist/' + this.state.deleteId, {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((response) => {
            this.setState({
                showAlert: true,
                alertMessage: "Playlist" + Constants.DELETE_SUCCESS_MESSAGE,
                isMultiButton: false
            })
            this.getPlaylist();
        })
        .catch((error) => {
            this.onDismissAlert();
            if(error.response.data.includes("Cannot delete")){
                this.setState({
                    showAlert: true,
                    alertMessage: "Sorry!! Cannot Delete",
                    secondaryMessage: "This Playlist is having active subscriptions.",
                    isMultiButton: false
                })
            }
        })
    }

    onCreatePlaylist = () => {
        this.setState({
            showSelectContentModal: true,
            isAdd: true
        })
    }

    getPlaylist = () => {
        apiAxios.get(
            "/api/dj/playlist",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
            }
        )
            .then((res) => {
                this.setState({
                    playlistDetails: res.data.playlists,
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    onDismiss = () => {
        this.setState({
            showSelectContentModal: false,
        });
        this.getPlaylist();
    }

    onDismissAlert = () => {
        this.setState({
            showAlert: false,
            deleteId: 0,
            alertMessage: "",
            isMultiButton: false,
            secondaryMessage: ""
        });
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%", marginBottom: "2%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>My Playlists</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-8 dj-play-list p-4">

                                <div className="row listView">
                                    
                                    {this.state.playlistDetails.map((item, index) => {
                                        return (
                                            <div className="col-md-3 text-center ml-2 mr-2" style={{color:'#fff'}}>
                                                <img src={item.thumbnail} style={{ height: "160px", width: "100%" }} />
                                                <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                                <small>INR {item.price}</small><br/>
                                                <span>
                                                    <small style={{color:'#6eb1c2'}} onClick={() => {this.editContent(item)}}>Edit</small>
                                                    <small style={{color:'#bccdd1'}} className="ml-3" onClick={() => (this.showDeleteAlert(item.id))}>Delete</small>
                                                </span>
                                            </div>
                                        )})
                                    }

                                </div>

                            </div>
                            <div className="col-md-3 ml-3 mr-3">
                                <div className="p-4" style={{backgroundColor:'#252033', borderRadius:'15px'}}>
                                    <h4 style={{color:'#fff'}}>Create Playlist</h4>
                                    <button className="customBtn" onClick={() => (this.onCreatePlaylist())}>Create Playlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddEditPlaylist
                        showModal={this.state.showSelectContentModal}
                        onDismiss={() => (this.onDismiss())}
                        isAdd={this.state.isAdd}
                        editData={this.state.editPlaylist}
                    />
                    {this.state.isMultiButton ?
                        <Popups
                            showModal={this.state.showAlert}
                            message={this.state.alertMessage}
                            isMultiButton={true}
                            button1Click={() => { this.deletePlaylist() }}
                            button2Click={() => { this.onDismissAlert() }}
                        />
                        :
                        <Popups
                            showModal={this.state.showAlert}
                            message={this.state.alertMessage}
                            secondaryMessage={this.state.secondaryMessage}
                            isMultiButton={false}
                            button1Click={() => { this.onDismissAlert() }}
                        />
                    }
                    
                </Layout>
            </React.Fragment>
        )
    }
}