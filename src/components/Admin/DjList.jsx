import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode } from 'office-ui-fabric-react';
import Search from '../Common/Search';
import AddEditProfile from '../Common/AddEditProfile';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants"

export default class DjList extends Component{
    constructor(props){
        super(props);

        this.state={
            showAddEditDj: false,
            djDetails: [],
            isAdd: true,
            editProfileData: {},
            itemsPerPage: 5,
            showAlert: false,
            deleteId: 0,
            alertMessage: "",
            filteredDjList: []
        }
        this.columns= [
            {
                key: "column1",
                name: "Dj Name",
                fieldName: "fullName",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                key: "column2",
                name: "Mobile",
                fieldName: "phoneNumber",
                isResizable: false,
                minWidth: 200,
                maxWidth: 200,
            },
            {
                key: "column3",
                name: "Email",
                fieldName: "emailId",
                isResizable: false,
                minWidth: 300,
                maxWidth: 300,
            },
            {
                key: "column4",
                name: "City",
                fieldName: "city",
                isResizable: false,
                minWidth: 125,
                maxWidth: 125,
            },
            {
                key: "column5",
                name: "Action",
                isResizable: false,
                minWidth: 150,
                maxWidth: 150,
                onRender: (item) => {
                    return (
                        <React.Fragment>
                            <button className="customBtn" onClick={() => (this.editProfile(item))}>Edit</button>
                            <button className="customBtnWhite ml-1" onClick={() => (this.showDeleteAlert(item.id))}>Delete</button>
                        </React.Fragment>
                    )
                }
            }
        ];

        this.getAllDjsList();
    }

    showDeleteAlert = (id) => {
        this.setState({
            showAlert: true,
            deleteId: id,
            alertMessage: Constants.ACTION_DELETE
        })
    }

    onDismissAlert = () => {
        this.setState({
            showAlert: false,
            deleteId: 0,
            alertMessage: ""
        });
    }

    deleteProfile = () => {
        apiAxios.delete(
            "/api/admin/user/" + this.state.deleteId,
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                }
            }
        )
        .then((res) => {
            this.onDismissAlert();
            this.getAllDjsList();
        })
        .catch(function (error) {
            alert(error.response.data);
        });
    }

    getAllDjsList = () => {
        apiAxios.get(
            "/api/admin/user",
            {
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
                params: {
                    role: "dj"
                }
            }
        )
            .then((res) => {
                console.log("djs: ", res.data)
                res.data.map((val) => {
                    val.fullName = val.firstName + " " + val.lastName
                });
                this.setState({
                    djDetails: res.data,
                    filteredDjList: res.data
                })
            })
            .catch(function (error) {
                alert(error.response.data);
            });
    }

    onAddDjClick = () => {
        this.setState({
            showAddEditDj: true,
            isAdd: true,
            editProfileData: {}
        })
    }

    dismissAddEditModalProps = () => {
        this.setState({
            showAddEditDj: false,
        })
        this.getAllDjsList();
    }

    editProfile = (item) => {
        this.setState({
            isAdd: false,
            showAddEditDj: true,
            editProfileData: item
        })
    }

    onLoadMoreClick = () => {
        this.setState({
            itemsPerPage: this.state.itemsPerPage + 5,
        })
    }

    onSearchDj = (event) => {
        if (event.target.value.trim().length > 0) {
            this.setState({
                filteredDjList: this.state.filteredDjList.filter(x => x.fullName.toLowerCase().includes(event.target.value.trim().toLowerCase()))
            });
        }
        else {
            this.setState({
                filteredDjList: this.state.djDetails
            });
        }
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-8"}>DJ Details List</h5>
                            <div className={"row col-md-4"} style={{textAlign: "right"}}>
                                <input  type="search" placeholder="Search Djs" onChange={this.onSearchDj} />
                                <button className="customBtn" style={{ marginLeft: "10%" }} onClick={() => (this.onAddDjClick())}>Add Dj</button>
                            </div>
                        </div>

                        <div className="row">
                            <DetailsList
                                selectionMode={SelectionMode.none}
                                items={this.state.filteredDjList.slice(0, this.state.itemsPerPage)}
                                columns={this.columns}
                            />
                        </div>
                        <div>
                            {this.state.filteredDjList.length > this.state.itemsPerPage
                                ? <button onClick={this.onLoadMoreClick}>Load More</button>
                                : null}
                        </div>
                    </div>
                    <AddEditProfile
                        showModal={this.state.showAddEditDj}
                        dismissModalProps={() => (this.dismissAddEditModalProps())}
                        isAdd={this.state.isAdd}
                        roleToBeAdded={"dj"}
                        profileData={this.state.editProfileData}
                    />
                    <Popups
                        showModal={this.state.showAlert} 
                        message={this.state.alertMessage}
                        isMultiButton= {true}
                        button1Click={() => {this.deleteProfile()}}
                        button2Click={() => {this.onDismissAlert()}}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}

