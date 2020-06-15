import React, { Component } from "react";
import Layout from "../Home/Layout";
import { DetailsList, SelectionMode, ColumnActionsMode } from 'office-ui-fabric-react';
import Search from '../Common/Search';
import EditProfile from '../Common/EditProfile';

export default class DjList extends Component{
    constructor(props){
        super(props);

        this.state={
            showAddEditDj: false
        }

        this.columns= [
            {
                key: "column1",
                name: "Dj Name",
                fieldname: "Name",
                isResizable: true
            },
            {
                key: "column2",
                name: "Mobile",
                fieldname: "Mobile",
                isResizable: true
            },
            {
                key: "column3",
                name: "Email",
                fieldname: "Email",
                isResizable: true
            },
            {
                key: "column4",
                name: "City",
                fieldname: "City",
                isResizable: true
            },
            {
                key: "column5",
                name: "Action",
                fieldname: "Action",
                isResizable: true
            }
        ]
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
                            items={[]}
                            columns={this.columns}
                        />
                    </div>
                    <EditProfile showModal={this.state.showAddEditDj} dismissModalProps={this.dismissAddEditModalProps} />
                </Layout>
            </React.Fragment>
        )
    }
}

