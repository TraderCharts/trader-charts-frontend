export const LOGIN_SAGA_REQUEST = "@saga/LOGIN_SAGA_REQUEST";
export const ADD_ALERT_SAGA_REQUEST = "@saga/ADD_ALERT_SAGA_REQUEST";
export const UPDATE_ALERT_SAGA_REQUEST = "@saga/UPDATE_ALERT_SAGA_REQUEST";
export const SAVE_ALERT_SAGA_REQUEST = "@saga/SAVE_ALERT_SAGA_REQUEST";
export const DELETE_ALERT_SAGA_REQUEST = "@saga/DELETE_ALERT_SAGA_REQUEST";
export const FETCH_ALERTS_SAGA_REQUEST = "@saga/FETCH_ALERTS_SAGA_REQUEST";
export const ASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST =
    "@saga/ASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST";
export const UNASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST =
    "@saga/UNASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST";
export const FETCH_LEADER_ACTIONS_ALERTS_SAGA_REQUEST =
    "@saga/FETCH_LEADER_ACTIONS_ALERTS_SAGA_REQUEST";
export const CALCULATE_ALERTS_SAGA_REQUEST =
    "@saga/CALCULATE_ALERTS_SAGA_REQUEST";
export const CALCULATE_ALERT_SAGA_REQUEST =
    "@saga/CALCULATE_ALERT_SAGA_REQUEST";

//Alerts
// export const addAlertSagaRequest = alert => ({
//     type: ADD_ALERT_SAGA_REQUEST,
//     alert
// });
//
// export const updateAlertSagaRequest = alert => ({
//     type: UPDATE_ALERT_SAGA_REQUEST,
//     alert
// });

export const saveAlertSagaRequest = alert => ({
    type: SAVE_ALERT_SAGA_REQUEST,
    alert
});

export const deleteAlertSagaRequest = alert => ({
    type: DELETE_ALERT_SAGA_REQUEST,
    alert
});

export const calculateAlertsSagaRequest = () => ({
    type: CALCULATE_ALERTS_SAGA_REQUEST
});

export const calculateAlertSagaRequest = () => ({
    type: CALCULATE_ALERT_SAGA_REQUEST
});

export const fetchAlertsSagaRequest = () => ({
    type: FETCH_ALERTS_SAGA_REQUEST
});

//NegotiableInstrumentsAlerts
export const assignNegotiableInstrumentAlertSagaRequest = negotiableInstrumentAlert => ({
    type: ASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
    negotiableInstrumentAlert
});

export const unassignNegotiableInstrumentAlertSagaRequest = negotiableInstrumentAlert => ({
    type: UNASSIGN_LEADER_ACTION_ALERT_SAGA_REQUEST,
    negotiableInstrumentAlert
});

export const fetchNegotiableInstrumentsAlertsSagaRequest = () => ({
    type: FETCH_LEADER_ACTIONS_ALERTS_SAGA_REQUEST
});
