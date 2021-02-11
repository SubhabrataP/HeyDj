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
  categoryName: Yup.string()
    .trim()
    .min(1)
    .max(50)
    .required("Package Name is required"),
  costPerHour: Yup.string()
    .trim()
    .required(`Please provide a cost for this package`),
});

let initialItem = {
  categoryName: "",
  costPerHour: 0,
};

export default class AddEditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isAdd: true,
      subscriptionItem: { ...initialItem },
    };
  }

  componentWillReceiveProps = ({
    showModal,
    isAdd,
    categoryItem = { ...initialItem },
  }) => {
    this.setState({
      showModal,
      isAdd,
      subscriptionItem: isAdd ? initialItem : categoryItem,
    });
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
                Category Details
              </h4>
            </div>

            <div className="col-sm-12">
              <Formik
                initialValues={{ ...this.state.subscriptionItem }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                  this.props.submit(values);
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
                        Category Name:
                      </Label>
                      <Field
                        type="text"
                        name="categoryName"
                        placeholder="Enter Category Name"
                        className={`form-control col-md-6 ${
                          touched.categoryName && errors.categoryName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="categoryName"
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
                        Per Hr Cost:
                      </Label>
                      <Field
                        type="text"
                        name="costPerHour"
                        placeholder="Enter Cost"
                        className={`form-control col-md-6 ${
                          touched.costPerHour && errors.costPerHour
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="costPerHour"
                        className="invalid-feedback col-md-6 offset-md-5"
                      />
                    </div>

                    <div style={{ textAlign: "center", margin: "15px 0" }}>
                      <button
                        type="submit"
                        className="customBtn"
                        onClick={this.state.isAdd ? () => this.props.submit(values) : ()=>this.props.edit(values)}
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
              </Formik>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
