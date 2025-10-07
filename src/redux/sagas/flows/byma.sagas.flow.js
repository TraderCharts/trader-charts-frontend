import {all, call, delay, put, select} from "redux-saga/effects";
import {
    fetchAlertsSagaRequest,
    fetchNegotiableInstrumentsAlertsSagaRequest
} from "../actions/byma.action";
import {
    addAlert,
    assignNegotiableInstrumentAlert,
    calculateAlert,
    deleteAlert,
    fetchAlerts,
    fetchNegotiableInstrumentsAlerts,
    unassignNegotiableInstrumentAlert,
    updateAlert
} from "../generators/byma.sagas.generator";
import {indicatorsListMetadataSelector} from "../../../selectors/indicators.selector";
import {
    alertsSelector,
    bymaStocksDataSelector
} from "../../../selectors/byma.selector";

//Alerts
export function* addAlertFlow({apiClients}, {alert}) {
    yield call(addAlert, apiClients, alert);
    yield put(fetchAlertsSagaRequest());
}

export function* updateAlertFlow({apiClients}, {alert}) {
    yield call(updateAlert, apiClients, alert);
    yield put(fetchAlertsSagaRequest());
}

export function* saveAlertFlow({apiClients}, {alert}) {
    if (!alert.id) {
        yield call(addAlert, apiClients, alert);
    } else {
        yield call(updateAlert, apiClients, alert);
    }
    yield put(fetchAlertsSagaRequest());
}

export function* deleteAlertFlow({apiClients}, {alert}) {
    yield call(deleteAlert, apiClients, alert);
    yield put(fetchAlertsSagaRequest());
}

export function* calculateAlertsFlow({apiClients}) {
    const alerts = yield select(alertsSelector);
    const bymaStocksData = yield select(bymaStocksDataSelector);
    const indicatorsListMetadata = yield select(indicatorsListMetadataSelector);
    yield all(
        alerts.map(alert =>
            call(
                calculateAlert,
                apiClients,
                alert,
                bymaStocksData,
                indicatorsListMetadata
            )
        )
    );
    yield put(fetchAlertsSagaRequest());
}

export function* fetchAlertsFlow({apiClients}) {
    yield delay(200);
    yield call(fetchAlerts, apiClients);
}

//NegotiableInstrumentsAlerts
export function* assignNegotiableInstrumentAlertFlow(
    {apiClients},
    {negotiableInstrumentAlert}
) {
    yield call(assignNegotiableInstrumentAlert, apiClients, negotiableInstrumentAlert);
    yield put(fetchNegotiableInstrumentsAlertsSagaRequest());
}

export function* unassignNegotiableInstrumentAlertFlow(
    {apiClients},
    {negotiableInstrumentAlert}
) {
    yield call(unassignNegotiableInstrumentAlert, apiClients, negotiableInstrumentAlert);
    yield put(fetchNegotiableInstrumentsAlertsSagaRequest());
}

export function* fetchNegotiableInstrumentsAlertsFlow({apiClients}) {
    yield delay(200);
    yield call(fetchNegotiableInstrumentsAlerts, apiClients);
}
