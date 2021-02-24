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
import Popups from "../Common/Popups";

const onlyDigitRegex = RegExp(/^[0-9]{12}$/);
const emailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]{2,})+$/);

const RegisterSchema = Yup.object().shape({
  payoutAmount: Yup.number()
    .min(1, "Payout amount must be atleast Rs. 1")
    .required("Payout amount is required"),
});

let initialItem = {
  payoutAmount: "",
};

export default class PayoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      subscriptionItem: { ...initialItem },
      showAlert: false,
      message: "",
      res: null,
    };
  }

  componentWillReceiveProps = ({ showModal, selectedDj = null, id }) => {
    this.setState({
      showModal,
      selectedDj,
      userid:id
    });
  };

  dismissAlert = () => {
    this.setState({ showAlert: false, message: "" });
  };

  submit = (values) => {
    apiAxios
      .post(
        "/api/admin/payout",
        {
          payoutAmount: values.payoutAmount,
          djId:this.state.userid
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            showAlert: true,
            message: "Payout updated",
            res: "success",
          });
          // this.props.dismissModal()
        }
      })
      .catch((err) => {
        this.setState({
          showAlert: true,
          message: "Could not update payout",
          res: "failed",
        });
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
                Payout Details
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
                        Payout Amount:
                      </Label>
                      <Field
                        type="number"
                        name="payoutAmount"
                        placeholder="Enter Payout Amount"
                        className={`form-control col-md-6 ${
                          touched.payoutAmount && errors.payoutAmount
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="payoutAmount"
                        className="invalid-feedback col-md-6 offset-md-5"
                      />
                    </div>

                    <div style={{ textAlign: "center", margin: "15px 0" }}>
                      <button
                        type="submit"
                        className="customBtn"
                        onClick={() => this.submit(values)}
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

          <Popups
            showModal={this.state.showAlert}
            message={this.state.message}
            isMultiButton={false}
            button1Click={
              this.state.res == "success"
                ? () => {
                    this.dismissAlert();
                    this.props.dismissModal();
                  }
                : () => {
                  this.dismissAlert()
                }
            }
          />
        </Modal>
      </div>
    );
  }
}
