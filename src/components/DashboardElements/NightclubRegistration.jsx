import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
import Layout from "../Home/Layout";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  name: Yup.string().trim().required(`Please provide your Nightclub's name`),
  contact: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  bio: Yup.string().trim().required("Please fill in your bio"),
  address: Yup.string().trim().required("Please fill in your address"),
  licenseno: Yup.string().required("Your Nighclub License number is mandatory"),
  license: Yup.mixed().required(),
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout history={this.props.history}>
        <div
          className="container"
          style={{ marginTop: "1%", marginBottom: "2%" }}
        >
          <div>
            <div className="row" style={{ paddingBottom: "10px" }}>
              <h3>Nightclub Registration</h3>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={({ setSubmitting }) => {
                // setSubmitting(false);
                Swal.fire("", "Registered Successfully", "success").then(() => {
                  this.props.history.push("/");
                });
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
                  <div className="form-group">
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
                  </div>
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
                    <label htmlFor="bio">Bio*</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="bio"
                      placeholder="Enter Bio"
                      className={`form-control ${
                        touched.bio && errors.bio ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="bio"
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

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
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
