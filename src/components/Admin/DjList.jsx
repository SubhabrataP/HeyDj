import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode, ColumnActionsMode } from 'office-ui-fabric-react';
import Search from '../Common/Search';
import AddEditProfile from '../Common/AddEditProfile';
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

const headers = {
    'Authorization': localStorage.getItem('Token')
}

export default class DjList extends Component{
    constructor(props){
        super(props);

        this.state={
            showAddEditDj: false,
            djDetails: [],
            isAdd: true,
            editProfileData: {}

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
                minWidth: 150,
                maxWidth: 150,
            },
            {
                key: "column5",
                name: "Action",
                isResizable: false,
                onRender: (item) => {
                    return (
                        <React.Fragment>
                            <button onClick={() => (this.editProfile(item))}>Edit</button>
                            <button onClick={() => (this.deleteProfile(item.id))}>Delete</button>
                        </React.Fragment>
                    )
                }
            }
        ]
    }

    componentDidMount(){
        this.getAllDjsList();
    }

    deleteProfile = (id) => {
        apiAxios.delete(
            "/api/admin/user/"+id,
            {
                headers: headers,
            }
        )
        .then((res) => {
            this.getAllDjsList();
        })
        .catch(function (error) {
            alert('Error');
        });
    }

    getAllDjsList = () => {
        apiAxios.get(
            "/api/admin/user",
            {
                headers: headers,
                params: {
                    role: "dj"
                }
            }
        )
        .then((res) => {
            res.data.map((val) => {
                val.fullName = val.firstName + " " + val.lastName
            })
            this.setState({
                djDetails: res.data
            })
        })
        .catch(function (error) {
            alert('Error');
        });
    }

    onAddDjClick = () => {
        this.setState({
            showAddEditDj: true,
            isAdd: true
        })
    }

    dismissAddEditModalProps = () => {
        this.getAllDjsList();
        this.setState({
            showAddEditDj: false,
            editProfileData: {},
            isAdd: true
        })
    }

    editProfile = (item) => {
        this.setState({
            isAdd: false,
            showAddEditDj: true,
            editProfileData: item
        })
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-8"}>DJ Details List</h5>
                            <div className={"row col-md-4"} style={{textAlign: "right"}}>
                                <Search />
                                <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onAddDjClick())}>Add Dj</button>
                            </div>
                        </div>

                        <DetailsList
                            className="row"
                            selectionMode={SelectionMode.none}
                            items={this.state.djDetails}
                            columns={this.columns}
                        />
                    </div>
                    <AddEditProfile
                        showModal={this.state.showAddEditDj}
                        dismissModalProps={() => (this.dismissAddEditModalProps())}
                        isAdd={this.state.isAdd}
                        roleToBeAdded={"dj"}
                        profileData={this.state.isAdd ? {} : this.state.editProfileData}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}

