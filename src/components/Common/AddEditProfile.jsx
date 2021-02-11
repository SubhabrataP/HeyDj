import React, { Component } from "react";
//import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import AdditionalDjFields from "../Common/AdditionalDjFields";
import Swal from "sweetalert2";

const onlyDigitRegex = RegExp(/^[0-9]{12}$/);
const emailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]{2,})+$/);

export default class AddEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      profile_picture: {
        value: "",
        name: null,
      },
      selectedCategory: null,
      previewImage: "",
      firstNameError: "",
      mobileError: "",
      emailError: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "91",
      city: "",
      isValid: false,
      editedUserId: "",
      userNotExisting: true,
      workExpData: [
        {
          jobTitle: "",
          company: "",
          city: "",
          description: "",
        },
      ],
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      categories: [],
    };
  }

  UNSAFE_componentWillReceiveProps({ categories = [], ...nextProps }) {
    console.log(nextProps);
    this.setState({
      showModal: nextProps.showModal,
      categories: categories,
      selectedCategory:
        categories?.length !== 0
          ? nextProps?.profileData?.category
            ? nextProps?.profileData?.category
            : categories[0]?.id
          : null,
    });

    if (!(nextProps.profileData === undefined)) {
      let image = {
        value: nextProps.profileData.profileImage,
        name: "",
      };
      this.setState({
        firstName:
          nextProps.profileData.firstName === undefined
            ? ""
            : nextProps.profileData.firstName,
        lastName:
          nextProps.profileData.lastName === undefined
            ? ""
            : nextProps.profileData.lastName,
        email:
          nextProps.profileData.emailId === undefined
            ? ""
            : nextProps.profileData.emailId,
        mobile:
          nextProps.profileData.phoneNumber === undefined
            ? "91"
            : nextProps.profileData.phoneNumber,
        city:
          nextProps.profileData.city === undefined
            ? ""
            : nextProps.profileData.city,
        editedUserId:
          nextProps.profileData.id === undefined
            ? ""
            : nextProps.profileData.id,
        profile_picture: image,
        facebook:
          nextProps.profileData.facebook === undefined
            ? ""
            : nextProps.profileData.facebook,
        twitter:
          nextProps.profileData.twitter === undefined
            ? ""
            : nextProps.profileData.twitter,
        instagram:
          nextProps.profileData.instagram === undefined
            ? ""
            : nextProps.profileData.instagram,
        youtube:
          nextProps.profileData.youtube === undefined
            ? ""
            : nextProps.profileData.youtube,
        previewImage: nextProps.profileData.profileImage,
        workExpData:
          nextProps.profileData.workExperience === undefined
            ? [
                {
                  jobTitle: "",
                  company: "",
                  city: "",
                  description: "",
                },
              ]
            : nextProps.profileData.workExperience,
      });
    }
  }

  editOnChangeHandler = (event, element) => {
    if (element === "image") {
      let file = event.target.files[0];
      if (!file.type.includes("image")) {
        //TODO: Show Error
        console.error("Image is not Selected");
        return;
      }

      console.log(file);
      // Encodes Image to upload and Preview
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        this.setState({
          profile_picture: {
            value: file,
            name: file.name,
          },
          previewImage: reader.result,
        });
      }.bind(this);
    }

    // else {
    //   console.log(element, event.target.value);
    //   this.setState({
    //     editState: { ...this.state.editState, [element]: event.target.value },
    //   });
    // }
  };

  formValidation = () => {
    this.state.firstName.trim().length < 1
      ? this.setState({
          firstNameError: "First name is required.",
          firstName: "",
        })
      : this.setState({
          firstNameError: "",
          firstName: this.state.firstName.trim(),
        });

    var mobileNumber = this.state.mobile;
    mobileNumber.length == 0
      ? this.setState({
          mobileError: "Mobile number is required.",
        })
      : onlyDigitRegex.test(mobileNumber)
      ? this.setState({
          mobileError: "",
        })
      : this.setState({
          mobileError: "Please enter a valid 10 digit mobile number.",
        });

    this.state.email.trim().length < 1
      ? this.setState({
          emailError: "Email is required.",
        })
      : emailRegex.test(this.state.email.trim())
      ? this.setState({
          emailError: "",
        })
      : this.setState({
          emailError: "Please enter a valid email.",
        });
  };

  updateUserToDj = (userid) => {
    apiAxios
      .get("/api/admin/user/" + userid, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.emailId,
          mobile: res.data.phoneNumber,
          city: res.data.city,
          editedUserId: res.data.id,
          profile_picture: {
            value: res.data.profileImage,
            name: "",
          },
          previewImage: res.data.profileImage,
          userNotExisting: false,
        });
      })
      .catch((error) => {
        console.log(
          error.response === undefined ? error.response : error.response.data
        );
      });
  };

  onAddEditUser = async (workData) => {
    let isValid = false;
    await this.formValidation();
    if (
      this.state.mobileError == "" &&
      this.state.firstNameError == "" &&
      this.state.emailError == "" &&
      this.state.selectedCategory !== null
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    var bodyFormData = new FormData();
    bodyFormData.set("firstName", this.state.firstName);
    bodyFormData.set("lastName", this.state.lastName);
    bodyFormData.set("emailId", this.state.email);
    bodyFormData.set("phoneNumber", this.state.mobile);
    bodyFormData.set("role", this.props.roleToBeAdded);
    bodyFormData.set("city", this.state.city);
    bodyFormData.set("facebook", this.state.facebook);
    bodyFormData.set("youtube", this.state.youtube);
    bodyFormData.set("instagram", this.state.instagram);
    bodyFormData.set("twitter", this.state.twitter);
    bodyFormData.set("category", this.state.selectedCategory);
    bodyFormData.append("profileImage", this.state.profile_picture.value);

    if (isValid) {
      if (this.props.isAdd && this.state.userNotExisting) {
        apiAxios
          .post("/api/admin/user", bodyFormData, {
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          })
          .then((response) => {
            if (response.status == 200) {
              Swal.fire("Success", "Dj added successfully", "success");
              this.onDismiss();
            }
          })
          .catch((error) => {
            if (error.response.data.error.includes("user already exists")) {
              console.log(error.response.data.error + ". So you can update.");
              this.updateUserToDj(error.response.data.userId);
            } else {
              console.log(
                error.response === undefined
                  ? error.response
                  : error.response.data
              );

              Swal.fire("Failed", error.response.data.error, "warning")
            }
          });
      } else {
        if (localStorage.getItem("Role") === "admin") {
          apiAxios
            .put("/api/admin/user/" + this.state.editedUserId, bodyFormData, {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            })
            .then((res) => {
                if (res.status == 201) {
                    Swal.fire("Success", "Dj edited successfully", "success");
                    this.onDismiss();
                  }
            })
            .catch((error) => {
              console.log(
                error.response === undefined
                  ? error.response
                  : error.response.data
              );
            });
        } else {
          if (localStorage.getItem("Role") === "dj") {
            bodyFormData.set("workExperience", JSON.stringify(workData));
          }
          apiAxios
            .put("/api/user/" + this.state.editedUserId, bodyFormData, {
              headers: {
                Authorization: localStorage.getItem("Token"),
              },
            })
            .then((res) => {
              this.onDismiss();
            })
            .catch((error) => {
              console.log(
                error.response === undefined
                  ? error.response
                  : error.response.data.error
              );
            });
        }
      }
    }
  };

  onMobileNoChange = (ev, val) => {
    if (val.length > 1 && val.length < 13) {
      this.setState({ mobile: val, mobileError: "" });
    }
  };

  onDismiss = () => {
    this.setState({
      profile_picture: {
        value: "",
        name: null,
      },
      previewImage: "",
      firstNameError: "",
      mobileError: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      city: "",
      emailError: "",
      userNotExisting: true,
    });
    this.props.dismissModalProps();
  };

  render() {
    return (
      <div className="container">
        <Modal show={this.state.showModal} className="ml-3 mr-3">
          <div className="row popupModal">
            <div
              className="col-sm-12 text-center mb-2"
              style={{ borderBottom: "1px solid #fff" }}
            >
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  marginBottom: "2%",
                  textAlign: "right",
                  color: "#fff",
                }}
                onClick={() => {
                  this.onDismiss();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 style={{ margin: "2%", textAlign: "left", color: "#fff" }}>
                User Details
              </h4>
            </div>
            <div className="col-sm-12">
              <div
                className={"image-edit circle"}
                style={{ marginBottom: "3%", border: "solid 0.5px black" }}
              >
                <span className="overlay_profile">
                  <i
                    className="fa fa-plus upload-button"
                    onClick={() => {
                      this.upload.click();
                    }}
                  ></i>
                </span>
                <Image
                  className="profile-pic"
                  src={this.state.previewImage ? this.state.previewImage : ""}
                  roundedCircle
                />
                <FormControl
                  aria-label="Image"
                  type={"file"}
                  ref={(ref) => (this.upload = ref)}
                  style={{
                    padding: "4px",
                    marginBottom: "16px",
                    width: "100%",
                  }}
                  onChange={(event) => this.editOnChangeHandler(event, "image")}
                  accept={"image/*"}
                />
              </div>

              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  First Name:
                </Label>
                <TextField
                  className="col-md-6"
                  value={this.state.firstName}
                  onChange={(ev, firstName) =>
                    this.setState({ firstName, firstNameError: "" })
                  }
                  errorMessage={this.state.firstNameError}
                />
              </div>

              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  Last Name:
                </Label>
                <TextField
                  className="col-md-6"
                  value={this.state.lastName}
                  onChange={(ev, lastName) => this.setState({ lastName })}
                />
              </div>

              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  Email:
                </Label>
                <TextField
                  className="col-md-6"
                  value={this.state.email}
                  onChange={(ev, email) =>
                    this.setState({ email, emailError: "" })
                  }
                  errorMessage={this.state.emailError}
                />
              </div>

              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  Mobile:
                </Label>
                <TextField
                  className="col-md-6"
                  errorMessage={this.state.mobileError}
                  value={this.state.mobile}
                  onChange={(ev, mobile) => this.onMobileNoChange(ev, mobile)}
                />
              </div>

              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  City:
                </Label>
                <TextField
                  className="col-md-6"
                  value={this.state.city}
                  onChange={(ev, city) => this.setState({ city })}
                />
              </div>
              <div className="row" style={{ marginBottom: "5%" }}>
                <Label
                  className="col-md-5"
                  style={{
                    paddingLeft: "0%",
                    paddingRight: "0%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  Category:
                </Label>
                <div className="col-md-6">
                  <select
                    style={{ width: "100%" }}
                    value={this.state.selectedCategory}
                    onChange={(e) =>
                      this.setState({ selectedCategory: e.target.value })
                    }
                  >
                    {(this.state.categories || []).map((item) => (
                      <option value={item.id}>{item.categoryName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {localStorage.getItem("Role") === "dj" ? (
                <React.Fragment>
                  <Label
                    className="col-md-9"
                    style={{
                      paddingLeft: "5%",
                      paddingRight: "0%",
                      textAlign: "left",
                      color: "#fff",
                      fontSize: "22px",
                    }}
                  >
                    Profile Links
                  </Label>

                  <div className="row" style={{ marginBottom: "5%" }}>
                    <Label
                      className="col-md-5"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      Facebook:
                    </Label>
                    <TextField
                      className="col-md-6"
                      value={this.state.facebook}
                      onChange={(ev, facebook) => this.setState({ facebook })}
                    />
                  </div>

                  <div className="row" style={{ marginBottom: "5%" }}>
                    <Label
                      className="col-md-5"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      Twitter:
                    </Label>
                    <TextField
                      className="col-md-6"
                      value={this.state.twitter}
                      onChange={(ev, twitter) => this.setState({ twitter })}
                    />
                  </div>

                  <div className="row" style={{ marginBottom: "5%" }}>
                    <Label
                      className="col-md-5"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      Instagram:
                    </Label>
                    <TextField
                      className="col-md-6"
                      value={this.state.instagram}
                      onChange={(ev, instagram) => this.setState({ instagram })}
                    />
                  </div>

                  <div className="row" style={{ marginBottom: "5%" }}>
                    <Label
                      className="col-md-5"
                      style={{
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      You Tube:
                    </Label>
                    <TextField
                      className="col-md-6"
                      value={this.state.youtube}
                      onChange={(ev, youtube) => this.setState({ youtube })}
                    />
                  </div>
                </React.Fragment>
              ) : null}

              {localStorage.getItem("Role") === "dj" && !this.props.isAdd ? (
                <AdditionalDjFields
                  onUpdate={this.onAddEditUser}
                  onDismiss={this.onDismiss}
                  defaultData={this.state.workExpData}
                />
              ) : (
                <div style={{ textAlign: "center", margin: "15px 0" }}>
                  <button
                    type="button"
                    className="customBtn"
                    onClick={() => {
                      this.onAddEditUser();
                    }}
                  >
                    {this.props.isAdd && this.state.userNotExisting
                      ? "Add"
                      : "Update"}
                  </button>
                  <button
                    type="button"
                    className="customBtnWhite ml-4"
                    onClick={() => {
                      this.onDismiss();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
