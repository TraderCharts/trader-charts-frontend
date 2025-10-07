import React from "react";
import {ema, sma} from "react-financial-charts";

export const loadIndicators = (initialData, indicatorsListMetadata) => {
    const indicatorsList = indicatorsListMetadata.map(indicatorMetadata => {
        const indicatorInstance = indicatorMetadata.type === 'SMA' ? sma() : ema();
        return ({
            metadata: indicatorMetadata,
            instance: indicatorInstance
                .id(indicatorMetadata.code)
                .stroke(indicatorMetadata.stroke)
                .options({windowSize: indicatorMetadata.windowSize})
                .merge((d, c) => {
                    d[indicatorMetadata.code] = c;
                })
                .accessor(d => d[indicatorMetadata.code])
        })
    });
    const composeIndicators = indicatorsList
        .map(indicator => indicator.instance)
        .reduce(
            (prevIndicator, nextIndicator) => value =>
                prevIndicator(nextIndicator(value)),
            value => value
        );
    const dataWithIndicators = composeIndicators(initialData);
    const yExtentsIndicators = [d => [d.high, d.low]];
    for (const indicator of indicatorsList) {
        yExtentsIndicators.push(indicator.instance.accessor());
    }
    return {indicatorsList, dataWithIndicators, yExtentsIndicators};
};
