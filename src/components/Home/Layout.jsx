import React, { Component } from "react";
import Header from "./Header";


export default class Layout extends Component {

    render() {
        return (
        	<div id={this.props.id || ""} className={this.props.className || ""}>
	            <div className="col-md-12" style={{ marginTop: "3%" }}>
	                <Header history={this.props.history} />
	            </div>
	            <div className="col-md-12" style={{ marginTop: "3%", padding: "0" }}>
	            	<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
					  <div class="carousel-inner">
					    <div class="carousel-item active">
					      <img class="d-block w-100" src={process.env.PUBLIC_URL + "/images/slider1.png"} alt="First slide" />
					    </div>
					    <div class="carousel-item">
					      <img class="d-block w-100" src={process.env.PUBLIC_URL + "/images/slider2.png"} alt="Second slide" />
					    </div>
					    <div class="carousel-item">
					      <img class="d-block w-100" src={process.env.PUBLIC_URL + "/images/slider3.png"} alt="Second slide" />
					    </div>
					  </div>
					</div>
	            </div>
	            
	            <div className="col-md-12" style={{ marginTop: "0%" }}>    
	                {this.props.children}
	            </div>
            </div>
        )
    }
}