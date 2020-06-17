import React, { Component } from "react";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import jwt, {jwt_decode} from 'jwt-decode'

export default class LoginSuccess extends Component{
    constructor(props){
        super(props);

        var url = window.location;
        var access_token = new URLSearchParams(url.search).get('state');
        var decoded_token = jwt(access_token);

        console.log(decoded_token);

        localStorage.setItem("Id", decoded_token.id);
        localStorage.setItem("Email", decoded_token.emailId);
        localStorage.setItem("Role", decoded_token.role);
        localStorage.setItem("Token", access_token);

        if (access_token) {
            decoded_token.role === "admin" ?
                this.props.history.push('/Admin')
                : decoded_token.role === "dj" ?
                    this.props.history.push('/Dj')
                    : this.props.history.push('/User')
        }
    }

    render(){
        return(
            <React.Fragment></React.Fragment>
        )
    }
}