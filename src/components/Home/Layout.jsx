import React, { Component } from "react";
import Header from "./Header";


export default class Layout extends Component {

    render() {
        return (
            <div className="col-md-12" style={{ marginTop: "3%" }}>
                <Header history={this.props.history} />
                {this.props.children}
            </div>
        )
    }
}