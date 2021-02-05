import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address format")
    .required("Email is required"),
  // password: Yup.string()
  //   .min(3, "Password must be 3 characters at minimum")
  //   .required("Password is required"),
  name: Yup.string().trim().min(5, "Name must be at least 5 characters long").required(`Please provide your Nightclub's name`),
  contact: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  // bio: Yup.string().trim().required("Please fill in your bio"),
  address: Yup.string().min(10,"Address mnust be at least 10 characters").trim().required("Please fill in your address"),
  licenseno: Yup.string().required("Your Nighclub License number is mandatory"),
  city:Yup.string().required("Please enter your city")
  // license: Yup.mixed().required(),
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };
  }

  addNightClub = (values) => {


    let details = {
      firstName: values.name,
      emailId: values.email,
      phoneNumber: `91${values.contact}`,
      address: values.address,
      licenseno: values.licenseno,
      role: "nightclub",
      city:values.city
    };

    let formData = new FormData()
    formData.append('data', JSON.stringify(details))
    formData.append('license', this.state.file) 

    apiAxios
      .post("/api/user/nightclub", formData)
      .then((response) => {
        if(response.data.status === 200 ) {
          return Swal.fire("","Account registered successfully", "success")
          .then(()=>{
            this.props.history.push('/')
          })
        }
        else{
          return Swal.fire("", response.data.message, "info")
        }

        
      })
      .catch((error) => {
          return Swal.fire("",error.message,"info" )
      });
  };

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
              onSubmit={(values) => {
                console.log(values);
                if (this.state.file == null) {
                  return Swal.fire(
                    "",
                    "Please upload your license for verification",
                    "info"
                  );
                }
                this.addNightClub(values);
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
                                    <div className="col-md-3">
                                    <input type="radio" id="opt-1" className="plan1" value="Male" name="gender"/>
     <label for="opt-1">
         <h2>Basic Plan<br/>Rs. 8,000</h2>
         <h3>100 Hrs</h3>
         <p>Category A - 25Hrs</p>
         <p>Category B - 25Hrs</p>
         <p>Category C - 25Hrs</p>
     </label>
                                    </div>
                                    <div className="col-md-3">
                                    <input type="radio" id="opt-2" className="plan2" value="Female" name="gender"/>
     <label for="opt-2">
     <h2>Basic Plan<br/>Rs. 8,000</h2>
         <h3>100 Hrs</h3>
         <p>Category A - 25Hrs</p>
         <p>Category B - 25Hrs</p>
         <p>Category C - 25Hrs</p>
     </label>
                                    </div>
     
                                    <div className="col-md-3">
                                    <input type="radio" id="opt-3" className="plan3" value="Other" name="gender"/>
     <label for="opt-3">
     <h2>Basic Plan<br/>Rs. 8,000</h2>
         <h3>100 Hrs</h3>
         <p>Category A - 25Hrs</p>
         <p>Category B - 25Hrs</p>
         <p>Category C - 25Hrs</p>
     </label>
                                        </div>    
     
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
