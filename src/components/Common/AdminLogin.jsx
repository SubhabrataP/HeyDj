import React, { Component } from "react";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react';

export default class AdminLogin extends Component{
    constructor(props){
        super(props);

        this.state ={
            email: "",
            password: "",
            input:{
                type: "password",
                isMasked: true
            }
        }
    }

    showHidePassword = () => {
        let inputData = {
            type: this.state.input.isMasked ? "text" : "password",
            isMasked: !this.state.input.isMasked
        }
        this.setState({
            input: inputData
        })
    }

    onDismiss = () => {
        this.props.dismissModalProps();
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onLoginClick = () => {
        let data={
            "emailId": this.state.email,
            "password": this.state.password
        }
        
        apiAxios.post(
            "/api/auth", data
        )
        .then((response) => {
            console.log(response);
            if (response) {
                localStorage.setItem("Id", response.data.id);
                localStorage.setItem("Email", response.data.emailId);
                localStorage.setItem("Role", response.data.role);
            }
            this.onDismiss();
            this.props.history.push('/Admin');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <React.Fragment>
                <Modal
                    isOpen={this.props.showModal}
                    // isOpen= {true}
                    isModeless={false}
                    dragOptions={false}
                >
                    <div className="container">
                        <div className="row" style={{marginTop: "3%"}}>
                            <Label className="col-md-3">Email:</Label>
                            <input 
                                value={this.state.email}
                                onChange={(ev) => (this.onEmailChange(ev))}
                                className="col-md-8"
                                style={{ textAlign: "center", paddingRight: "2%", paddingLeft: "2%"}}
                            />
                        </div>
                        <div className="row" style={{marginTop: "3%"}}>
                            <Label className="col-md-4">Password:</Label>
                            <input 
                                type={this.state.input.type} 
                                value={this.state.password}
                                onChange={(ev) => (this.onPasswordChange(ev))}
                                className="col-md-7"
                                style={{ textAlign: "center", paddingRight: "8%", paddingLeft: "2%" }}
                            />
                            <span style={{ position: "absolute", marginTop: "2%", marginLeft: "83%" }}>
                                {this.state.input.isMasked ?
                                    <i className="fa fa-eye" aria-hidden="true" style={{ margin: "0%", padding: "0%" }} onClick={this.showHidePassword}></i>
                                    :
                                    <i className="fa fa-eye-slash" aria-hidden="true" style={{ margin: "0%", padding: "0%" }} onClick={this.showHidePassword}></i>
                                }
                            </span>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "10%", marginBottom: "5px" }}>
                            <button type="button" className="btn" style={{padding: "5px", border: "solid black 0.1px",marginRight: "10px"}} onClick={this.onLoginClick}>Login</button>
                            <button type="button" className="btn" style={{padding: "5px", border: "solid black 0.1px"}} onClick={this.onDismiss}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}