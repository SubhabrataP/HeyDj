import React, { Component } from "react";
// import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Modal } from 'office-ui-fabric-react';

export default class AdminLogin extends Component{

    onDismiss = () => {
        this.props.dismissModalProps();
    }

    render(){
        return(
            <React.Fragment>
                <Modal
                    isOpen={this.props.showModal}
                    isModeless={false}
                    dragOptions={false}
                    style={{width: "200px"}}
                >
                    <div className="container">
                        <div className="row" style={{marginTop: "3%"}}>
                            <Label className="col-md-3">Email:</Label>
                            <TextField
                                // value={this.state.OTP}
                                // onChange={(ev, val) => (this.onOTPChange(ev, val))}
                                className="col-md-9"
                                style={{ padding: "0%", textAlign: "center" }}
                            />
                        </div>
                        <div className="row" style={{marginTop: "3%"}}>
                            <Label className="col-md-4">Password:</Label>
                            <TextField
                                // value={this.state.OTP}
                                // onChange={(ev, val) => (this.onOTPChange(ev, val))}
                                className="col-md-8"
                                style={{ padding: "0%", textAlign: "center"}}
                            />
                        </div>
                        <div style={{ textAlign: "center", marginTop: "10%", marginBottom: "5px" }}>
                            <button type="button" className="btn" style={{padding: "5px", border: "solid black 0.1px",marginRight: "10px"}}>Login</button>
                            <button type="button" className="btn" style={{padding: "5px", border: "solid black 0.1px"}} onClick={this.onDismiss}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}