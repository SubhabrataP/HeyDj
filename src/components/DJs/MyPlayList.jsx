import React, { Component } from "react";
import Layout from "../Home/Layout";

export default class MyPlayList extends Component{

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-8"}>My Playlists</h5>
                            <div className={"row col-md-4"} style={{textAlign: "right"}}>
                                {/* <Search /> */}
                                {/* <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onAddDjClick())}>Add Dj</button> */}
                            </div>
                        </div>

                        <div className="row">
                            {/* <DetailsList
                                selectionMode={SelectionMode.none}
                                items={this.state.djDetails}
                                columns={this.columns}
                            /> */}
                        </div>
                    </div>
                    {/* <AddEditProfile
                        showModal={this.state.showAddEditDj}
                        dismissModalProps={() => (this.dismissAddEditModalProps())}
                        isAdd={this.state.isAdd}
                        roleToBeAdded={"dj"}
                        profileData={this.state.editProfileData}
                    /> */}
                </Layout>
            </React.Fragment>
        )
    }
}