import React from "react";
import ReactApexChart from 'react-apexcharts';

class Chart extends React.Component {
    render() {
        return <ReactApexChart options={this.props.options} series={this.props.series} type={this.props.type} height={350} />;
        /*master에서 테스트하느라 수정해봄*/
    }
}

export default Chart;
