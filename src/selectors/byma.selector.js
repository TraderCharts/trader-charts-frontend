import {nullJSON2String} from '../helpers/parse';
import _ from 'lodash';
import {createSelector} from 'reselect';
import {indicatorsListMetadataSelector} from './indicators.selector';

export const bymaSelector = state => state.byma;
export const alertsSelector = state => state.byma.alerts;
export const selectedAlertSelector = state => state.byma.selectedAlert;
export const negotiableInstrumentsSelector = state => state.byma.negotiableInstruments;
export const bymaStocksDataSelector = state => state.byma.bymaStocksData;
export const alertConditionExpressionsSelector = state => state.byma.alertConditionExpressions;
export const alertConditionOperationsSelector = state => state.byma.alertConditionOOperations;
export const parameter2Selector = (state, parameter2) => parameter2;

export const alertPointsSelector = createSelector(
    [negotiableInstrumentsSelector, alertsSelector],
    (negotiableInstruments, alerts) =>
        negotiableInstruments.map(negotiableInstrument => ({
            ...negotiableInstrument,
            points: Object.keys(
                alerts.filter(
                    alert =>
                        alert.targetTickers?.includes(negotiableInstrument.id) &&
                        alert.active &&
                        alert.ringing
                )
            ).length
        }))
);

export const alertsTableSelector = createSelector(
    [indicatorsListMetadataSelector, alertsSelector, alertConditionOperationsSelector],
    (indicatorsListMetadata, alerts, conditionsOperations) =>
        alerts.map(alert => {
            const parameter1 = _.find(
                indicatorsListMetadata,
                indicator => indicator.id === alert.parameter1
            );
            const parameter2 = _.find(
                indicatorsListMetadata,
                indicator => indicator.id === alert.parameter2
            );
            const condition = _.find(
                conditionsOperations,
                condition => condition.id === alert.condition
            );
            return {
                ...alert,
                parameter1: nullJSON2String(parameter1, 'code'),
                parameter2: nullJSON2String(parameter2, 'code'),
                condition: nullJSON2String(condition, 'name')
            };
        })
);
