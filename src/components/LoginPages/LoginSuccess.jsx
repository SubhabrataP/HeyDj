import React, { Component } from "react";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

export default class LoginSuccess extends Component{
    constructor(props){
        super(props);

        var url = window.location;
        var access_token = new URLSearchParams(url.search).get('state');
        localStorage.setItem("Token", access_token);

        // apiAxios.get(
        //     "/api/user"
        // )
        // .then((response) => {
        //     console.log(response);
        //     // if (response) {
        //     //     localStorage.setItem("Id", response.data.id);
        //     //     localStorage.setItem("PhoneNumber", response.data.phoneNumber);
        //     // }
        //     this.onDismiss();
        //     // this.props.history.push('/User');
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });

        if(access_token){
            this.props.history.push('/User')
        }
    }

    render(){
        return(
            <React.Fragment></React.Fragment>
        )
    }
}