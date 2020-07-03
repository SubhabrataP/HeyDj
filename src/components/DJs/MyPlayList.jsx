import React, { Component } from "react";
import Layout from "../Home/Layout";
import Search from '../Common/Search';
import AddEditPlaylist from "./AddEditPlayList";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';

export default class MyPlayList extends Component{
    constructor(props){
        super(props);

        this.state={
            showSelectContentModal: false,
            playlistDetails: [],
            isAdd: true,
            editPlaylist: []
        }

        this.columns= [
            {
                key: "column1",
                name: "Title",
                fieldName: "title",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                key: "column2",
                name: "Price",
                fieldName: "price",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                key: "column3",
                name: "Thumbnail",
                fieldName: "thumbnail",
                isResizable: false,
                minWidth: 150,
                maxWidth: 150,
                onRender: (item) => {
                    return <img src={item.thumbnail} style={{ height: "80px", width: "80px" }} />;
                  },
            },
            {
                key: "column4",
                name: "Action",
                isResizable: false,
                minWidth: 150,
                maxWidth: 150,
                onRender: (item) => {
                    return (
                        <React.Fragment>
                            <button onClick={() => {this.editContent(item)}}>Edit</button>
                            <button onClick={() => (this.deletePlaylist(item.id))}>Delete</button>
                        </React.Fragment>
                    )
                }
            }
        ];

        this.getPlaylist();
    }

    editContent = (item) => {
        this.setState({
            isAdd: false,
            editPlaylist: item,
            showSelectContentModal: true
        })
    }

    deletePlaylist = (id) => {
        apiAxios.delete('/api/dj//playlist/' + id, {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((response) => {
            this.getPlaylist();
        })
        .catch(function (error) {
            console.log(error.response);
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
            .catch(function (error) {
                alert(error.response);
            });
    }

    onDismiss = () => {
        this.setState({
            showSelectContentModal: false,
        });
        this.getPlaylist();
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>My Playlists</h5>
                            <div className={"row col-md-6"} style={{ textAlign: "right" }}>
                                {/*
                                <Search />
                                */}
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 dj-play-list p-4">

                                <div className="row listView">
                                    {/*
                                    <DetailsList
                                        selectionMode={SelectionMode.none}
                                        items={this.state.playlistDetails}
                                        columns={this.columns}
                                    />
                                    */}

                                    {this.state.playlistDetails.map((item, index) => {
                                        return (
                                            <div className="col-md-3 text-center ml-2 mr-2" style={{color:'#fff'}}>
                                                <img src={item.thumbnail} style={{ width: "100%" }} />
                                                <h5 className="m-0 mt-2"><b>{item.title}</b></h5>
                                                <small>INR {item.price}</small><br/>
                                                <span>
                                                    <small style={{color:'#6eb1c2'}} onClick={() => {this.editContent(item)}}>Edit</small>
                                                    <small style={{color:'#bccdd1'}} className="ml-3" onClick={() => (this.deletePlaylist(item.id))}>Delete</small>
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
                </Layout>
            </React.Fragment>
        )
    }
}