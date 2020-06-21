import React, { Component } from "react";
import Layout from "../Home/Layout";
import AddEditContent from "../Common/AddEditContent";

export default class MyContent extends Component{

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>
                    <div className="container" style={{ marginTop: "1%" }}>
                        <div className="row" style={{ marginBottom: "1%" }}>
                            <h5 className={"col-md-8"}>My Content</h5>
                            <div className={"row col-md-4"} style={{textAlign: "right"}}>
                                {/* <Search /> */}
                                {/* <button style={{ marginLeft: "10%", paddingLeft: "5px", paddingRight: "5px" }} onClick={() => (this.onAddDjClick())}>Add Dj</button> */}
                            </div>
                        </div>

                        <div className="row">
                            
                        </div>
                    </div>
                    <AddEditContent />
                </Layout>
            </React.Fragment>
        )
    }
}