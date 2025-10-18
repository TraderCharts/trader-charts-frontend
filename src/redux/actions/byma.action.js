import {
    fetchBymaStocksDataDefinition,
    fetchNegotiableInstrumentsDefinition,
} from "../actionDefinitions/byma.actionDefinitions";
import {
    setSelectedAlertDefinition,
    setAlertConditionExpressionsDefinition,
    setAlertConditionOperationsDefinition
} from '../actionDefinitions/alerts.actionDefinitions';
import {
    showPageDefinition
} from "../actionDefinitions/containers.actionDefinitions";

export const fetchBymaStocksData = () => (dispatch, getState, apis) => {
    const selectedTickerCode = getState().containers.selectedTickerCode;
    apis.bymaClient.getBymaStocksData(selectedTickerCode).then(data => {
        dispatch(fetchBymaStocksDataDefinition(data));
    });
}

export const fetchNegotiableInstruments = () => (dispatch, getState, apis) =>
    apis.bymaClient.getNegotiableInstruments().then(data => {
        dispatch(fetchNegotiableInstrumentsDefinition(data));
    });

export const fetchAlertConditionExpressions = () => (dispatch, getState, apis) =>
    apis.alertsClient.getAlertConditionExpressions().then(data => {
        dispatch(setAlertConditionExpressionsDefinition(data));
    });

export const fetchAlertConditionOperations = () => (dispatch, getState, apis) =>
    apis.alertsClient.getAlertConditionOperations().then(data => {
        dispatch(setAlertConditionOperationsDefinition(data));
    });

export const fetchSelectedAlert = alertId => (dispatch, getState, apis) => {
    if (!alertId) {
        dispatch(setSelectedAlertDefinition({}));
    } else {
        apis.alertsClient.getAlert({userId: 1, alertId}).then(alert => {
            dispatch(setSelectedAlertDefinition(alert));
        });
    }
};

export const showPageEditAlerts = show => dispatch => {
    dispatch(showPageDefinition(show, "editAlerts"));
};
