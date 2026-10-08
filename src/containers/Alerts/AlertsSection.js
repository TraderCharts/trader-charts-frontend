import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    fetchAlertConditionExpressions,
    fetchAlertConditionOperations,
    fetchBymaStocksData,
    fetchBondTerms,
} from "../../redux/actions/byma.action";
import {
    fetchAlertsSagaRequest,
    fetchNegotiableInstrumentsAlertsSagaRequest,
} from "../../redux/sagas/actions/byma.action";
import { changeSelectedTicker } from "../../redux/actions/containers.action";
import AlertPointsTable from "./AlertPointsTable";
import AlertsTable from "./AlertsTable";

const mapStateToProps = (state) => ({
    bymaStocksData: state.byma.bymaStocksData,
});

const mapActionsToProps = (dispatch) => ({
    onFetchBymaStocksData: bindActionCreators(fetchBymaStocksData, dispatch),
    onFetchAlertsSagaRequest: bindActionCreators(fetchAlertsSagaRequest, dispatch),
    onFetchNegotiableInstrumentsAlertsSagaRequest: bindActionCreators(
        fetchNegotiableInstrumentsAlertsSagaRequest,
        dispatch
    ),
    onFetchAlertConditionExpressions: bindActionCreators(fetchAlertConditionExpressions, dispatch),
    onFetchAlertConditionOperations: bindActionCreators(fetchAlertConditionOperations, dispatch),
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onFetchBondTerms: (tickers) => dispatch(fetchBondTerms(tickers)),
});

const AlertsSection = ({
    onFetchBymaStocksData,
    onFetchAlertsSagaRequest,
    onFetchNegotiableInstrumentsAlertsSagaRequest,
    onFetchAlertConditionExpressions,
    onFetchAlertConditionOperations,
    onChangeSelectedTicker,
    onFetchBondTerms,
}) => {
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

        onFetchBymaStocksData();
        onFetchAlertsSagaRequest();
        onFetchNegotiableInstrumentsAlertsSagaRequest();
        onFetchAlertConditionExpressions();
        onFetchAlertConditionOperations();
    }, []);

    return (
        <>
            <AlertsTable />
            <AlertPointsTable />
        </>
    );
};

const enhance = (pure) => connect(mapStateToProps, mapActionsToProps)(pure);

export default enhance(AlertsSection);
