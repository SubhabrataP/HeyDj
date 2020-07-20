import React, { Component } from "react";
//import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { Multiselect } from 'multiselect-react-dropdown';

export class AddFeaturedPlaylistModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
            featuerdPlaylistIds: [],
            filteredList: [],
            selectedPlaylistIds: [],
            errorMessage: ""
        }
    }

    UNSAFE_componentWillReceiveProps(){
        this.getAllPlaylists();
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({
            errorMessage: ""
        })
        this.state.selectedPlaylistIds.push(selectedItem.id);
    }

    onRemove = (selectedList, removedItem) => {
        this.setState({
            errorMessage: ""
        })
        this.state.selectedPlaylistIds.pop(removedItem.id);
    }

    getAllPlaylists = () => {
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
                    playlists: res.data.playlists,
                },() => {
                    this.getFeaturedPlaylistIds();
                })
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    getFeaturedPlaylistIds = () => {
        apiAxios.get("api/admin/featured",
        {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        }
    )
        .then((res) => {
            this.setState({
                featuerdPlaylistIds: res.data.playlistIds,
            }, () => {
                this.createNonFeaturedList();
            })

        })
        .catch((res) => { })
    }

    createNonFeaturedList = () => {
        let fiteredPlaylist = this.state.playlists.filter(
            function(e){
                return this.indexOf(e.id) < 0;
            },
            this.state.featuerdPlaylistIds
        );
        let fiteredPlaylistIds = fiteredPlaylist.map((data) => {
            return {
                id: data.id,
                name: data.title
            }
        });
        this.setState({
            filteredList: fiteredPlaylistIds
        })
    }

    addFeaturedPlaylist = () => {
        if(this.state.selectedPlaylistIds.length > 0){
            this.setState({
                errorMessage: ""
            })

            let data = {
                "playlistId" : this.state.selectedPlaylistIds
            };

            apiAxios.post("api/admin/featured", data,
                {
                    headers: {
                        'Authorization': localStorage.getItem('Token')
                    }
                }
            )
                .then((res) => {
                    this.onDismiss();
                })
                .catch((res) => { 
                    this.onDismiss();
                })
        }
        else{
            this.setState({
                errorMessage: "Select atleast 1 playlist item."
            })
        }
    }

    onDismiss = () => {
        this.setState({
            playlists: [],
            featuerdPlaylistIds: [],
            filteredList: [],
            selectedPlaylistIds: [],
            errorMessage: ""
        });
        this.props.onDismiss();
    }
    
    render() {
        return (
            <div className="container">
                <Modal
                    show={this.props.showModal}
                    className="ml-3 mr-3"
                >
                    <div className="row popupModal">
                        <div className="col-sm-12 text-center mb-2" style={{ borderBottom: '1px solid #fff' }}>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginBottom: "2%", textAlign: "right", color: '#fff' }} onClick={() => { this.onDismiss() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 style={{ margin: "2%", textAlign: "left", color: '#fff' }}>
                                Add Featured Playlist
                            </h4>
                        </div>
                        <div className="col-sm-12">
                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-sm-4" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Playlists:</Label>
                                <Multiselect
                                    className="col-sm-8"
                                    options={this.state.filteredList} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                            </div>
                            <span style={{color: "red"}}>
                                {this.state.errorMessage}
                            </span>
                        </div>
                        <div className="col-sm-12" style={{ textAlign: "center", margin: "15px 0" }}>
                            <button type="button" className="customBtn" onClick={() => { this.addFeaturedPlaylist() }}>
                                Add
                            </button>
                            <button type="button" className="customBtnWhite ml-4" onClick={() => { this.onDismiss() }}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}