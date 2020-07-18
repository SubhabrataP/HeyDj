import React, { Component } from "react";
import Layout from "../Home/Layout";


export default class GenreList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Layout history={this.props.history}>

                </Layout>
            </React.Fragment>
        )
    }
}