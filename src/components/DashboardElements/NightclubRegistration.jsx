import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { UNLIMITED_HOURS_CAP, PAY_KEY_ID } from "../Common/Constants";
import Loader from "../Common/Loader";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address format")
    .required("Email is required"),
  // password: Yup.string()
  //   .min(3, "Password must be 3 characters at minimum")
  //   .required("Password is required"),
  name: Yup.string()
    .trim()
    .min(5, "Name must be at least 5 characters long")
    .required(`Please provide your Nightclub's name`),
  contact: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  // bio: Yup.string().trim().required("Please fill in your bio"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .trim()
    .required("Please fill in your address"),
  licenseno: Yup.string().required("Your Nighclub License number is mandatory"),
  city: Yup.string().required("Please enter your city"),
  // license: Yup.mixed().required(),
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      plans: [],
      selectedPlan: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchPlans();
  }

  fetchPlans() {
    apiAxios.get("/api/plans").then((res) =>
      this.setState({
        plans: res.data.plans,
        // count: res.data.data.count,
      })
    );
  }
  addNightClub = (values) => {
    this.setState({ loading: true });
    let details = {
      firstName: values.name,
      emailId: values.email,
      phoneNumber: `91${values.contact}`,
      address: values.address,
      licenseno: values.licenseno,
      role: "nightclub",
      city: values.city,
    };

    let formData = new FormData();
    formData.append("data", JSON.stringify(details));
    formData.append("license", this.state.file);

    apiAxios
      .post("/api/user/nightclub", formData)
      .then((response) => {
        if (response.data.status === 200) {
          this.getTransactionDetails(response.data, values);
        } else {
          return Swal.fire("", response.data.message, "info");
        }
      })
      .catch((error) => {
        return Swal.fire("", error.message, "info");
      });
  };

  getCost = (plan) => {
    let count = Number(plan.additionalCost) || 0;
    plan.categories.forEach((element) => {
      count +=
        Number(element.costPerHour) *
        (element.unlimited == true
          ? Number(UNLIMITED_HOURS_CAP)
          : Number(element.hours));
    });
    return count;
  };

  getHours = (item) => {
    let unlimited = false;
    let count = 0;
    item.categories.forEach((element) => {
      if (unlimited !== true) {
        if (element.unlimited === true) {
          unlimited = true;
          return;
        }
        count += Number(element.hours);
      }
    });

    return unlimited ? "Unlimited" : count;
  };

  verifyPayment = (order_id, user_id, payment_successfull) => {
    apiAxios
      .post("/api/payment/verify-subscription", {
        success: payment_successfull,
        order_id,
        user_id,
      })
      .then((res) => {
        return Swal.fire(
          "Success",
          "Account successfully registered",
          "success"
        ).then(() => {
          this.setState({ loading: false });
          this.props.history.push("/");
        });
      })
      .catch((err) =>
        Swal.fire("Failed", err.message, "warning").then(() =>
          this.setState({ loading: false })
        )
      );
  };

  paySubscriptionFees = (values, name, user_id) => {
    console.log("opening rzp");
    let options = {
      key: PAY_KEY_ID,
      amount: values.amount_due,
      name: name,
      order_id: values.id,
      handler: function (response) {
        this.verifyPayment(values.id, user_id, true);
      }.bind(this),
      theme: {
        color: "#F37254",
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  };

  getTransactionDetails = (details, values) => {
    console.log(details);
    let data = {
      user_id: details.id,
      planId: this.state.selectedPlan.id,
      cost: this.getCost(this.state.selectedPlan),
    };
    apiAxios
      .put(`/api/playlist/nightclub/${data.user_id}/subscribe`, data)
      .then((res) => {
        let { transactionDetails } = res.data;
        this.paySubscriptionFees(transactionDetails, values.name, details.id);
      });
  };

  render() {
    return (
      <Layout history={this.props.history}>
        <Loader isLoading={this.state.loading} />

        <div
          className="container"
          style={{ marginTop: "1%", marginBottom: "2%" }}
        >
          <div>
            <div className="row" style={{ paddingBottom: "10px" }}>
              <h3>Nightclub Registration</h3>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                console.log(values);
                if (this.state.file == null) {
                  return Swal.fire(
                    "",
                    "Please upload your license for verification",
                    "info"
                  );
                } else {
                  this.addNightClub(values);
                }
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Nightclub*</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Nightclub Name"
                      className={`form-control ${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="contact">Contact*</label>
                    <Field
                      type="number"
                      name="contact"
                      placeholder="Enter Contact Number"
                      className={`form-control ${
                        touched.contact && errors.contact ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="contact"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address*</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      className={`form-control ${
                        touched.address && errors.address ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="address"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">City*</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      className={`form-control ${
                        touched.city && errors.city ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="city"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group w-25">
                    <label htmlFor="licenseno">License No.*</label>
                    <Field
                      type="text"
                      name="licenseno"
                      placeholder="Enter License Number"
                      className={`form-control ${
                        touched.licenseno && errors.licenseno
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="licenseno"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group w-25">
                    <label htmlFor="license">License*</label>
                    <Field
                      type="file"
                      name="license"
                      onChange={(e) =>
                        this.setState({ file: e.target.files[0] })
                      }
                      placeholder="Enter license Number"
                      className={`form-control ${
                        touched.license && errors.license ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="license"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12 package-list">
                      <h4>Select Package</h4>
                      <div class="custom-choose row">
                        {(this.state.plans || []).map((item) => {
                          return (
                            <div
                              className={`col-md-3`}
                              key={item.id}
                              onClick={() =>
                                this.setState({ selectedPlan: item })
                              }
                            >
                              <input
                                type="radio"
                                id={`opt-${item.id}`}
                                className="plan1"
                                value={item.id}
                                name={item.planName}
                              />
                              <label
                                for="opt-1"
                                className={`${
                                  this.state.selectedPlan?.id == item.id
                                    ? "active-plan"
                                    : ""
                                }`}
                              >
                                <h2>
                                  {item.planName}
                                  <br />
                                  Rs. {this.getCost(item)}
                                </h2>

                                <h3>{this.getHours(item)} Hrs</h3>
                                {item.categories.map((item) => {
                                  return (
                                    <p>
                                      {item.categoryName}:{" "}
                                      {item.unlimited == true
                                        ? "Unlimited"
                                        : item.hours}{" "}
                                      Hrs
                                    </p>
                                  );
                                })}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    // disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    );
  }
}
