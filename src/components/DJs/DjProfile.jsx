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
        this.setState({
            showEditProfile: true
        })
        apiAxios.get(
            "/api/user/" + localStorage.getItem('Id'),
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
            }
        )
        .then((res) => {
            console.log(res)
            this.setState({
                userData: res.data
            })
        })
        .catch(function (error) {
            alert(error.response.data);
        });
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
                        <i class="fa fa-facebook-f"></i><i class="fa fa-twitter"></i><i class="fa fa-instagram"></i><i class="fa fa-youtube"></i>
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