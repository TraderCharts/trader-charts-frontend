import {timeParse} from "d3-time-format";
import ApiClient from "./ApiClient";

export default class BymaClient extends ApiClient {
    // ---------------------------------- Alerts ----------------------------------
    getAlerts = () => {
        const promise = this.get(`alerts/`);
        return promise;
    };

    getAlert = ({alertId}) => {
        const promise = this.get(`alerts/${alertId}`);
        return promise;
    };

    addAlert = ({userId, alert}) => {
        alert = {
            ...alert,
            userId
        };
        const promise = this.post(`alerts/`, alert);
        return promise;
    };

    updateAlert = ({userId, alert}) => {
        alert = {
            ...alert,
            userId
        };
        const promise = this.patch(`alerts/${alert.id}`, alert);
        return promise;
    };

    deleteAlert = ({alertId}) => {
        const promise = this.delete(`alerts/${alertId}`);
        return promise;
    };

    // -------------------------- NegotiableInstrumentsAlerts --------------------------
    getNegotiableInstrumentsAlerts = () => {
        const promise = this.get(`negotiableInstrumentsAlerts`);
        return promise;
    };

    getNegotiableInstrumentAlert = ({negotiableInstrumentAlert}) => {
        let searchFields = negotiableInstrumentAlert.negotiableInstrumentId
            ? `&negotiableInstrumentId=${negotiableInstrumentAlert.negotiableInstrumentId}`
            : "";
        searchFields += negotiableInstrumentAlert.alertId
            ? `&alertId=${negotiableInstrumentAlert.alertId}`
            : "";
        const promise = this.get(`negotiableInstrumentsAlerts?${searchFields}`);
        return promise;
    };

    assignNegotiableInstrumentAlert = ({userId, negotiableInstrumentAlert}) => {
        negotiableInstrumentAlert = {
            ...negotiableInstrumentAlert,
            userId
        };
        const promise = this.post(`negotiableInstrumentsAlerts/`, negotiableInstrumentAlert);
        return promise;
    };

    unassignNegotiableInstrumentAlert = ({negotiableInstrumentAlertId}) => {
        const promise = this.delete(`negotiableInstrumentsAlerts/${negotiableInstrumentAlertId}`);
        return promise;
    };
    // ---------------------------------- Alert Conditions ----------------------------------
    getAlertConditionExpressions = () => {
        const promise = this.get(`alertConditionExpressions/`);
        return promise;
    };
    getAlertConditionOperations = () => {
        const promise = this.get(`alertConditionOperations/`);
        return promise;
    };
}
