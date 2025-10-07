import ApiClient from './ApiClient';

export default class IndicatorsClient extends ApiClient {
    // Indicators
    getIndicators = () => {
        const promise = this.get("indicators/");
        return promise;
    };
}
