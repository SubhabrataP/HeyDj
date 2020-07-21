import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

export default class NewReleaseFullPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genreItems: []
        }
    }

    componentDidMount(){
        this.getGenres();
    }

    getGenres = () => {
        apiAxios.get(
            "/api/genre"
        )
            .then((res) => {
                this.setState({
                    genreItems: res.data.genres,
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <div className="container" style={{ marginTop: "1%" }}>
                    <div>
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            <h3>Genres</h3>
                        </div>
                        <div className="row" >
                            {this.state.genreItems.map((data) => (
                                <div className="col-md-2 m-3">
                                    <CardTemplate
                                        playlistData={data}
                                        type={"genre"}
                                        history={this.props.history}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}