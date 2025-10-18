import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    fetchAlertConditionExpressions,
    fetchAlertConditionOperations,
    fetchBymaStocksData
} from '../../redux/actions/byma.action';
import {
    fetchAlertsSagaRequest,
    fetchNegotiableInstrumentsAlertsSagaRequest
} from '../../redux/sagas/actions/byma.action';
import AlertPointsTable from './AlertPointsTable';
import AlertsTable from './AlertsTable';

const mapStateToProps = state => ({
    bymaStocksData: state.byma.bymaStocksData
});

const mapActionsToProps = dispatch => ({
    onFetchBymaStocksData: bindActionCreators(fetchBymaStocksData, dispatch),
    onFetchAlertsSagaRequest: bindActionCreators(fetchAlertsSagaRequest, dispatch),
    onFetchNegotiableInstrumentsAlertsSagaRequest: bindActionCreators(fetchNegotiableInstrumentsAlertsSagaRequest, dispatch),
    onFetchAlertConditionExpressions: bindActionCreators(fetchAlertConditionExpressions, dispatch),
    onFetchAlertConditionOperations: bindActionCreators(fetchAlertConditionOperations, dispatch)
});

const AlertsSection = ({
                           onFetchBymaStocksData,
                           onFetchAlertsSagaRequest,
                           onFetchNegotiableInstrumentsAlertsSagaRequest,
                           onFetchAlertConditionExpressions,
                           onFetchAlertConditionOperations
                       }) => {
    useEffect(() => {
        onFetchBymaStocksData();
        onFetchAlertsSagaRequest();
        onFetchNegotiableInstrumentsAlertsSagaRequest();
        onFetchAlertConditionExpressions();
        onFetchAlertConditionOperations();
        onFetchAlertConditionOperations();
    }, []);

    return (
        <>
            <AlertsTable/>
            <AlertPointsTable/>
        </>
    );
};

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);

export default enhance(AlertsSection);
