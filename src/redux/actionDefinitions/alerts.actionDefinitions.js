export const SET_ALERTS = "@definition/SET_ALERTS";
export const ASSIGN_NEGOTIABLE_INSTRUMENTS_ALERTS =
    "@definition/ASSIGN_NEGOTIABLE_INSTRUMENTS_ALERTS";
export const UNASSIGN_NEGOTIABLE_INSTRUMENT_ALERTS =
    "@definition/UNASSIGN_NEGOTIABLE_INSTRUMENT_ALERTS";
export const SET_NEGOTIABLE_INSTRUMENTS_ALERTS =
    "@definition/SET_NEGOTIABLE_INSTRUMENTS_ALERTS";
export const SET_SELECTED_ALERT = "@definition/SET_SELECTED_ALERT";
export const SET_ALERT_CONDITION_EXPRESSIONS = "@definition/SET_ALERT_CONDITION_EXPRESSIONS";
export const SET_ALERT_CONDITION_OPERATIONS = "@definition/SET_ALERT_CONDITION_OPERATIONS";


export const setAlertsDefinition = alerts => ({
    type: SET_ALERTS,
    payload: alerts
});

export const setNegotiableInstrumentsAlertsDefinition = negotiableInstrumentsAlerts => ({
    type: SET_NEGOTIABLE_INSTRUMENTS_ALERTS,
    payload: negotiableInstrumentsAlerts
});

// export const assignNegotiableInstrumentAlertDefinition = negotiableInstrumentAlert => ({
//     type: ASSIGN_NEGOTIABLE_INSTRUMENTS_ALERTS,
//     payload: negotiableInstrumentAlert
// });
//
// export const unassignNegotiableInstrumentAlertDefinition = negotiableInstrumentAlert => ({
//     type: UNASSIGN_NEGOTIABLE_INSTRUMENT_ALERTS,
//     payload: negotiableInstrumentAlert
// });

export const setSelectedAlertDefinition = alert => ({
    type: SET_SELECTED_ALERT,
    payload: alert
});

export const setAlertConditionExpressionsDefinition = alert => ({
    type: SET_ALERT_CONDITION_EXPRESSIONS,
    payload: alert
});

export const setAlertConditionOperationsDefinition = alert => ({
    type: SET_ALERT_CONDITION_OPERATIONS,
    payload: alert
});
