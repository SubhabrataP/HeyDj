import React, { Component } from "react";
import Layout from "../Home/Layout";
import AddEditContent from "./AddEditContent";
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Search from '../Common/Search';

export default class MyContent extends Component{
    constructor(props){
        super(props);

        this.state = {
            contentDetails : "",
            addEditContentModal: false,
            showSelectContentModal: false,
            itemsPerPage: 2,
            isAdd: true,
            editContent: "",
            items: []
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

        this.getContentList();
    }

    editContent = (item) => {
        this.setState({
            isAdd: false,
            editContent: item,
            addEditContentModal: true
        })
    }

    deleteContent = (id) => {
        apiAxios.delete('/api/dj/content/' + id, {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((response) => {
            this.getContentList();
        })
        .catch(function (error) {
            console.log(error.response);
        })
    }

    getContentList = () => {
        apiAxios.get(
            "/api/dj/content",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
        .then((res) => {
            this.setState({
                contentDetails: res.data.contents,
                items: res.data.contents.slice(0,this.state.itemsPerPage)
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
            showSelectContentModal: false,
            isAdd: true
        });
        this.getContentList();
    }

    onLoadMoreClick = () => {
        this.setState({
            itemsPerPage: this.state.itemsPerPage + 2,
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
                               {/*
                                <Search />
                               */} 
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 dj-play-list p-4">

                                <div className="row">
                                    {/*
                                    <DetailsList
                                        selectionMode={SelectionMode.none}
                                        items={this.state.contentDetails.slice(0,this.state.itemsPerPage)}
                                        columns={this.columns}
                                    />
                                    */}

                                    {this.state.items.map((item, index) => {
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
                                    <h4 style={{color:'#fff'}}>Create Content</h4>
                                    <button className="customBtn" onClick={() => (this.onAddContent())}>Add Content</button>
                                </div>
                            </div>
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
                        isAdd={this.state.isAdd}
                        editContent={this.state.editContent}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}