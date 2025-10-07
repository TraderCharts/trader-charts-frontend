import {FETCH_BYMA_STOCKS_DATA} from '../actionDefinitions/byma.actionDefinitions';
import {
    SET_INDICATORS,
    ADD_INDICATOR_METADATA,
    CHANGE_INDICATORS_LIST_SEARCH,
    CHANGE_SELECTED_INDICATOR_METADATA,
    EDIT_INDICATOR_METADATA
} from "../actionDefinitions/indicators.actionDefinitions";
import _ from "lodash";

const initialState = {
    indicatorListSearch: "",
    indicatorsListMetadata: [],
    selectedIndicatorMetadata: {
        code: null,
        windowSize: null,
        stroke: "#3f51b5",
        strokeWidth: 1,
        type: null
    }
};

const indicatorsReducer = (state = initialState, action) => {
    let newIndicatorsListMetadata;
    switch (action.type) {
        case SET_INDICATORS:
            return {...state, indicatorsListMetadata: action.payload};
        case CHANGE_INDICATORS_LIST_SEARCH:
            return {...state, indicatorListSearch: action.value};
        case ADD_INDICATOR_METADATA:
            newIndicatorsListMetadata = [...state.indicatorsListMetadata];
            if (
                _.findIndex(
                    newIndicatorsListMetadata,
                    indicatorMetadata => indicatorMetadata.code === action.indicator.code
                ) === -1
            ) {
                newIndicatorsListMetadata.push({
                    ...action.indicator,
                    id: newIndicatorsListMetadata.length + 1
                });
            }
            return {
                ...state,
                indicatorsListMetadata: [...newIndicatorsListMetadata]
            };
        case EDIT_INDICATOR_METADATA:
            newIndicatorsListMetadata = [];
            state.indicatorsListMetadata.forEach(i => {
                if (i.id !== state.selectedIndicatorMetadata.id) {
                    newIndicatorsListMetadata.push(i);
                } else {
                    newIndicatorsListMetadata.push({
                        ...i,
                        ...state.selectedIndicatorMetadata
                    });
                }
            });
            return {
                ...state,
                indicatorsListMetadata: [...newIndicatorsListMetadata]
            };
        case CHANGE_SELECTED_INDICATOR_METADATA:
            return {
                ...state,
                selectedIndicatorMetadata: {
                    ...state.selectedIndicatorMetadata,
                    ...action.indicator
                }
            };
        default:
            return state;
    }
};

export default indicatorsReducer;
