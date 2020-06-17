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
            djDetails: []
        }
        this.columns= [
            {
                key: "column1",
                name: "Dj Name",
                fieldName: "firstName",
                isResizable: true
            },
            {
                key: "column2",
                name: "Mobile",
                fieldName: "phoneNumber",
                isResizable: true
            },
            {
                key: "column3",
                name: "Email",
                fieldName: "emailId",
                isResizable: true
            },
            {
                key: "column4",
                name: "City",
                fieldName: "city",
                isResizable: true
            },
            {
                key: "column5",
                name: "Action",
                isResizable: true,
                onRender: (item) => {
                    return (
                        <React.Fragment>
                            <button>Edit</button>
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
            showAddEditDj: true
        })
    }

    dismissAddEditModalProps = () => {
        this.setState({
            showAddEditDj: false
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
                                <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={this.onAddDjClick}>Add Dj</button>
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
                        dismissModalProps={() => (this.dismissAddEditModalProps)}
                        isAdd={true}
                        roleToBeAdded={"dj"}
                    />
                </Layout>
            </React.Fragment>
        )
    }
}

