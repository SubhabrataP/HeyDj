import React, { Component } from "react";
import Layout from "../Home/Layout";
import { Chart } from "react-google-charts";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";
import TextField from '@material-ui/core/TextField';
import Popups from "../Common/Popups";
import * as Constants from "../Common/Constants"

export default class AdminDashboard extends Component{
	constructor(props){
		super(props);

		this.state = {
			totalData: "",
			monthlyData: "",
			isMonthlyData: false,
			fromDate: "",
			toDate: "",
			showAlert: false,
			alertMessage: "",
			curveData: [['Months', 'Total Revenue']]
		}

		this.getTotalData();
		this.createCurveData();
	}

	getCurveValues = (from, to, count) => {
		if (count === 4) {
			apiAxios.get("/api/admin/report",
				{
					params: {
						"from": from,
						"to": to
					},
					headers: {
						'Authorization': localStorage.getItem('Token')
					},
				})
				.then((res) => {
					this.setState(prevState => ({
						curveData: [...prevState.curveData, [count, res.data.report.earnings]]
					}), () => { this.getCurveValues(from, to, count - 1) })
				})
				.catch((error) => {
					console.log(error)
				})
		}
		if (count > 0 && count < 4) {
			let month = new Date(from).getMonth() + 1;
			let year = new Date(from).getFullYear();
			let date = new Date(from).getDate();

			let toNew = from;

			if (month <= 1) {
				month = 12;
				year = year - 1;
			}
			else {
				month = month - 1;
			}

			let fromNew = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? "0" + date : date);

			apiAxios.get("/api/admin/report",
				{
					params: {
						"from": fromNew,
						"to": toNew
					},
					headers: {
						'Authorization': localStorage.getItem('Token')
					},
				})
				.then((res) => {
					this.setState(prevState => ({
						curveData: [...prevState.curveData, [count, res.data.report.earnings]]
					}), () => { this.getCurveValues(fromNew, toNew, count - 1) })
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	createCurveData = () => {
		let month = new Date().getMonth() + 1;
		let year = new Date().getFullYear();
		let date = new Date().getDate();

		let to = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? "0" + date : date);

		if (month - 1 < 1) {
			month = 12;
			year = year - 1;
		}
		else {
			month = month - 1;
		}

		let from = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? "0" + date : date);

		this.getCurveValues(from, to, 4);
	}

	getTotalData = () => {
		apiAxios.get("/api/admin/report?from=2020-06-22&to=2020-07-22",
		{
			headers: {
				'Authorization': localStorage.getItem('Token')
			},
		})
		.then((res)=>{
			this.setState({
				totalData: res.data.report
			})
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	onDateChange = (event, type) => {
		if (type === "from") {
			this.setState({
				fromDate: event.target.value.split('T')[0]
			})
		}
		else if (type === "to") {
			this.setState({
				toDate: event.target.value.split('T')[0]
			})
		}
	}

	getMonthlyData = () => {
		let from = new Date(this.state.fromDate);
		let to = new Date(this.state.toDate);

		if (from < to) {
			apiAxios.get("/api/admin/report",
				{
					params: {
						"from": from,
						"to": to
					},
					headers: {
						'Authorization': localStorage.getItem('Token')
					},
				})
				.then((res) => {
					this.setState({
						monthlyData: res.data.report
					})
				})
				.catch((error) => {
					console.log(error)
				})
		}
		else {
			this.setState({
				showAlert: true,
				alertMessage: Constants.TO_LESSTHAN_FROM
			})
		}
	}

	onMonthlyToggle = () => {
		this.setState({
			isMonthlyData: !this.state.isMonthlyData
		}, ()=> {
			if(!this.state.monthlyData){
				this.getTotalData();
			}
		})
	}

	alertOkClick = () => {
        this.setState({
            showAlert: false,
            alertMessage: ""
        })
    }

    render(){
        return(
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                	<div className="col-md-10 offset-md-1">
                    	<h4>Welcome Admin</h4>
                    </div>
                </div>

				<div className="row">
					<div className="col-md-10 offset-md-1" style={{ marginTop: "2%", marginBottom: "1%" }}>
						{this.state.isMonthlyData ?
							<React.Fragment>
								Get <button className="customBtn" onClick={() => { this.onMonthlyToggle() }}>Total</button> report
								<div style={{ marginTop: "2%", marginBottom: "1%" }}>
									<span>From : </span>
									<TextField
										id="datetime-local"
										type="datetime-local"
										style={{ background: "#fff", height: "100%", marginLeft: "15px" }}
										onChange={(ev) => { this.onDateChange(ev, "from") }}
									/>
									<span style={{ marginLeft: "15px" }}>To : </span>
									<TextField
										id="datetime-local"
										type="datetime-local"
										style={{ background: "#fff", height: "100%", marginLeft: "15px" }}
										onChange={(ev) => { this.onDateChange(ev, "to") }}
									/>
									{this.state.fromDate !== "" && this.state.toDate !== "" ?
										<button className="customBtn" style={{ marginLeft: "15px" }} onClick={() => { this.getMonthlyData() }}>Get</button> 
										:
										<button className="customBtn" style={{ marginLeft: "15px" }} disabled={true} >Get</button>
									}
								</div>
							</React.Fragment>
							:
							<React.Fragment>
								Get <button className="customBtn" onClick={() => { this.onMonthlyToggle() }}>Monthly</button> report
							</React.Fragment>
						}
						
					</div>
				</div>

                <div className="row">
                	<div className="col-md-6 offset-md-1 dj-play-list p-3 text-center" style={{height:'800px'}}>
                    	<Chart
						  width={'500px'}
						  height={'300px'}
						  chartType="ScatterChart"
						  loader={<div>Loading Chart</div>}
						  data={this.state.curveData}
						  options={{
						    title: 'Last 4 months Revenue',
						    hAxis: { title: 'Months', minValue: 0, maxValue: 4 },
						    vAxis: { title: 'Total Revenue', minValue: 0, maxValue: 10000 },
						    trendlines: {
						      0: {
						        type: 'exponential',
						        color: '#6eb1c2',
						      },
						    },
						  }}
						  rootProps={{ 'data-testid': '3' }}
						/>

						<Chart
						  className="mt-3"	
						  width={'500px'}
						  height={'300px'}
						  chartType="BarChart"
						  loader={<div>Loading Chart</div>}
						  data={[
						    [
						      'Element',
						      'Density',
						      { role: 'style' },
						      {
						        sourceColumn: 0,
						        role: 'annotation',
						        type: 'string',
						        calc: 'stringify',
						      },
						    ],
						    ['DJs', this.state.isMonthlyData ? this.state.monthlyData.djs : this.state.totalData.totalDjs, '#b87333', null],
						    ['Users', this.state.isMonthlyData ? this.state.monthlyData.users : this.state.totalData.totalUsers, 'silver', null],
							['Subscriptions', this.state.isMonthlyData ? this.state.monthlyData.subscriptions : this.state.totalData.totalSubscriptions, 'gold', null],
							['Revenue (* K)', this.state.isMonthlyData ? (this.state.monthlyData.earnings/1000) : (this.state.totalData.totalEarnings/1000), 'red', null],
						  ]}
						  options={{
						    title: 'Overview',
						    width: 600,
						    height: 400,
						    bar: { groupWidth: '95%' },
						    legend: { position: 'none' },
						  }}
						  // For tests
						  rootProps={{ 'data-testid': '6' }}
						/>
                    </div>
                    <div className="col-md-4 dj-play-list p-3 ml-2">
                    	<div className="p-3 pl-4 mb-3" style={{backgroundColor:'#6eb1c2'}}>
							<h3><b>{this.state.totalData.totalDjs}</b></h3>
                    		<p>DJs Onboarded</p>
                    	</div>
                    	<div className="p-3 pl-4 mb-3" style={{backgroundColor:'#3a3352'}}>
                    		<h3><b>{this.state.totalData.totalUsers}</b></h3>
                    		<p>Users</p>
                    	</div>
                    	<div className="p-3 pl-4 mb-3" style={{backgroundColor:'#62868f'}}>
                    		<h3><b>{this.state.totalData.totalSubscriptions}</b></h3>
                    		<p>Subscriptions</p>
                    	</div>
                    	<div className="p-3 pl-4" style={{backgroundColor:'#566468'}}>
                    		<h3><b>INR {this.state.totalData.totalEarnings}</b></h3>
                    		<p>Revenue Generated</p>
                    	</div>
                    </div>
                </div>

				<Popups
                    showModal={this.state.showAlert}
                    message={this.state.alertMessage}
                    isMultiButton={false}
                    button1Click={() => { this.alertOkClick() }}
                />
            </Layout>
        )
    }
}