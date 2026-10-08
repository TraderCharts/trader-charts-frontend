import { timeParse } from "d3-time-format";

import ApiClient from "./ApiClient";

export default class BymaClient extends ApiClient {
    // -------------------------------- NegotiableInstruments --------------------------------
    getNegotiableInstruments = () => {
        const promise = this.get("negotiableInstruments/");
        return promise;
    };

    getNegotiableInstrument = ({ negotiableInstrumentId }) => {
        const promise = this.get(`negotiableInstruments/${negotiableInstrumentId}`);
        return promise;
    };

    updateNegotiableInstrument = ({ negotiableInstrument }) => {
        const promise = this.patch(
            `negotiableInstruments/${negotiableInstrument.id}`,
            negotiableInstrument
        );
        return promise;
    };

    getBondTermsByTickers = (tickers) => {
        const promise = this.post("negotiableInstruments/bond-terms", {
            tickers,
        });

        return promise;
    };

    getBymaStocksData = (ticker) => {
        const promise = this.post(`bymaStocksData/expression`, {
            expression: ticker.expression,
            interval: ticker.interval || "D",
        }).then((data) => {
            const parseDate = timeParse("%Y-%m-%d");

            data.forEach((d) => {
                d.date = parseDate(d.date);
            });

            return data;
        });

        return promise;
    };

    getLatestBymaStocksData = (tickers) => {
        const promise = this.post("bymaStocksData/latest", {
            tickers,
        }).then((data) => {
            const parseDate = timeParse("%Y-%m-%d");

            data.forEach((d) => {
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

    getAlert = ({ alertId }) => {
        const promise = this.get(`alerts/${alertId}`);
        return promise;
    };

    addAlert = ({ userId, alert }) => {
        alert = {
            ...alert,
            userId,
        };

        const promise = this.post(`alerts/`, alert);
        return promise;
    };

    updateAlert = ({ userId, alert }) => {
        alert = {
            ...alert,
            userId,
        };

        const promise = this.patch(`alerts/${alert.id}`, alert);
        return promise;
    };

    deleteAlert = ({ alertId }) => {
        const promise = this.delete(`alerts/${alertId}`);
        return promise;
    };

    // Watchlists
    getWatchlists = () => {
        const promise = this.get("watchlists/");
        return promise;
    };

    addTicker = (ticker) => {
        const promise = this.post("watchlists/tickers", {
            ticker,
        });

        return promise;
    };

    removeTicker = (ticker) => {
        const promise = this.delete("watchlists/tickers", {
            ticker,
        });

        return promise;
    };
}
