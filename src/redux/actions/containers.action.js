export const CHANGE_SHOW_ADD_INDICATOR = "CHANGE_SHOW_ADD_INDICATOR";
export const CHANGE_SHOW_EDIT_INDICATOR = "CHANGE_SHOW_EDIT_INDICATOR";
export const CHANGE_SHOW_COLOR_PICKER = "CHANGE_SHOW_COLOR_PICKER";
export const CHANGE_SHOW_SELECT_TICKER = "CHANGE_SHOW_SELECT_TICKER";
export const CHANGE_SELECTED_TICKER_CODE = "CHANGE_SELECTED_TICKER_CODE";

export const changeShowAddIndicator = value => {
    return {type: CHANGE_SHOW_ADD_INDICATOR, value};
};

export const changeShowEditIndicator = value => {
    return {type: CHANGE_SHOW_EDIT_INDICATOR, value};
};

export const changeShowColorPicker = value => {
    return {type: CHANGE_SHOW_COLOR_PICKER, value};
};

export const changeShowSelectTicker = value => {
    return {type: CHANGE_SHOW_SELECT_TICKER, value};
};

export const changeSelectedTickerCode = value => {
    return {type: CHANGE_SELECTED_TICKER_CODE, value};
};
