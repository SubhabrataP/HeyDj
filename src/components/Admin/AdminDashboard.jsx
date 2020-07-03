import React, { Component } from "react";
import Layout from "../Home/Layout";
import { Chart } from "react-google-charts";

export default class AdminDashboard extends Component{

    render(){
        return(
            <Layout history={this.props.history}>
                <div className="row" style={{ marginTop: "2%" }}>
                	<div className="col-md-10 offset-md-1">
                    	<h4>Welcome Admin</h4>
                    </div>
                </div>
                <div className="row">
                	<div className="col-md-6 offset-md-1 dj-play-list p-3 text-center" style={{height:'800px'}}>
                    	<Chart
						  width={'500px'}
						  height={'300px'}
						  chartType="ScatterChart"
						  loader={<div>Loading Chart</div>}
						  data={[['Months', 'Total Revenue'], [0, 1], [1, 33], [2, 269], [3, 2013]]}
						  options={{
						    title: 'Revenue Generated',
						    hAxis: { title: 'Months', minValue: 0, maxValue: 3 },
						    vAxis: { title: 'Total Revenue', minValue: 0, maxValue: 2100 },
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
						    ['DJs', 10, '#b87333', null],
						    ['Users', 78, 'silver', null],
						    ['Subscriptions', 45, 'gold', null],
						    ['Active Subscriptions', 21, 'color: #e5e4e2', null],
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
                    		<h3><b>25</b></h3>
                    		<p>DJs Onboarded</p>
                    	</div>
                    	<div className="p-3 pl-4 mb-3" style={{backgroundColor:'#3a3352'}}>
                    		<h3><b>250</b></h3>
                    		<p>Users</p>
                    	</div>
                    	<div className="p-3 pl-4 mb-3" style={{backgroundColor:'#62868f'}}>
                    		<h3><b>86</b></h3>
                    		<p>Subscriptions</p>
                    	</div>
                    	<div className="p-3 pl-4" style={{backgroundColor:'#566468'}}>
                    		<h3><b>INR 96200</b></h3>
                    		<p>Revenue Generated</p>
                    	</div>
                    </div>
                </div>
            </Layout>
        )
    }
}