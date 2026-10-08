import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchBymaStocksData, fetchBondTerms } from "../../redux/actions/byma.action";
import { changeSelectedTicker } from "../../redux/actions/containers.action";
import CandleStickChart from "./CandleStickChart";
import ChartControlsBar from "./ChartControlsBar";

const mapStateToProps = (state) => ({
    bymaStocksData: state.byma.bymaStocksData,
});

const mapActionsToProps = (dispatch) => ({
    fetchBymaStocksData: bindActionCreators(fetchBymaStocksData, dispatch),
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onFetchBondTerms: (tickers) => dispatch(fetchBondTerms(tickers)),
});

const ChartChooser = ({
    bymaStocksData,
    fetchBymaStocksData,
    onChangeSelectedTicker,
    onFetchBondTerms,
    ...rest
}) => {
    const [yScale, setYScale] = useState("linear");
    const [timeRange, setTimeRange] = useState("1M");

    useEffect(() => {
        const storedTicker = localStorage.getItem("lastSelectedTicker");

        if (storedTicker) {
            try {
                const lastSelectedTicker = JSON.parse(storedTicker);

                onChangeSelectedTicker(lastSelectedTicker);
                onFetchBondTerms(lastSelectedTicker.tickers);
            } catch (error) {
                localStorage.removeItem("lastSelectedTicker");
            }
        }

        fetchBymaStocksData();
    }, []);

    const handleYScaleChange = (newScale) => {
        setYScale(newScale);
    };

    const handleTimeRangeChange = (newRange) => {
        setTimeRange(newRange);
    };

    return (
        <div>
            {!bymaStocksData || bymaStocksData.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div
                        style={{
                            width: "100%",
                            height: "calc(100vh - 90px)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CandleStickChart
                            data={bymaStocksData}
                            yScale={yScale}
                            timeRange={timeRange}
                            {...rest}
                        />
                    </div>

                    <ChartControlsBar
                        yScale={yScale}
                        onYScaleChange={handleYScaleChange}
                        timeRange={timeRange}
                        onTimeRangeChange={handleTimeRangeChange}
                    />
                </>
            )}
        </div>
    );
};

const enhance = (pure) => connect(mapStateToProps, mapActionsToProps)(pure);

export default enhance(ChartChooser);
