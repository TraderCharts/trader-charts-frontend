import {
    CHANGE_SHOW_ADD_INDICATOR,
    CHANGE_SHOW_COLOR_PICKER,
    CHANGE_SHOW_EDIT_INDICATOR,
    CHANGE_SHOW_SELECT_TICKER,
    CHANGE_SELECTED_TICKER_CODE,
} from "../actions/containers.action";

const initialState = {
    showAddIndicator: false,
    showEditIndicator: false,
    showSelectTicker: false,
    selectedTickerCode: 'AGRO',
};

const containersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SHOW_ADD_INDICATOR:
            return {...state, showAddIndicator: action.value};
        case CHANGE_SHOW_EDIT_INDICATOR:
            return {...state, showEditIndicator: action.value};
        case CHANGE_SHOW_COLOR_PICKER:
            return {...state, showColorPicker: action.value};
        case CHANGE_SHOW_SELECT_TICKER:
            return {...state, showSelectTicker: action.value};
        case CHANGE_SELECTED_TICKER_CODE:
            return {...state, selectedTickerCode: action.value};
        default:
            return state;
    }
};

export default containersReducer;
