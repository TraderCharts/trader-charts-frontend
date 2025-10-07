import {all, takeEvery, takeLatest} from "redux-saga/effects";
import {
    ADD_ALERT_SAGA_REQUEST,
    ASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
    CALCULATE_ALERTS_SAGA_REQUEST,
    DELETE_ALERT_SAGA_REQUEST,
    FETCH_ALERTS_SAGA_REQUEST,
    FETCH_LEADER_ACTIONS_ALERTS_SAGA_REQUEST,
    LOGIN_SAGA_REQUEST,
    SAVE_ALERT_SAGA_REQUEST,
    UNASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
    UPDATE_ALERT_SAGA_REQUEST
} from "./actions/byma.action";
import {loginFlow} from "./flows/authentication.sagas.flow";
import {
    addAlertFlow,
    assignNegotiableInstrumentAlertFlow,
    calculateAlertsFlow,
    deleteAlertFlow,
    fetchAlertsFlow,
    fetchNegotiableInstrumentsAlertsFlow,
    saveAlertFlow,
    unassignNegotiableInstrumentAlertFlow,
    updateAlertFlow
} from "./flows/byma.sagas.flow";

export default function* RootSagas(context) {
    yield all([
        //Login
        takeEvery(LOGIN_SAGA_REQUEST, loginFlow, context),
        //Alerts
        takeEvery(ADD_ALERT_SAGA_REQUEST, addAlertFlow, context),
        takeEvery(UPDATE_ALERT_SAGA_REQUEST, updateAlertFlow, context),
        takeEvery(SAVE_ALERT_SAGA_REQUEST, saveAlertFlow, context),
        takeEvery(DELETE_ALERT_SAGA_REQUEST, deleteAlertFlow, context),
        takeEvery(CALCULATE_ALERTS_SAGA_REQUEST, calculateAlertsFlow, context),
        takeLatest(FETCH_ALERTS_SAGA_REQUEST, fetchAlertsFlow, context),
        //NegotiableInstrumentsAlerts
        takeEvery(
            ASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
            assignNegotiableInstrumentAlertFlow,
            context
        ),
        takeEvery(
            UNASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
            unassignNegotiableInstrumentAlertFlow,
            context
        ),
        takeLatest(
            FETCH_LEADER_ACTIONS_ALERTS_SAGA_REQUEST,
            fetchNegotiableInstrumentsAlertsFlow,
            context
        )
    ]);
}
