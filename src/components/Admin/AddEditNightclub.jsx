import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";

//import { Modal } from 'office-ui-fabric-react';
import { FormControl, Image, Modal } from "react-bootstrap";
import "../Styles/UserRegistration.css";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Swal from "sweetalert2";
import { Label } from "office-ui-fabric-react/lib/Label";
import _ from "lodash";

const onlyDigitRegex = RegExp(/^[0-9]{12}$/);
const emailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]{2,})+$/);

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address format")
    .required("Email is required"),
  // password: Yup.string()
  //   .min(3, "Password must be 3 characters at minimum")
  //   .required("Password is required"),
  nightclub: Yup.string()
    .trim()
    .required(`Please provide your Nightclub's name`),
  mobile: Yup.string()
    .required("Please enter your contact number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be atleast 10 digits")
    .max(13, "Must be atmost 13 digits"),
  // bio: Yup.string().trim().required("Please fill in your bio"),
  address: Yup.string().trim().required("Please fill in your address"),
  licenseno: Yup.string().required("Your License number is mandatory"),
  city: Yup.string(),
  //   .required("Please enter your city"),
  // license: Yup.mixed().required(),
});

export default class AddEditNightclub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightclubItem: {
        nightclub: "",
        email: "",
        mobile: "",
        address: "",
        licenseno: "",
        // license: "",
        city: "",
      },
      showModal: false,
      isAdd: false,
      file: null,
      userRole: localStorage.getItem("Role"),
      profile_picture: {
        value: null,
        name: null,
      },
      previewImage: null,
    };
  }

  componentWillReceiveProps = (props) => {
    let data = props.profileData;
    this.setState({
      showModal: props.showModal,
      nightclubItem: {
        nightclub: data.firstName,
        email: data.emailId,
        address: data.address,
        mobile: data.phoneNumber,
        licenseno: data.licenseno,
        city: data.city,
      },
      isAdd: props.isAdd,
      previewImage:data.profileImage
    });
  };

  addNightClub = (values) => {};

  editNightclub = (values) => {
    let details = {
      address: values.address,
      city: values.city,
      emailId: values.email,
      firstName: values.nightclub,
      licenseno: values.licenseno,
      phoneNumber: values.mobile,
      role: "nightclub",
      status: this.props.profileData.status,
    };

    let formData = new FormData();
    formData.append("data", JSON.stringify(details));
    formData.append("profileImage", this.state.profile_picture.value);

    let url =
      this.state.userRole == "Admin"
        ? `/api/admin/user/nightclub/${this.props.profileData.id}`
        : `/api/user/nightclub/${this.props.profileData.id}`;
    apiAxios
      .put(url, formData, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        this.props.refetchData();
        Swal.fire("", `Nightclub information has been updated`, "success");
        this.props.dismissModal();
      })
      .catch((error) => {
        console.log(error.response);
        Swal.fire("", error.response?.data, "info");
      });
  };

  submit = (error, values) => {
    if (Object.entries(error).length == 0) {
      this.state.isAdd ? this.addNightClub(values) : this.editNightclub(values);
    }
  };

  renderAdminFileInput = () => {
    return (
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
          License File:
        </Label>
        {this.props.profileData.license ? (
          <a
            className={`col-md-6 align-self-center`}
            href={this.props.profileData.license}
            download
            target="_blank"
          >
            Download File
          </a>
        ) : (
          <span className="col-md-6 align-self-center">No file uploaded</span>
        )}
      </div>
    );
  };

  renderNightclubFileInput = () => {
    return (
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
          License File:
        </Label>
        {this.props.profileData.license ? (
          <a
            className={`col-md-6 align-self-center`}
            href={this.props.profileData.license}
            download
            target="_blank"
          >
            Download File
          </a>
        ) : (
          <span className="col-md-6 align-self-center">No file uploaded</span>
        )}

        <input
          type="file"
          accept="image/*, .pdf"
          className="col-md-6 offset-md-6"
          onChange={(e) => this.setState({ file: e.target.files[0] })}
        />
      </div>
    );
  };

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
                  this.props.dismissModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 style={{ margin: "2%", textAlign: "left", color: "#fff" }}>
                Nightclub Details
              </h4>
            </div>

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
                style={{ padding: "4px", marginBottom: "16px", width: "100%" }}
                onChange={(event) => this.editOnChangeHandler(event, "image")}
                accept={"image/*"}
              />
            </div>
            <div className="col-sm-12">
              <Formik
                initialValues={{ ...this.state.nightclubItem }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, touched, errors, isSubmitting }) => (
                  <>
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
                        Name:
                      </Label>
                      <Field
                        type="text"
                        name="nightclub"
                        disabled={this.state.userRole == "nightclub"}
                        placeholder="Enter Nightclub Name"
                        className={`form-control col-md-6 ${
                          touched.nightclub && errors.nightclub
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="nightclub"
                        className="invalid-feedback col-md-6 offset-md-5"
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
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        className={`form-control col-md-6 ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback col-md-6 offset-md-5"
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
                      <Field
                        type="text"
                        name="mobile"
                        placeholder="Enter Contact"
                        className={`form-control col-md-6 ${
                          touched.mobile && errors.mobile ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="mobile"
                        className="invalid-feedback col-md-6 offset-md-5"
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
                        Address:
                      </Label>
                      <Field
                        as="textarea"
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        className={`form-control col-md-6 ${
                          touched.address && errors.address ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="address"
                        className="invalid-feedback col-md-6 offset-md-5"
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
                      <Field
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        className={`form-control col-md-6 ${
                          touched.city && errors.city ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="city"
                        className="invalid-feedback col-md-6 offset-md-5"
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
                        License No.:
                      </Label>
                      <Field
                        type="text"
                        disabled={this.state.userRole == "nightclub"}
                        name="licenseno"
                        placeholder="Enter License Number"
                        className={`form-control col-md-6 ${
                          touched.licenseno && errors.licenseno
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="licenseno"
                        className="invalid-feedback col-md-6 offset-md-5"
                      />
                    </div>

                    {/* {localStorage.getItem("Role") == "Admin" */}
                    {/* ? this.renderAdminFileInput() */}
                    {/* : this.renderNightclubFileInput()} */}
                    {this.renderAdminFileInput()}

                    <div style={{ textAlign: "center", margin: "15px 0" }}>
                      <button
                        type="submit"
                        className="customBtn"
                        onClick={() => this.submit(errors, values)}
                      >
                        {this.state.isAdd ? "Add" : "Update"}
                      </button>
                      <button
                        type="button"
                        className="customBtnWhite ml-4"
                        onClick={() => {
                          this.props.dismissModal();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {/* <div className="row" style={{ marginBottom: "5%" }}>
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
                    License number:
                  </Label>
                  <TextField
                    className="col-md-6"
                    errorMessage={this.state.mobileError}
                    value={this.state.mobile}
                    onChange={(ev, mobile) => this.onMobileNoChange(ev, mobile)}
                  />
                </div> */}
              </Formik>
              {/* <div
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

              */}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
