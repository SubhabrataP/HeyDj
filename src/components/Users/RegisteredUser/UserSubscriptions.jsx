import React, { Component } from "react";
import FeaturedPlaylist from "../../DashboardElements/FeaturedPlaylist";
import Layout from "../../Home/Layout";
import { apiAxios } from "../../APIaxios/ApiAxiosCalls";
import Popups from "../../Common/Popups";
import * as Constants from "../../Common/Constants"

export default class UserSubscriptions extends Component {
    constructor(props){
        super(props);

        this.state={
            showAlert: false,
            alertMessage: "",
            isMultiButton: false,

        }

        this.getAllSubscriptions();
    }

    getAllSubscriptions = () => {
        apiAxios.get("api/subscription",
        {
            headers: {
                'Authorization': localStorage.getItem('Token')
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            if(error.response.status === 404){
                this.setState({
                    showAlert: true,
                    alertMessage: Constants.NO_DATA_FOUND,
                    isMultiButton: false,
                })
            }
        })
    }

    dismissAlert = () => {
        this.setState({
            showAlert: false,
            alertMessage: "",
            isMultiButton: false,
        })
    }

    render() {
        return (
            <Layout history={this.props.history} >
                <div className="row" style={{ marginTop: "2%" }}>
                    <div className="col-md-10 offset-md-1">
                        
                    </div>
                </div>
                {this.state.isMultiButton ?
                    null
                    :
                    <Popups
                        showModal={this.state.showAlert}
                        message={this.state.alertMessage}
                        isMultiButton={false}
                        button1Click={() => { this.dismissAlert() }}
                    />}
            </Layout>
        )
    }
}