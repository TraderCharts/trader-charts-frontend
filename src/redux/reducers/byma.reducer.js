import {
    FETCH_BYMA_STOCKS,
    FETCH_BYMA_STOCKS_DATA,
} from "../actionDefinitions/byma.actionDefinitions";
import {
    SET_ALERTS,
    SET_NEGOTIABLE_INSTRUMENTS_ALERTS,
    SET_SELECTED_ALERT,
    SET_ALERT_CONDITION_EXPRESSIONS,
    SET_ALERT_CONDITION_OPERATIONS,
} from "../actionDefinitions/alerts.actionDefinitions";
import {
    SHOW_PAGES
} from "../actionDefinitions/containers.actionDefinitions";
import Alert from "../../models/Alert.model";

const initialState = {
    bymaStocksData: [],
    negotiableInstruments: [],
    alerts: [],
    negotiableInstrumentsAlerts: [],
    selectedAlert: {...Alert},
    showPages: {
        editAlerts: false
    },
    alertConditionExpressions: [],
    alertConditionOperations: [],
};

const bymaReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BYMA_STOCKS_DATA:
            return {...state, bymaStocksData: action.payload};
        case FETCH_BYMA_STOCKS:
            return {...state, negotiableInstruments: action.payload};
        case SET_ALERTS:
            return {...state, alerts: action.payload};
        case SET_NEGOTIABLE_INSTRUMENTS_ALERTS:
            return {...state, negotiableInstrumentsAlerts: action.payload};
        case SET_SELECTED_ALERT:
            return {
                ...state,
                selectedAlert: {
                    ...Alert,
                    ...action.payload
                }
            };
        case SHOW_PAGES:
            return {
                ...state,
                showPages: {
                    ...state.showPages,
                    [action.payload.pageName]: action.payload.show
                }
            };
        case SET_ALERT_CONDITION_EXPRESSIONS:
            return {...state, alertConditionExpressions: action.payload};
        case SET_ALERT_CONDITION_OPERATIONS:
            return {...state, alertConditionOperations: action.payload};
        default:
            return state;
    }
};

export default bymaReducer;
