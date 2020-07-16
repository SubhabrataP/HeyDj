import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class AddEditContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            thumbnail: {
                path: "",
                value: ""
            },
            content: {
                name: "",
                value: ""
            },
            contentType: "",
            contentBlob: "",
            percentComplete: 1,
            showProgress: false,
            contentId: "",
            titleError: "",
            thumbnailError: "",
            contentError: "",
            previewContent: "",
            showSpinner: false
        }
    }

    updateProgress = (evt) => {
        if (evt.lengthComputable) {
            var percentLoaded = (evt.loaded / evt.total);
            this.setState({
                percentComplete: percentLoaded
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.isAdd) {
            this.setState({
                title: nextProps.editContent.title,
                thumbnail: {
                    path: nextProps.editContent.thumbnail,
                    value: nextProps.editContent.thumbnail
                },
                contentId: nextProps.editContent.id,
                percentComplete: 1,
                showProgress: false,
                previewContent: nextProps.editContent.content
            })
        }
    }

    editOnChangeHandler = (event, type) => {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadstart = function () {
                if (type === "multimedia") {
                    this.setState({
                        showProgress: true
                    })
                }
            }.bind(this)
            reader.onprogress = this.updateProgress.bind(this);
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
                    if (file.type.includes("audio")) {
                        this.setState({
                            contentType: 'audio'
                        })
                    }
                    else if (file.type.includes("video")) {
                        this.setState({
                            contentType: 'video'
                        })
                    }
                    else {
                        this.setState({
                            contentType: ""
                        })
                    }

                    let blobData = new Blob([file]);

                    this.setState({
                        content: {
                            name: file.name,
                            value: file
                        },
                        contentError: "",
                        contentBlob: blobData
                    });
                }
            }.bind(this);
        }
        else {
            if (type === "multimedia") {
                this.setState({
                    showProgress: false
                });
            }
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

        this.props.isAdd ?
            this.state.content.name === "" ?
                this.setState({
                    contentError: "Media file is required."
                }) :
                this.setState({
                    contentError: ""
                })
            :
            this.setState({
                contentError: ""
            })

        this.state.thumbnail.value === "" ?
            this.setState({
                thumbnailError: "Thumbnail is required."
            }) :
            this.setState({
                thumbnailError: ""
            })
    }

    onAddEditContent = async () => {
        let isValid = false;
        await this.formValidation();
        if (this.state.titleError === "" && this.state.contentError === "" && this.state.thumbnailError === "") {
            isValid = true;
        }
        else {
            isValid = false;
        }

        if (isValid) {
            this.setState({
                showSpinner: true
            })

            var bodyFormData = new FormData();
            bodyFormData.set('title', this.state.title);
            bodyFormData.append('thumbnail', this.state.thumbnail.value);
            bodyFormData.set('type', this.state.contentType);

            if (this.props.isAdd) {
                apiAxios.post('/api/dj/content', bodyFormData, {
                    headers: {
                        'Authorization': localStorage.getItem('Token')
                    }
                })
                    .then((res) => {
                        console.log(res.data)
                        this.addContentUrl(res.data.contentUploadUrl)
                    })
                    .catch(function (error) {
                        console.log(error.response);
                        this.setState({
                            showSpinner: false
                        })
                    })
            }
            else {
                var editData = new FormData();
                editData.set('title', this.state.title);
                editData.append('thumbnail', this.state.thumbnail.value);

                apiAxios.put("/api/dj/content/" + this.state.contentId, editData, {
                    headers: {
                        'Authorization': localStorage.getItem('Token')
                    }
                })
                    .then((response) => {
                        this.setState({
                            showSpinner: false
                        })
                        this.onDismiss();
                    })
                    .catch(function (error) {
                        this.setState({
                            showSpinner: false
                        })
                        console.log(error.response);
                    })
            }
        }
    }

    addContentUrl = (url) => {
        apiAxios.put(url, this.state.contentBlob)
            .then((res) => {
                console.log(res)
                this.setState({
                    showSpinner: false
                })
                this.onDismiss();
            })
            .catch(function (error) {
                console.log(error.response);
                this.setState({
                    showSpinner: false
                })
            })
    }

    onDismiss = () => {
        this.setState({
            title: "",
            thumbnail: {
                path: "",
                value: ""
            },
            content: {
                name: "",
                value: ""
            },
            contentType: "",
            contentBlob: "",
            percentComplete: 1,
            showProgress: false,
            contentId: "",
            titleError: "",
            thumbnailError: "",
            contentError: "",
            previewContent: ""
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
                    {this.state.showSpinner ?
                        <div style={{ margin: '0', paddingTop: "4%", paddingBottom: "4%", textAlign: "center", color: '#fff', backgroundColor: '#252133' }}>
                            <CircularProgress size={"80px"} />
                        </div>
                        :
                        <React.Fragment>
                            <h4 style={{ margin: '0', paddingTop: "4%", paddingBottom: "4%", textAlign: "center", color: '#fff', backgroundColor: '#252133' }}>
                                {this.props.isAdd ? "Add Content" : "Edit Content"}
                            </h4>
                            <div className="container loginBg">
                                <div className="row mt-4" style={{ marginBottom: "5%" }}>
                                    <Label className="col-md-2" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "right", color: '#fff' }}>Title:</Label>
                                    <TextField
                                        className="col-md-8"
                                        value={this.state.title}
                                        onChange={(ev, title) => (this.setState({ title, titleError: "" }))}
                                        errorMessage={this.state.titleError}
                                    />
                                </div>
                                {this.props.isAdd ?
                                    <div style={{ marginBottom: "8%" }}>
                                        <Label className="col-md-12" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: '#fff' }}>Content:</Label>
                                        <div className="col-md-12">
                                            <FormControl
                                                type={"file"}
                                                style={{ padding: "7px", marginBottom: "6px", width: "100%", border: '1px solid' }}
                                                onChange={(event) => { this.editOnChangeHandler(event, "multimedia") }}
                                                accept={"audio/*, video/*"}
                                                ref={(ref) => (this.fileChange = ref)}
                                            />
                                        </div>
                                        {this.state.contentError === "" ? null :
                                            <span style={{ color: 'red' }}>{this.state.contentError}</span>
                                        }
                                        <div style={{ color: '#fff' }}>
                                            {this.state.content.name === "" ? "" :
                                                <React.Fragment>
                                                    {this.state.content.name}<button className="customBtn" style={{ marginLeft: "5px" }} onClick={() => { this.fileChange.click(); }}>Change</button>
                                                </React.Fragment>
                                            }
                                        </div>
                                        {this.state.showProgress ?
                                            this.state.percentComplete === 1 ?
                                                <label style={{ color: "green" }} >Upload Complete</label>
                                                :
                                                <ProgressIndicator barHeight={4} label="Upload Status" percentComplete={this.state.percentComplete} />
                                            : null
                                        }
                                    </div>
                                    : null}

                                <div className={"image-edit"} >
                                    <Label className="col-md-4" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: '#fff' }}>Thumbnail:</Label>

                                    <Image
                                        src={this.state.thumbnail.path ? this.state.thumbnail.path : ""}
                                        thumbnail
                                    />
                                    <FormControl
                                        aria-label="Image"
                                        type={"file"}
                                        ref={(ref) => (this.upload = ref)}
                                        style={{ padding: "1px", marginBottom: "16px", width: "100%" }}
                                        onChange={(event) => this.editOnChangeHandler(event, "image")}
                                        accept={"image/*"}
                                    />
                                    {this.state.thumbnailError === "" ? null :
                                        <span style={{ color: 'red' }}>{this.state.thumbnailError}</span>
                                    }
                                    <span>
                                        <i className="fa fa-plus upload-button" style={{ color: '#6eb1c2' }}
                                            onClick={() => {
                                                this.upload.click();
                                            }} >
                                        </i>Add
                            </span>
                                </div>

                                <div className="mb-3" style={{ textAlign: "center", marginTop: "15px" }}>
                                    <button type="button" className="customBtn" onClick={() => { this.onAddEditContent() }}>
                                        {this.props.isAdd ? "Add" : "Update"}
                                    </button>
                                    <button type="button" className="customBtnWhite ml-3" onClick={() => { this.onDismiss() }}>Cancel</button>
                                </div>
                            </div>
                        </React.Fragment>}
                </Modal>
            </div>
        )
    }
}