import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <Chart
      options={{
        ...this.state.chartOptions,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%', // Adjust the width of the bars here
            colors: {
              ranges: [{
                from: 3,
                to: 3,
                color: '#36def4' // Red color for 'Cancel'
              }, {
                from: 5,
                to: 7,
                color: '#21f33d' // Blue color for 'Pending'
              }, {
                from: 2,
                to: 2,
                color: '#f01616' // Green color for 'Completed'
              }, // Add more colors for other statuses as needed
            ]}
          }
        },
      }}
      series={this.state.chartData}
      type="bar"
      width="100%"
      height="100%"
      />
    );
  }
}

export default BarChart;
