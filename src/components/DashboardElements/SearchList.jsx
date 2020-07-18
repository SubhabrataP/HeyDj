import React, { Component } from "react";
import Layout from "../Home/Layout";

export default class SearchList extends Component {
    constructor(props){
        super(props);

        console.log(this.props.history.location.state)
    }

    render(){
        return(
            <React.Fragment>
                <Layout history={this.props.history}>

                </Layout>
            </React.Fragment>
        )
    }
}