import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from 'office-ui-fabric-react';
import { AddEditGenreModal } from "./AddEditGenreModal";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import * as Constants from "../Common/Constants";
import Popups from "../Common/Popups";


export default class GenreList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addEditAlert: false,
            isAddGenre: true,
            genreData: [],
            editGenreData: "",
            filteredGenres: [],
            deleteId: "",
            alertMessage: "",
            showModal: false
        }

        this.columns = [
            {
                key: "column1",
                name: "Genre Title",
                fieldName: "name",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                key: "column2",
                name: "Action",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
                onRender: (item) => {
                    return (
                        <React.Fragment>
                            <button className="customBtn" onClick={() => (this.editGenre(item))}>Edit</button>
                            <button className="customBtnWhite ml-1" onClick={() => {this.deleteGenreAlert(item.id)}}>Delete</button>
                        </React.Fragment>
                    )
                }
            }
        ];

        this.getAllGenre();
    }

    getAllGenre = () => {
        apiAxios.get("/api/admin/genre",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
        .then((res) => {
            this.setState({
                genreData: res.data.genres,
                filteredGenres: res.data.genres
            })
        })
        .catch((res) => {
            console.log(res)
        })
    }

    editGenre = (item) => {
        this.setState({
            editGenreData: item,
            addEditAlert: true,
            isAddGenre: false
        })
    }

    deleteGenreAlert = (id) => {
        this.setState({
            deleteId: id,
            showModal: true,
            alertMessage: Constants.ACTION_DELETE
        })
    }

    onDismissAlert = () => {
        this.setState({
            showModal: false,
            deleteId: "",
            alertMessage: ""
        });
    }

    deleteGenre = (id) => {
        apiAxios.delete("/api/admin/genre/" + this.state.deleteId,
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
            .then((res) => {
                this.onDismissAlert();
                this.getAllGenre();
            })
            .catch((res) => { })
    }

    onAddGenre = () => {
        this.setState({
            addEditAlert: true,
            isAddGenre: true
        })
    }

    dismissGenre = () => {
        this.setState({
            addEditAlert: false
        });
        this.getAllGenre();
    }

    onSearchGenre = (event) => {
        if (event.target.value.trim().length > 0) {
            this.setState({
                filteredGenres: this.state.genreData.filter(x => x.name.toLowerCase().includes(event.target.value.trim().toLowerCase()))
            });
        }
        else {
            this.setState({
                filteredGenres: this.state.genreData
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-6"}>Genres</h5>
                        </div>
                        <div className="row col-md-12">
                            <div className="row col-md-9 dj-play-list" style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                <div className="col-md-9 listView">
                                    <DetailsList
                                        selectionMode={SelectionMode.none}
                                        // items={this.state.filteredDjList.slice(0, this.state.itemsPerPage)}
                                        items={this.state.filteredGenres}
                                        columns={this.columns}
                                    />
                                </div>
                                <div className="col-md-3" style={{ textAlign: "right" }}>
                                    <input type="search" placeholder="Search Genre" onChange={this.onSearchGenre} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="p-4" style={{ backgroundColor: '#252033', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#fff' }}>Add Genre</h4>
                                    <button className="customBtn" onClick={() => { this.onAddGenre() }}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                <AddEditGenreModal
                    showAlert={this.state.addEditAlert}
                    onDismiss={() => { this.dismissGenre() }}
                    isAdd={this.state.isAddGenre}
                    editGenreData={this.state.isAddGenre ? "" : this.state.editGenreData}
                />
                <Popups
                    showModal={this.state.showModal}
                    message={this.state.alertMessage}
                    isMultiButton={true}
                    button1Click={() => { this.deleteGenre() }}
                    button2Click={() => { this.onDismissAlert() }}
                />
            </React.Fragment>
        )
    }
}