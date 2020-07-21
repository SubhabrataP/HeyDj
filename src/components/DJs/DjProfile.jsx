import React, { Component } from "react";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

export default class DjProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userData: "",
        }
    }

    componentDidMount(){
        if(this.state.userData === ""){
            this.getProfile();
        } 
    }

    getProfile = () => {
        apiAxios.get(
            "/api/user/" + localStorage.getItem('Id'),
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
            }
        )
        .then((res) => {
            this.setState({
                userData: res.data
            })
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    profileLinksClick = (url) => {
        if (url !== undefined && url !== null && url !== "") {
            if (url.includes("https://") || url.includes("http://")) {
                window.open(url, "_blank");
            }
            else {
                let httpUrl = "https://" + url;
                window.open(httpUrl, "_blank");
            }
        }
    }

    render() {
        return (
            <>
                <div className="text-center" style={{color:'#fff'}}>
                    <img
                        src={this.state.userData.profileImage}
                        alt="logo"
                        style={{ borderRadius: '50%', padding: '5% 15%' }}
                    />
                    <h4>{this.state.userData.firstName + this.state.userData.lastName}</h4>
                    <span>
                        {this.state.userData.city === "" ? "" :
                            <React.Fragment>
                                <i class="fa fa-map-marker"></i>{this.state.userData.city}
                            </React.Fragment>}
                    </span>
                    <h4>
                        <i class="fa fa-facebook-f" onClick={()=>{this.profileLinksClick(this.state.userData.facebook)}}>
                        </i>
                        <i class="fa fa-twitter" onClick={()=>{this.profileLinksClick(this.state.userData.twitter)}}>
                        </i>
                        <i class="fa fa-instagram" onClick={()=>{this.profileLinksClick(this.state.userData.instagram)}}>
                        </i>
                        <i class="fa fa-youtube" onClick={()=>{this.profileLinksClick(this.state.userData.youtube)}}>
                        </i>
                    </h4>
                    <p>{"+" + this.state.userData.phoneNumber}</p>
                    <p>{this.state.userData.emailId}</p>
                </div>
                <div className="text-left mt-5 mb-3">
                    {(this.state.userData.workExperience === "" || this.state.userData.workExperience === undefined) ?
                        null :
                        this.state.userData.workExperience.map((data) => (
                            <div style={{marginBottom: "15px"}}>
                                <h5><b>{data.jobTitle}</b></h5>
                                <p>{"At " + data.company}</p>
                                <small>{data.description}</small>
                            </div>
                        ))}
                </div>

            </>
        )
    }
}