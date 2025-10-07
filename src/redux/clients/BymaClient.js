import {timeParse} from "d3-time-format";
import ApiClient from "./ApiClient";

export default class BymaClient extends ApiClient {
    // -------------------------------- NegotiableInstruments --------------------------------
    getNegotiableInstruments = () => {
        const promise = this.get("negotiableInstruments/");
        return promise;
    };

    getNegotiableInstrument = ({negotiableInstrumentId}) => {
        const promise = this.get(`negotiableInstruments/${negotiableInstrumentId}`);
        return promise;
    };

    updateNegotiableInstrument = ({negotiableInstrument}) => {
        const promise = this.patch(
            `negotiableInstruments/${negotiableInstrument.id}`,
            negotiableInstrument
        );
        return promise;
    };

    // -------------------------------- BymaStocksData ----------------------------------------
    getBymaStocksData = (tickerCode) => {
        const promise = this.get(`bymaStocksData?ticker=${tickerCode}`).then(data => {
            const parseDate = timeParse("%Y-%m-%d");
            data.forEach(d => {
                d.date = parseDate(d.date);
            });
            return data;
        });
        return promise;
    };

    // Alerts
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
}
