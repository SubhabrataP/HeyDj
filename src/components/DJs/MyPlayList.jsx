import React, { Component } from "react";
import Layout from "../Home/Layout";
import Search from '../Common/Search';
import AddEditPlaylist from "./AddEditPlaylist";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';

export default class MyPlayList extends Component{
    constructor(props){
        super(props);

        this.state={
            showSelectContentModal: false,
            playlistDetails: [],
            isAdd: true
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
                    return <img src={item.thumbnail} style={{ height: "40px", width: "40px" }} />;
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
                            <button onClick={() => (this.deleteContent(item.id))}>Delete</button>
                        </React.Fragment>
                    )
                }
            }
        ];

        this.getPlaylist();
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
                console.log(res.data)
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
        // this.getContentList();
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>My Playlists</h5>
                            <div className={"row col-md-6"} style={{ textAlign: "right" }}>
                                <Search />
                                <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onCreatePlaylist())}>Create Playlist</button>
                            </div>
                        </div>

                        <div className="row">
                            <DetailsList
                                selectionMode={SelectionMode.none}
                                items={this.state.playlistDetails}
                                columns={this.columns}
                            />
                        </div>
                    </div>
                    <AddEditPlaylist
                        showModal={this.state.showSelectContentModal}
                        onDismiss={() => (this.onDismiss())}
                        isAdd={this.state.isAdd}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}