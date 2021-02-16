import React, { Component } from "react";
import Layout from "../Home/Layout";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import * as moment from "moment";

export default class NightclubWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      account: null,
    };
  }

  componentDidMount() {
    this.getNightclub();
  }

  getNightclub = () => {
    apiAxios
      .get("/api/user/" + localStorage.getItem("Id"), {
        headers: {
          Authorization: this.token,
        },
      })
      .then((res) => {
        localStorage.setItem("account", JSON.stringify(res.data.account));
        this.setState({
          userData: res.data,
          account: res.data.account,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    let startDate = moment(this.state.account?.startDate).format("DD/MM/YYYY");
    let endDate = moment(this.state.account?.endDate).format("DD/MM/YYYY");
    return (
      <Layout history={this.props.history}>
        <div className="container" style={{ marginTop: "1%" }}>
          <div className="row">
            <div
              className="col-12 p-2 nightclub-wallet"
              style={{ background: " rgba(0,0,0,0.8)" }}
            >
              <p className="plan-name">
                Plan: <strong>{this.state.account?.plan?.planName}</strong>
              </p>
              <p>
                {" "}
                Valid From :{" "}
                <strong>
                  {startDate == "Invalid date" ? "N/A" : startDate}
                </strong>{" "}
                &nbsp; &nbsp; Valid Till :{" "}
                <strong>{endDate == "Invalid date" ? "N/A" : endDate}</strong>
              </p>
              {this.state?.account?.plan?.categories.map((item) => {
                return (
                  <p>
                    {item.name}:{" "}
                    <strong>
                      {item.unlimited == true ? "Unlimited" : item.hours} Hrs
                    </strong>
                    &nbsp; &#40;Remaining -{" "}
                    <strong>{item.used
                      ? Number(item.hours) - Number(item.used)
                      : item.hours}</strong>{" "}
                    Hrs&#41;
                  </p>
                );
              })}
            </div>
          </div>

          <br />
          <br />
        </div>
      </Layout>
    );
  }
}
