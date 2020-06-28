import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

export default class SelectContentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectionDetails: "",
            contentDetails: []
        }

        this.columns= [
            {
                key: "column2",
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
                key: "column1",
                name: "Title",
                fieldName: "title",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            }
        ];

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

    onContinue = () => {
        if(this.state.selectionDetails.length > 0)
        {
            alert('Ok')
        }
        else
        {
            alert('Select atleast one from content list.')
        }
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
                contentDetails: res.data,
            })
        })
        .catch(function (error) {
            alert(error.response);
        });
    }

    onDismiss = () => {
        this.props.onDismiss();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Modal
                        show={this.props.showModal}
                        // className="ml-3 mr-3"
                    >
                        <h4 style={{ marginBottom: "5%", textAlign: "left", color:'black'}}>Add Playlist</h4>
                        <div className="container">
                            <div>
                            <DetailsList
                                selectionMode={SelectionMode.multiple}
                                items={this.state.contentDetails}
                                columns={this.columns}
                                selection={this._selection}
                            />
                            </div>
                            <div style={{ textAlign: "center", marginTop: "15px" }}>
                                <button type="button" className="btn" onClick={() => { this.onContinue() }}>
                                    Continue
                                </button>
                                <button type="button" className="btn" onClick={() => { this.onDismiss() }}>Cancel</button>
                            </div>
                        </div>


                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}