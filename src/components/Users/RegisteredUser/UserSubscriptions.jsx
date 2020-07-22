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
            currentSubscriptions: [],
            upcomingSubscriptions: [],
            expiredSubscriptions: [],
            currentPlaylists: [],
            upcomingPlaylists: [],
            expiredPlayLists: []
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
            console.log(res.data);
            let today = new Date();
            today.setSeconds(0);

            res.data.currentSubscriptions.map((data) => {
                let startDate = new Date(data.startFrom);
                let endDate = new Date(data.startFrom);
                endDate.setHours(endDate.getHours() + parseInt(data.hours));
                startDate.setSeconds(0);
                endDate.setSeconds(0);

                if(startDate > today){
                    this.state.upcomingSubscriptions.push(data);
                }
                if(startDate <= today && endDate >= today){
                    this.state.currentSubscriptions.push(data);
                }
            })

            this.setState({
                expiredSubscriptions: res.data.expiredSubscriptions
            });

            this.getPlaylistByUser();

            console.log("upcomingSubscriptions :", this.state.upcomingSubscriptions);
            console.log("currentSubscriptions :", this.state.currentSubscriptions);
            console.log("expiredSubscriptions :", this.state.expiredSubscriptions);

            // this.setState({
            //     Playlists: res.data.currentSubscriptions,
            //     expiredPlayLists: res.data.expiredSubscriptions
            // })
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

    formatDate = (date) => {
        var d = new Date(date);
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh-12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }
        m = m<10?"0"+m:m;
        
        s = s<10?"0"+s:s;
    
        /* if you want 2 digit hours: */
        h = h<10?"0"+h:h;
    
        var pattern = new RegExp("0?"+hh+":"+m+":"+s);
        return date.replace(pattern,h+":"+m+":"+s+" "+dd)
    }
    

    getPlaylistByUser = () => {
        apiAxios.get("api/subscription/e028c76f-ba4d-4b47-b9a6-77ff349ce8d8",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            })
        .then((res) => {
            console.log("subscription details 1 ", res.data)
        })
        .catch((error) => {})
        
    //     apiAxios.get("api/subscription/6caa5247-571a-4adf-bf81-d38b0c42d6b3",
    //     {
    //         headers: {
    //             'Authorization': localStorage.getItem('Token')
    //         }
    //     })
    // .then((res) => {
    //     console.log("subscription details 2 ", res.data)
    // })
    // .catch((error) => {})

        apiAxios.get("api/playlist/1fc1a3ed-3ecf-4ca1-9ade-86b3e16d50d5",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            })
        .then((res) => {
            console.log("playlist 1 ", res.data)
        })
        .catch((error) => {})

        // apiAxios.get("api/playlist/47dc9543-a160-476f-be2e-ba0bbee5ea70",
        //     {
        //         headers: {
        //             'Authorization': localStorage.getItem('Token')
        //         }
        //     })
        // .then((res) => {
        //     console.log("playlist 2 ", res.data)
        // })
        // .catch((error) => {})
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