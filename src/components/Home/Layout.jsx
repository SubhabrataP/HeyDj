import React, { Component } from "react";
import Header from "./Header";


export default class Layout extends Component {

    render() {
        return (
        	<div id={this.props.id || ""} className={this.props.className || ""}>
	            <div className="col-md-12" style={{ marginTop: "3%" }}>
	                <Header history={this.props.history} />
	            </div>
	            <div className="col-md-12" style={{ marginTop: "3%" }}>    
	                {this.props.children}
	            </div>
            </div>
        )
    }
}