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

import {UNLIMITED_HOURS_CAP} from '../Common/Constants'
const onlyDigitRegex = RegExp(/^[0-9]{12}$/);
const emailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]{2,})+$/);

const RegisterSchema = Yup.object().shape({
  planName: Yup.string()
    .trim()
    .min(1)
    .max(50)
    .required("Package Name is required"),
  additionalCost: Yup.string()
    .trim()
    .required(`Please provide a cost for this package`),
  // description: Yup.string().trim().required("Please fill in a description"),
  planConfig: Yup.object(),
});

export default class AddPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      categories: [],
      subscriptionItem: {
        planName: "",
        additionalCost: 0,
      },
      selectedCategories: [],
      isAdd: true,
    };
  }

  componentWillReceiveProps = (props) => {

    const getCategories = () => {
      let categories = props.selectedItem.categories.map((item) => {
        let {costPerHour} = props.categories.filter(element=>element.id == item.category)[0]
        return {...item, costPerHour}
    })
    return categories
  }
    this.setState({
      showModal: props.showModal,
      categories: props.categories,
      isAdd: props.isAdd,
      subscriptionItem: props.isAdd
        ? {
            planName: "",
            additionalCost: 0,
          }
        : props.selectedItem,
      selectedCategories: props.isAdd ? [] : getCategories(),
    });
  };
  

  renderCategories = () => {
    return this.state.categories.map((item) => {
      return (
        <option
          value={item.id}
          key={item.id}
          disabled={
            this.state.selectedCategories.findIndex(
              (el) => el.category == item.id
            ) != -1
          }
        >
          {item.categoryName}
        </option>
      );
    });
  };

  addCategory = () => {
    if (this.state.categories.length === this.state.selectedCategories.length) {
      return Swal.fire("", "You have run out of categories");
    } else {
      let selectedCategories = [...this.state.selectedCategories];
      let category = this.state.categories.filter(
        (item) =>
          this.state.selectedCategories.findIndex(
            (el) => el.category == item.id
          ) == -1 && item
      )[0];
      selectedCategories.push({
        category: category.id,
        hours: 0,
        unlimited: false,
        costPerHour: Number(category.costPerHour),
      });

      console.log(selectedCategories);
      this.setState({ selectedCategories });
    }
  };

  onHoursChange = (e, id) => {
    let selectedCategories = [...this.state.selectedCategories];
    let categoryIndex = selectedCategories.findIndex(
      (elem) => elem.category == id
    );
    console.log(categoryIndex);
    if (categoryIndex !== -1) {
      selectedCategories[categoryIndex].hours = e.target.value;
    }
    this.setState({ selectedCategories });
  };

  onUnlimitedChange = (e, id) => {
    let selectedCategories = [...this.state.selectedCategories];
    let categoryIndex = selectedCategories.findIndex(
      (elem) => elem.category == id
    );
    // console.log(categoryIndex);
    if (categoryIndex !== -1) {
      selectedCategories[categoryIndex].unlimited = e.target.checked;
    }
    this.setState({ selectedCategories });
  };
  onCategoryChange = (event, item) => {
    let selectedCategories = [...this.state.selectedCategories];
    let categoryIndex = selectedCategories.findIndex(
      (elem) => elem.category == item.category
    );
    console.log(categoryIndex);
    if (categoryIndex !== -1) {
      selectedCategories[categoryIndex].category = event.target.value;
      selectedCategories[
        categoryIndex
      ].costPerHour = this.state.categories.filter(
        (elem) => elem.id == item.category
      )[0].costPerHour;
    }
    // selectedCategories[index].hours = 0;
    this.setState({ selectedCategories });
  };

  render() {
    let cost = 0;
    this.state.selectedCategories.forEach((item) => {
      if (item.unlimited) {
        cost += item.costPerHour * UNLIMITED_HOURS_CAP;
      } else {
        cost += item.costPerHour * item.hours;
      }
    });

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
                Package Details
              </h4>
            </div>

            <div className="col-sm-12">
              <Formik
                initialValues={{ ...this.state.subscriptionItem }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                  this.props.submitPackage(values);
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
                        Package Name:
                      </Label>
                      <Field
                        type="text"
                        name="planName"
                        placeholder="Enter Package Name"
                        className={`form-control col-md-6 ${
                          touched.planName && errors.planName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="planName"
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
                        Additional Cost:
                      </Label>
                      <Field
                        type="text"
                        name="additionalCost"
                        placeholder="Enter Cost"
                        className={`form-control col-md-6 ${
                          touched.additionalCost && errors.additionalCost
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="additionalCost"
                        className="invalid-feedback col-md-6 offset-md-5"
                      />
                    </div>

                    <div
                      className="row flex-column align-items-center"
                      style={{ marginBottom: "5%" }}
                    >
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
                        Select Category<small>(ies)</small>:
                      </Label>
                      <div className="row align-items-center container">
                        {this.state.selectedCategories.map((item, index) => {
                          return (
                            <React.Fragment key={item.category}>
                              <select
                                className="form-control col-4 mb-0 mt-2"
                                value={item.category}
                                onChange={(e) => this.onCategoryChange(e, item)}
                              >
                                {this.renderCategories()}
                              </select>
                              <div className="form-group col-8 mb-0 mt-2">
                                <input
                                  type="number"
                                  placeholder="12"
                                  min={0}
                                  disabled={item.unlimited}
                                  value={item.hours}
                                  className="form-control w-25 d-inline-block"
                                  onChange={(e) =>
                                    this.onHoursChange(e, item.category)
                                  }
                                />
                                &nbsp;
                                <span>Hours</span>
                                &nbsp; (OR) &nbsp;
                                <input
                                  type="checkbox"
                                  id={`unlimited-${index}`}
                                  name="unlimited"
                                  checked={item.unlimited}
                                  onChange={(e) =>
                                    this.onUnlimitedChange(e, item.category)
                                  }
                                  // value={}
                                  // onChange={(e)=>{}}
                                />
                                &nbsp;
                                <label for={`unlimited-${index}`}>
                                  Unlimited
                                </label>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <i
                        className="fa fa-plus add-category"
                        onClick={this.addCategory}
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
                        Base Cost:
                      </Label>
                      <Field
                        type="text"
                        name="basecost"
                        disabled
                        value={cost}
                        placeholder="Base Cost"
                        className={`form-control col-md-6`}
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
                        Final Cost:
                      </Label>
                      {console.log(values)}
                      <Field
                        type="number"
                        disabled
                        placeholder="Final Cost"
                        value={cost + Number(values.additionalCost)}
                        className={`form-control col-md-6 `}
                      />
                    </div>
                    {console.log(errors)}

                    <div style={{ textAlign: "center", margin: "15px 0" }}>
                      <button
                        type="submit"
                        className="customBtn"
                        disabled={Object.keys(errors).length != 0}
                        onClick={
                          this.state.isAdd
                            ? () =>
                                this.props.submitPackage({
                                  ...values,
                                  categories: this.state.selectedCategories,
                                })
                            : () =>
                                this.props.editPackage({
                                  ...values,
                                  categories: this.state.selectedCategories,
                                })
                        }
                      >
                        {this.state.isAdd ? "Add" : "Update"}
                      </button>
                      <button
                        type="button"
                        className="customBtnWhite ml-4"
                        onClick={() => {
                          this.setState({
                            subscriptionItem: {
                              planName: "",
                              cost: 0,
                              additionalCost: 0,
                            },
                            selectedCategories: [],
                          });
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
