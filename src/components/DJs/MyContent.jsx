import React, { Component } from "react";
import Layout from "../Home/Layout";
import AddEditContent from "./AddEditContent";
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Search from '../Common/Search';
import AddEditPlayList from "./AddEditPlayList";

export default class MyContent extends Component{
    constructor(props){
        super(props);

        this.state = {
            contentDetails : "",
            addEditContentModal: false,
            selectionDetails: "",
            addEditPlaylistModal: false,
            itemsPerPage: 2
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
                name: "Content Type",
                fieldName: "type",
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
                // onRender: (item) => {
                //     return (
                //         <React.Fragment>
                //             <button onClick={() => (this.editProfile(item))}>Edit</button>
                //             <button onClick={() => (this.deleteProfile(item.id))}>Delete</button>
                //         </React.Fragment>
                //     )
                // }
            }
        ]

        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            },
        });
        this.getContentList();
    }

    _getSelectionDetails = () => {
        const selectionCount = this._selection.getSelection();
        return selectionCount;
      }
    

    getContentList = () => {
        apiAxios.get(
            "/api/dj/content/",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
                params: {
                    artist: localStorage.getItem('Id')
                }
            }
        )
        .then((res) => {
            this.setState({
                contentDetails: res.data
            })
        })
        .catch(function (error) {
            alert(error.response);
        });
    }

    onAddContent = () => {
        this.setState({
            addEditContentModal: true
        })
    }

    onDismiss = () => {
        this.setState({
            addEditContentModal: false,
            addEditPlaylistModal: false
        });
        this.getContentList();
    }

    onCreatePlaylist = () => {
        if(this.state.selectionDetails.length > 0)
        {
            this.setState({
                addEditPlaylistModal: true
            })
            // apiAxios.post('/api/dj/playlist', bodyFormData, {
            //     headers: {
            //         'Authorization': localStorage.getItem('Token')
            //     }
            // })
            //     .then((response) => {
            //         this.onDismiss();
            //     })
            //     .catch(function (error) {
            //         alert(error.response === undefined ? error.response : error.response.data);
            //     })
        }
        else{
            alert('Select atleast one from content list.')
        }
    }

    onLoadMoreClick = () => {
        this.setState({
            itemsPerPage: this.state.itemsPerPage + 2
        })
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>My Content</h5>
                            <div className={"row col-md-6"} style={{textAlign: "right"}}>
                                <Search />
                                <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onAddContent())}>Add Content</button>
                                <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onCreatePlaylist())}>Create Playlist</button>
                            </div>
                        </div>

                        <div className="row">
                            <DetailsList
                                selectionMode={SelectionMode.multiple}
                                items={this.state.contentDetails.slice(0,this.state.itemsPerPage)}
                                columns={this.columns}
                                selection={this._selection}
                            />
                        </div>

                        <div>
                            {this.state.contentDetails.length > this.state.itemsPerPage
                                ? <button onClick={this.onLoadMoreClick}>Load More</button>
                                : null}
                        </div>

                    </div>
                    <AddEditContent
                        showModal={this.state.addEditContentModal}
                        onDismiss={() => (this.onDismiss())}
                    />
                    <AddEditPlayList
                        showModal={this.state.addEditPlaylistModal}
                        onDismiss={() => (this.onDismiss())}
                        selectedContent={this.state.addEditPlaylistModal ? this.state.selectionDetails : null}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}