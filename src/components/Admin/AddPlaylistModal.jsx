import React, { Component } from "react";
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { Multiselect } from "multiselect-react-dropdown";
import Popups from "../Common/Popups";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const priceRegex = RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{2})?\s*$/);

export default class AddPlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContent: [],
      editPlaylistId: "",
      contentDetails: [],
      title: "",
      price: "",
      thumbnail: {
        path: "",
        value: "",
      },
      sampleContent: {
        name: "",
        value: "",
      },
      sampleContentType: "",
      sampleContentBlob: "",
      titleError: "",
      priceError: "",
      thumbnailError: "",
      sampleContentError: "",
      showAlert: false,
      alertMessage: "",
      isMultiButton: false,
      button1Text: "",
      showSpinner: false,
      genres: [],
      selectedGenre: "",
      djId: "",
    };

    this.getAllGenre();
  }

  getAllGenre = () => {
    apiAxios
      .get("/api/genre")
      .then((res) => {
        this.setState({
          genres: res.data.genres,
          selectedGenre:
            res.data.genres.length > 0 ? res.data.genres[0].id : "",
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onDropDownChange = (ev) => {
    this.setState({
      selectedGenre: ev.target.value,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        djId: nextProps.djId,
      },
      () => {
        this.getContentList();
      }
    );
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
            value: file,
          };
          this.setState({
            thumbnail: image,
            thumbnailError: "",
          });
        } else if (type === "multimedia") {
          if (file.type.includes("audio")) {
            this.setState({
              sampleContentType: "audio",
            });
          } else if (file.type.includes("video")) {
            this.setState({
              sampleContentType: "video",
            });
          } else {
            this.setState({
              sampleContentType: "",
            });
          }

          let blobData = new Blob([file]);

          this.setState({
            sampleContent: {
              name: file.name,
              value: file,
            },
            sampleContentError: "",
            sampleContentBlob: blobData,
          });
        }
      }.bind(this);
    }
  };

  formValidation = () => {
    this.state.title.trim().length < 1
      ? this.setState({
          title: "",
          titleError: "Title is required.",
        })
      : this.setState({
          titleError: "",
          title: this.state.title.trim(),
        });

    priceRegex.test(this.state.price)
      ? this.setState({
          priceError: "",
        })
      : this.setState({
          priceError: "Please enter a valid Price amount.",
        });

    this.state.sampleContent.name === ""
      ? this.setState({
          sampleContentError: "Sample track is required.",
        })
      : this.setState({
          sampleContentError: "",
        });

    this.state.thumbnail.value === ""
      ? this.setState({
          thumbnailError: "Thumbnail is required.",
        })
      : this.setState({
          thumbnailError: "",
        });
  };

  onCreateEdit = async () => {
    let isValid = false;
    await this.formValidation();

    if (
      this.state.titleError === "" &&
      this.state.priceError === "" &&
      this.state.thumbnailError === "" &&
      this.state.sampleContentError === ""
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    if (isValid) {
      this.setState({
        showSpinner: true,
      });

      if (this.state.selectedContent.length > 0) {
        let contentIds = [];
        this.state.selectedContent.map((data) => {
          contentIds.push(data.id);
        });

        var bodyFormData = new FormData();
        bodyFormData.set("title", this.state.title);
        bodyFormData.set("price", this.state.price);
        bodyFormData.set("genre", this.state.selectedGenre);
        bodyFormData.set("content", JSON.stringify(contentIds));
        bodyFormData.append("thumbnail", this.state.thumbnail.value);
        bodyFormData.set("sampleType", this.state.sampleContentType);

        apiAxios
          .post("/api/admin/playlist", bodyFormData, {
            params: {
              user: this.state.djId,
            },
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          })
          .then((res) => {
            console.log(res.data);
            this.addSampleContentUrl(
              res.data.sampleContentUploadUrl,
              "Playlist added succesfully"
            );
          })
          .catch((error) => {
            this.setState({
              showSpinner: false,
            });
            console.log(error.response);
          });
      } else {
        this.setState({
          alertMessage: "Select atleast one from contents list.",
          showAlert: true,
        });
      }
    }
  };

  addSampleContentUrl = (url, alertMessage) => {
    axios
      .put(url, this.state.sampleContentBlob)
      .then((res) => {
        console.log("res", res);
        this.setState({
          alertMessage: alertMessage,
          showAlert: true,
          showSpinner: false,
        });
        this.onDismiss();
      })
      .catch((error) => {
        this.setState({
          showSpinner: false,
        });
        console.log(error.response);
      });
  };

  dismissAlert = () => {
    this.setState({
      showAlert: false,
      showSpinner: false,
    });
  };

  getContentList = () => {
    apiAxios
      .get("/api/admin/content", {
        params: {
          user: this.state.djId,
        },
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        var x = res.data.contents.map((data) => {
          return {
            id: data.id,
            name: data.title,
          };
        });
        this.setState({
          contentDetails: x,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onDismiss = () => {
    this.setState(
      {
        contentDetails: [],
        title: "",
        price: "",
        thumbnail: {
          path: "",
          value: "",
        },
        sampleContent: {
          name: "",
          value: "",
        },
        sampleContentType: "",
        sampleContentBlob: "",
        titleError: "",
        priceError: "",
        thumbnailError: "",
        sampleContentError: "",
        editPlaylistId: "",
        selectedContent: [],
      },
      () => {
        this.props.onDismiss();
      }
    );
  };

  onSelect = (selectedList, selectedItem) => {
    this.state.selectedContent.push(selectedItem);
  };

  onRemove = (selectedList, removedItem) => {
    this.setState(
      {
        selectedContent: this.state.selectedContent.filter(
          (x) => x.id !== removedItem.id
        ),
      },
      () => {
        console.log(this.state.selectedContent);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Modal
            show={this.props.showModal}
            // className="ml-3 mr-3"
          >
            {this.state.showSpinner ? (
              <div
                style={{
                  margin: "0",
                  paddingTop: "4%",
                  paddingBottom: "4%",
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: "#252133",
                }}
              >
                <CircularProgress size={"80px"} />
                <div>
                  <labe>Please do not refesh this page.</labe>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <h4
                  style={{
                    margin: "0",
                    paddingTop: "4%",
                    paddingBottom: "4%",
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "#252133",
                  }}
                >
                  Add Playlist
                </h4>
                <div className="container loginBg">
                  <div className="row mt-4">
                    <Label
                      className="col-md-2"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      Title:
                    </Label>
                    <TextField
                      className="col-md-8"
                      value={this.state.title}
                      onChange={(ev, title) =>
                        this.setState({ title, titleError: "" })
                      }
                      errorMessage={this.state.titleError}
                    />
                  </div>

                  <div className="row mt-2">
                    <Label
                      className="col-md-2"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      Price:
                    </Label>
                    <TextField
                      className="col-md-4"
                      value={this.state.price}
                      onChange={(ev, price) =>
                        this.setState({ price, priceError: "" })
                      }
                      errorMessage={this.state.priceError}
                    />
                    <Label
                      className="col-md-4"
                      style={{
                        paddingLeft: "1%",
                        paddingRight: "0%",
                        textAlign: "left",
                        color: "#fff",
                      }}
                    >
                      {" "}
                      / per Hour
                    </Label>
                  </div>

                  <div className="row mt-2">
                    <Label
                      className="col-md-2"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "right",
                        color: "#fff",
                      }}
                    >
                      Genre:
                    </Label>
                    <select
                      className="col-md-5"
                      style={{ marginLeft: "15px" }}
                      value={this.state.selectedGenre}
                      onChange={(ev) => {
                        this.onDropDownChange(ev);
                      }}
                    >
                      {this.state.genres.map((data) => {
                        return <option value={data.id}>{data.name}</option>;
                      })}
                    </select>
                  </div>

                  <div className="row mt-2 mb-2">
                    <Label
                      className="col-md-12"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Sample Track:
                    </Label>
                    <div className="col-md-12">
                      <FormControl
                        type={"file"}
                        style={{
                          padding: "7px",
                          marginBottom: "6px",
                          width: "100%",
                          border: "1px solid",
                        }}
                        onChange={(event) => {
                          this.editOnChangeHandler(event, "multimedia");
                        }}
                        accept={"audio/*, video/*"}
                        ref={(ref) => (this.fileChange = ref)}
                      />
                    </div>
                    {this.state.sampleContentError === "" ? null : (
                      <span style={{ color: "red" }}>
                        {this.state.sampleContentError}
                      </span>
                    )}
                    <div
                      className="col-md-12"
                      style={{ color: "black", paddingLeft: "7%" }}
                    >
                      {this.state.sampleContent.name === "" ? (
                        ""
                      ) : (
                        <div className="row">
                          <Label style={{ textAlign: "center", color: "#fff" }}>
                            {this.state.sampleContent.name}
                          </Label>
                          <button
                            className="customBtn"
                            style={{ marginLeft: "5px" }}
                            onClick={() => {
                              this.fileChange.click();
                            }}
                          >
                            Change
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={"image-edit"}>
                    <Label
                      className="col-md-4"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Thumbnail:
                    </Label>

                    {this.state.thumbnail.path != "" && (
                      <Image src={this.state.thumbnail.path} thumbnail />
                    )}

                    <FormControl
                      aria-label="Image"
                      type={"file"}
                      ref={(ref) => (this.upload = ref)}
                      style={{
                        padding: "4px",
                        marginBottom: "16px",
                        width: "100%",
                      }}
                      onChange={(event) =>
                        this.editOnChangeHandler(event, "image")
                      }
                      accept={"image/*"}
                    />
                    {this.state.thumbnailError === "" ? null : (
                      <span style={{ color: "red" }}>
                        {this.state.thumbnailError}
                      </span>
                    )}
                    <span>
                      <i
                        className="fa fa-plus upload-button"
                        style={{ color: "#6eb1c2" }}
                        onClick={() => {
                          this.upload.click();
                        }}
                      ></i>
                      Add
                    </span>
                  </div>

                  <Label
                    className="col-md-12"
                    style={{
                      paddingLeft: "0%",
                      paddingRight: "0%",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    Contents:
                  </Label>
                  <Multiselect
                    options={this.state.contentDetails} // Options to display in the dropdown
                    selectedValues={this.state.selectedContent} // Preselected value to persist in dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />

                  <div
                    className="mb-3"
                    style={{ textAlign: "center", marginTop: "15px" }}
                  >
                    <button
                      type="button"
                      className="customBtn"
                      onClick={() => {
                        this.onCreateEdit();
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="customBtnWhite ml-3"
                      onClick={() => {
                        this.onDismiss();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </Modal>
        </div>

        <Popups
          showModal={this.state.showAlert}
          message={this.state.alertMessage}
          isMultiButton={this.state.isMultiButton}
          button1Click={() => {
            this.dismissAlert();
          }}
          button1Text={this.state.button1Text}
        />
      </React.Fragment>
    );
  }
}
