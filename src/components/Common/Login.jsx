import React, { Component } from "react";
import PhoneInput from 'react-phone-input-2';
import { Modal } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            showModal: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        });
    }

    onDismiss = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.showModal}
                    isModeless={false}
                    dragOptions={false}
                >
                    
                    <div className="row">
                        <Label required className="col-md-4">Mobile</Label>
                        <PhoneInput
                            className= "col-md-8"
                            country={'in'}
                            onlyCountries={['in']}
                            value={this.state.phoneNumber}
                            onChange={phone => this.setState({ phoneNumber: phone })}
                            countryCodeEditable={false}
                        />
                    </div>
                    <div style={{textAlign:"center", marginTop: "15px"}}>
                            <button type="button" className="btn">Verify</button>
                            <button type="button" className="btn" onClick={()=> {this.onDismiss()}}>Cancel</button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}