import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

const priceRegex = RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{2})?\s*$/);

export default class AddEditPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectionDetails: "",
            editPlaylistId: "",
            contentDetails: [],
            title: "",
            price: "",
            thumbnail: {
                path: "",
                value: ""
            },
            sampleContent: {
                name: "",
                value: ""
            },
            titleError: "",
            priceError: "",
            thumbnailError: "",
            sampleContentError: ""
        }

        this.columns = [
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
        const selectionData = this._selection.getSelection();
        return selectionData;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.isAdd) {
            var myArr = JSON.parse(nextProps.editData.content);
            var filtered = this.state.contentDetails.filter(
                function(e) {
                  return this.indexOf(e.id) >= 0;
                },
                myArr
            );

            this.setState({
                title: nextProps.editData.title,
                price: nextProps.editData.price,
                editPlaylistId: nextProps.editData.id,
                thumbnail: {
                    path: nextProps.editData.thumbnail,
                    value: nextProps.editData.thumbnail
                },
                sampleContent: {
                    name: "",
                    value: nextProps.editData.sampleContent
                },
                selectionDetails: filtered
            })
            console.log(filtered[0])
            this._selection.setItems(filtered, true)
            // this._selection = filtered[0]
        }
    }

    editOnChangeHandler = (event, type) => {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = function () {
                if (type === "image") {
                    let image = {
                        path: reader.result,
                        value: file
                    }
                    this.setState({
                        thumbnail: image,
                        thumbnailError: ""
                    });
                }
                else if (type === "multimedia") {
                    this.setState({
                        sampleContent: {
                            name: file.name,
                            value: file
                        },
                        sampleContentError: ""
                    });
                }
            }.bind(this);
        }
    }

    formValidation = () => {
        this.state.title.trim().length < 1 ?
            this.setState({
                title: "",
                titleError: "Title is required."
            }) :
            this.setState({
                titleError: "",
                title: this.state.title.trim()
            });

        priceRegex.test(this.state.price) ?
            this.setState({
                priceError: ""
            }) :
            this.setState({
                priceError: "Please enter a valid Price amount."
            })

        this.props.isAdd ?
            this.state.sampleContent.name === "" ?
                this.setState({
                    sampleContentError: "Sample track is required."
                }) :
                this.setState({
                    sampleContentError: ""
                })
            :
            this.setState({
                sampleContentError: ""
            })

        this.state.thumbnail.value === "" ?
            this.setState({
                thumbnailError: "Thumbnail is required."
            }) :
            this.setState({
                thumbnailError: ""
            })
    }

    onCreateEdit = async () => {
        let isValid = false;
        await this.formValidation();

        if (this.state.titleError === "" && this.state.priceError === "" && this.state.thumbnailError === "" && this.state.sampleContentError === "") {
            isValid = true;
        }
        else {
            isValid = false;
        }

        if (isValid) {
            if (this.props.isAdd) {
                if (this.state.selectionDetails.length > 0) {
                    var contentIds = [];
                    this.state.selectionDetails.map((data) => {
                        contentIds.push(data.id);
                    })
                    var bodyFormData = new FormData();
                    bodyFormData.set('title', this.state.title);
                    bodyFormData.set('price', this.state.price);
                    bodyFormData.set('content', JSON.stringify(contentIds));
                    bodyFormData.append('thumbnail', this.state.thumbnail.value);
                    bodyFormData.append('sampleContent', this.state.sampleContent.value);

                    apiAxios.post("/api/dj/playlist/", bodyFormData, {
                        headers: {
                            'Authorization': localStorage.getItem('Token')
                        }
                    })
                        .then((res) => {
                            this.onDismiss();
                        })
                        .catch(function (error) {
                            console.log(error.response);
                        })
                }
                else {
                    alert('Select atleast one from contents list.')
                }
            }
            else{
                if (this.state.selectionDetails.length > 0) {
                    var contentIds = [];
                    this.state.selectionDetails.map((data) => {
                        contentIds.push(data.id);
                    })
                    var bodyFormData = new FormData();
                    bodyFormData.set('title', this.state.title);
                    bodyFormData.set('price', this.state.price);
                    bodyFormData.set('content', JSON.stringify(contentIds));
                    bodyFormData.append('thumbnail', this.state.thumbnail.value);
                    bodyFormData.append('sampleContent', this.state.sampleContent.value);

                    apiAxios.put("/api/dj/playlist/" + this.state.editPlaylistId, bodyFormData, {
                        headers: {
                            'Authorization': localStorage.getItem('Token')
                        }
                    })
                        .then((res) => {
                            this.onDismiss();
                        })
                        .catch(function (error) {
                            console.log(error.response);
                        })
                }
                else {
                    alert('Select atleast one from contents list.')
                }
            }
        }
    }

    getContentList = () => {
        apiAxios.get(
            "/api/dj/content",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
            }
        )
            .then((res) => {
                this.setState({
                    contentDetails: res.data.contents,
                })
            })
            .catch(function (error) {
                alert(error.response);
            });
    }

    onDismiss = () => {
        this.state = {
            selectionDetails: "",
            contentDetails: [],
            title: "",
            price: "",
            thumbnail: {
                path: "",
                value: ""
            },
            sampleContent: {
                name: "",
                value: ""
            },
            titleError: "",
            priceError: "",
            thumbnailError: "",
            sampleContentError: "",
            editPlaylistId: ""
        }
        this._selection = new Selection({});
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
                        <h4 style={{ margin:'0', paddingTop: "4%", paddingBottom: "4%", textAlign: "center", color: '#fff', backgroundColor:'#252133' }}>
                            {this.props.isAdd ? "Add Playlist" : "Edit Playlist"}
                        </h4>
                        <div className="container loginBg">

                            <div className="row mt-4">
                                <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right",color: '#fff' }}>Title:</Label>
                                <TextField
                                    className="col-md-8"
                                    value={this.state.title}
                                    onChange={(ev, title) => (this.setState({ title, titleError: "" }))}
                                    errorMessage={this.state.titleError}
                                />
                            </div>

                            <div className="row mt-2">
                                <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right",color: '#fff' }}>Price:</Label>
                                <TextField
                                    className="col-md-4"
                                    value={this.state.price}
                                    onChange={(ev, price) => (this.setState({ price, priceError: "" }))}
                                    errorMessage={this.state.priceError}
                                />
                                <Label className="col-md-4" style={{ paddingLeft: "1%", paddingRight: "0%", textAlign: "left" }}> / per Hour</Label>
                            </div>

                            <div className="row mt-2 mb-2">
                                <Label className="col-md-12" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center",color: '#fff' }}>Sample Track:</Label>
                                <div className="col-md-12">
                                    <FormControl
                                        type={"file"}
                                        style={{ padding: "7px", marginBottom: "6px", width: "100%", border:'1px solid' }}
                                        onChange={(event) => { this.editOnChangeHandler(event, "multimedia") }}
                                        accept={"audio/*, video/*"}
                                        ref={(ref) => (this.fileChange = ref)}
                                    />
                                </div>
                                {this.state.sampleContentError === "" ? null :
                                    <span style={{ color: 'red' }}>{this.state.sampleContentError}</span>
                                }
                                <div style={{ color: 'black' }}>
                                    {this.state.sampleContent.name === "" ? "" :
                                        <React.Fragment>
                                            {this.state.sampleContent.name}<button className="customBtn" style={{ marginLeft: "5px" }} onClick={() => { this.fileChange.click(); }}>Change</button>
                                        </React.Fragment>
                                    }
                                </div>
                                {this.props.isAdd ? "" :
                                    this.state.sampleContent.name === "" ?
                                        <React.Fragment>
                                            <audio className="ml-3" src={this.state.sampleContent.value} controls></audio>
                                            <button className="customBtn" style={{ marginLeft: "5px" }} onClick={() => { this.fileChange.click(); }}>Change</button>
                                        </React.Fragment> : null
                                }
                            </div>

                            <div className={"image-edit"} >
                                <Label className="col-md-4" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right" }}>Thumbnail:</Label>
                                
                                <Image
                                    src={this.state.thumbnail.path ? this.state.thumbnail.path : ""}
                                    thumbnail
                                />
                                <FormControl
                                    aria-label="Image"
                                    type={"file"}
                                    ref={(ref) => (this.upload = ref)}
                                    style={{ padding: "4px", marginBottom: "16px", width: "100%" }}
                                    onChange={(event) => this.editOnChangeHandler(event, "image")}
                                    accept={"image/*"}
                                />
                                {this.state.thumbnailError === "" ? null :
                                    <span style={{ color: 'red' }}>{this.state.thumbnailError}</span>
                                }
                                <span>
                                    <i className="fa fa-plus upload-button" style={{color:'#6eb1c2'}}
                                        onClick={() => {
                                            this.upload.click();
                                        }} >
                                    </i>Add
                                </span>
                            </div>

                            <div className="row">
                                <Label className="col-md-12" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color:'#fff' }}>Contents:</Label>
                                <div className="col-sm-9 offset-sm-1">
                                <DetailsList
                                    selectionMode={SelectionMode.multiple}
                                    items={this.state.contentDetails}
                                    columns={this.columns}
                                    selection={this._selection}
                                />
                                </div>
                            </div>

                            <div className="mb-3" style={{ textAlign: "center", marginTop: "15px" }}>
                                <button type="button" className="customBtn" onClick={() => { this.onCreateEdit() }}>
                                    {this.props.isAdd ? "Add" : "Update"}
                                </button>
                                <button type="button" className="customBtnWhite ml-3" onClick={() => { this.onDismiss() }}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}