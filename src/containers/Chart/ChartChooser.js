import React, {useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchBymaStocksData} from "../../redux/actions/byma.action";
import CandleStickChart from "./CandleStickChart";

const mapStateToProps = state => ({
    bymaStocksData: state.byma.bymaStocksData
});

const mapActionsToProps = dispatch => ({
    fetchBymaStocksData: bindActionCreators(fetchBymaStocksData, dispatch)
});

const ChartChooser = ({bymaStocksData, fetchBymaStocksData, ...rest}) => {
    useEffect(() => {
        fetchBymaStocksData();
    }, []);

    return (
        <div>
            {!bymaStocksData || bymaStocksData.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <CandleStickChart data={bymaStocksData} {...rest}/>
                </div>
            )}
        </div>
    );
};

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);

export default enhance(ChartChooser);
