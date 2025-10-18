import React from "react";
import PropTypes from "prop-types";
import ChartLayout from "./ChartLayout";

class CandleStickChart extends React.Component {
    render() {
        const {data, ...rest} = this.props
        return <ChartLayout data={data} {...rest}/>;
    }
}

CandleStickChart.propTypes = {
    data: PropTypes.array.isRequired
};

CandleStickChart.defaultProps = {};

export default CandleStickChart;
