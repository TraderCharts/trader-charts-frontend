/* eslint-disable no-process-env */
import {all, call, put, select} from "redux-saga/effects";
import {
    setAlertsDefinition,
    setNegotiableInstrumentsAlertsDefinition
} from "../../actionDefinitions/alerts.actionDefinitions";
import {
    assignNegotiableInstrumentAlertSagaRequest,
    unassignNegotiableInstrumentAlertSagaRequest
} from "../actions/byma.action";
import {
    selectedAlertSelector,
    alertConditionOperationsSelector
} from '../../../selectors/byma.selector';
import {loadIndicators} from "../../../operations/indicators";
import _ from "lodash";
import conditionsOperations from "../../../constants/indicatorConditionOperations";

// NegotiableInstrumentsAlerts
function* updateNegotiableInstrumentAlert(apiClients, {userId, alert}) {
    const selectedAlert = yield select(selectedAlertSelector);
    const selectedAlertTickers = selectedAlert.targetTickers;
    const alertTickers = alert.targetTickers;
    const negotiableInstrumentsToAdd = alertTickers.filter(
        alertTickerId => !selectedAlertTickers.includes(alertTickerId)
    );
    const negotiableInstrumentsToRemove = selectedAlertTickers.filter(
        alertTickerId => !alertTickers.includes(alertTickerId)
    );

    yield all(
        negotiableInstrumentsToAdd.map(negotiableInstrumentId =>
            put(
                assignNegotiableInstrumentAlertSagaRequest({
                    targetNegotiableInstrumentId: negotiableInstrumentId,
                    alertId: alert.id
                })
            )
        )
    );

    yield all(
        negotiableInstrumentsToRemove.map(negotiableInstrumentId =>
            put(
                unassignNegotiableInstrumentAlertSagaRequest({
                    targetNegotiableInstrumentId: negotiableInstrumentId,
                    alertId: alert.id,
                    userId
                })
            )
        )
    );
}

export function* fetchNegotiableInstrumentsAlerts(apiClients) {
    const userId = 1;
    const negotiableInstrumentsAlerts = yield call(
        apiClients.alertsClient.getNegotiableInstrumentsAlerts,
        {userId}
    );
    yield put(setNegotiableInstrumentsAlertsDefinition(negotiableInstrumentsAlerts));
}

export function* assignNegotiableInstrumentAlert(apiClients, negotiableInstrumentAlert) {
    const userId = 1;
    yield call(apiClients.alertsClient.assignNegotiableInstrumentAlert, {
        userId,
        negotiableInstrumentAlert
    });
    yield call(fetchNegotiableInstrumentsAlerts, apiClients);
}

export function* unassignNegotiableInstrumentAlert(apiClients, negotiableInstrumentAlert) {
    const userId = 1;
    const negotiableInstrumentsAlerts = yield call(
        apiClients.alertsClient.getNegotiableInstrumentAlert,
        {
            userId,
            negotiableInstrumentAlert
        }
    );

    yield all(
        negotiableInstrumentsAlerts.map(negotiableInstrumentAlert =>
            call(apiClients.alertsClient.unassignNegotiableInstrumentAlert, {
                userId,
                negotiableInstrumentAlertId: negotiableInstrumentAlert.id
            })
        )
    );
    yield call(fetchNegotiableInstrumentsAlerts, apiClients);
}

// Alerts
export function* addAlert(apiClients, alert) {
    const userId = 1;
    alert = yield call(apiClients.alertsClient.addAlert, {alert, userId});
    yield call(updateNegotiableInstrumentAlert, apiClients, {alert, userId});
}

export function* updateAlert(apiClients, alert) {
    const userId = 1;
    yield call(apiClients.alertsClient.updateAlert, {userId, alert});
    yield call(updateNegotiableInstrumentAlert, apiClients, {userId, alert});
}

export function* deleteAlert(apiClients, alertId) {
    const userId = 1;
    yield call(apiClients.alertsClient.deleteAlert, {userId, alertId});
}

export function* fetchAlerts(apiClients) {
    const userId = 1;
    const alerts = yield call(apiClients.alertsClient.getAlerts, {userId});
    yield put(setAlertsDefinition(alerts));
}

export function* calculateAlert(
    apiClients,
    alert,
    bymaStocksData,
    indicatorsListMetadata
) {
    const {dataWithIndicators} = yield call(
        loadIndicators,
        bymaStocksData,
        indicatorsListMetadata
    );
    const [lastDateData] = dataWithIndicators.slice(-1);
    const parameter1 = _.find(
        indicatorsListMetadata,
        indicator => indicator.id === alert.parameter1
    ).code;
    const parameter2 = _.find(
        indicatorsListMetadata,
        indicator => indicator.id === alert.parameter2
    ).code;
    const conditionsOperations = yield select(alertConditionOperationsSelector);
    const conditionOperation = _.find(
        conditionsOperations,
        conditionsOperation => conditionsOperation.id === alert.condition
    ).operation;
    let operationResult = false;
    switch (conditionOperation) {
        case ">":
            operationResult = lastDateData[parameter1] > lastDateData[parameter2];
            break;
        case "<":
            operationResult = lastDateData[parameter1] < lastDateData[parameter2];
            break;
        default:
            break;
    }

    alert.ringing = operationResult;
    yield call(apiClients.alertsClient.updateAlert, {alert});
}
