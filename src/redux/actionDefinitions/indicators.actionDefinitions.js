export const CHANGE_INDICATORS_LIST_SEARCH = "CHANGE_INDICATORS_LIST_SEARCH";
export const ADD_INDICATOR_METADATA = "ADD_INDICATOR_METADATA";
export const EDIT_INDICATOR_METADATA = "EDIT_INDICATOR_METADATA";
export const CHANGE_SELECTED_INDICATOR_METADATA =
    "CHANGE_SELECTED_INDICATOR_METADATA";
export const SET_INDICATORS = "SET_INDICATORS";

export const changeIndicatorListSearch = value => {
    return {type: CHANGE_INDICATORS_LIST_SEARCH, value};
};

export const addIndicatorMetadata = indicator => {
    return {type: ADD_INDICATOR_METADATA, indicator};
};

export const editIndicatorMetadata = () => {
    return {type: EDIT_INDICATOR_METADATA};
};

export const changeSelectedIndicatorMetadata = indicator => {
    return {type: CHANGE_SELECTED_INDICATOR_METADATA, indicator};
};

export const setIndicatorMetadata = (indicators) => {
    return {type: SET_INDICATORS, payload: indicators};
};
