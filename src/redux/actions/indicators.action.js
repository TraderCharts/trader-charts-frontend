import {
    setIndicatorMetadata,
} from "../actionDefinitions/indicators.actionDefinitions";

export const fetchIndicatorMetadata = () => (dispatch, getState, apis) => {
    apis.indicatorsClient.getIndicators().then(data => {
        dispatch(setIndicatorMetadata(data));
    });
}
