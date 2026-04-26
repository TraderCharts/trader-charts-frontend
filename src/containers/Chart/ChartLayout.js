import {
    change,
    BarSeries,
    CandlestickSeries,
    Chart,
    ChartCanvas,
    CrossHairCursor,
    CurrentCoordinate,
    discontinuousTimeScaleProvider,
    EdgeIndicator,
    ema,
    Label,
    LineSeries,
    MouseCoordinateX,
    MouseCoordinateY,
    MovingAverageTooltip,
    OHLCTooltip,
    sma,
    VolumeProfileSeries,
    withDeviceRatio,
    withSize,
    XAxis,
    YAxis,
    ZoomButtons,
} from "react-financial-charts";
import { MarqueeZoom } from "@react-financial-charts/interactive";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { scaleLog } from "d3-scale";

import { changeSelectedIndicatorMetadata } from "../../redux/actionDefinitions/indicators.actionDefinitions";
import { changeShowEditIndicator } from "../../redux/actions/containers.action";
import ChartTools from "./ChartTools";

const ChartLayout = ({
    onChangeShowEditIndicator,
    onChangeSelectedIndicatorMetadata,
    indicatorsListMetadata = [],
    data: initialData,
    width,
    height,
    ratio,
    enableInteractiveObject,
    setEnableInteractiveObject,
    yScale,
    timeRange = "1M",
}) => {
    const [selectedInteractiveObject, setSelectedInteractiveObject] = useState(undefined);
    const [extendLines, setExtendLines] = useState([]);
    const [rays, setRays] = useState([]);
    const [trends, setTrends] = useState([]);
    const [retracements, setRetracements] = useState([]);
    const [channels, setChannels] = useState([]);
    const [linearRegressionChannels, setLinearRegressionChannels] = useState([]);
    const [fans, setFans] = useState([]);
    const [freehandBrushDrawings, setFreehandBrushDrawings] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [texts, setTexts] = useState([]);
    const chartCanvasRef = useRef(null);

    useEffect(() => {
        document.addEventListener("keyup", onKeyPress);
        return () => {
            document.removeEventListener("keyup", onKeyPress);
        };
    }, [
        selectedInteractiveObject,
        extendLines,
        rays,
        trends,
        retracements,
        channels,
        linearRegressionChannels,
        fans,
        freehandBrushDrawings,
        arrows,
        rectangles,
        priceRanges,
        texts,
    ]);

    const deleteInteractiveObject = (interactiveObject) => {
        switch (interactiveObject) {
            case "extendLines": {
                const newExtendLines = extendLines.filter((elem) => !elem.selected);
                if (newExtendLines.length > 0) {
                    newExtendLines[0].selected = true;
                }
                setExtendLines(newExtendLines);
                return;
            }
            case "rays": {
                const newRays = rays.filter((elem) => !elem.selected);
                if (newRays.length > 0) {
                    newRays[0].selected = true;
                }
                setRays(newRays);
                return;
            }
            case "trends": {
                const newTrends = trends.filter((elem) => !elem.selected);
                if (newTrends.length > 0) {
                    newTrends[0].selected = true;
                }
                setTrends(newTrends);
                return;
            }
            case "retracements": {
                const newRetracements = retracements.filter((elem) => !elem.selected);
                if (newRetracements.length > 0) {
                    newRetracements[0].selected = true;
                }
                setRetracements(newRetracements);
                return;
            }
            case "channels": {
                const newChannels = channels.filter((elem) => !elem.selected);
                if (newChannels.length > 0) {
                    newChannels[0].selected = true;
                }
                setChannels(newChannels);
                return;
            }
            case "linearRegressionChannels": {
                const newChannels = linearRegressionChannels.filter((elem) => !elem.selected);
                if (newChannels.length > 0) {
                    newChannels[0].selected = true;
                }
                setLinearRegressionChannels(newChannels);
                return;
            }
            case "fans": {
                const newFans = fans.filter((elem) => !elem.selected);
                if (newFans.length > 0) {
                    newFans[0].selected = true;
                }
                setFans(newFans);
                return;
            }
            case "freehandBrushDrawings": {
                const newFreehandBrushDrawings = freehandBrushDrawings.filter(
                    (elem) => !elem.selected
                );
                if (newFreehandBrushDrawings.length > 0) {
                    newFreehandBrushDrawings[0].selected = true;
                }
                setFreehandBrushDrawings(newFreehandBrushDrawings);
                return;
            }
            case "arrows": {
                const newArrows = arrows.filter((elem) => !elem.selected);
                if (newArrows.length > 0) {
                    newArrows[0].selected = true;
                }
                setArrows(newArrows);
                return;
            }
            case "rectangles": {
                const newRectangles = rectangles.filter((elem) => !elem.selected);
                if (newRectangles.length > 0) {
                    newRectangles[0].selected = true;
                }
                setRectangles(newRectangles);
                return;
            }
            case "priceRanges": {
                const newPriceRanges = priceRanges.filter((elem) => !elem.selected);
                if (newPriceRanges.length > 0) {
                    newPriceRanges[0].selected = true;
                }
                setPriceRanges(newPriceRanges);
                return;
            }
            case "texts": {
                const newTexts = texts.filter((elem) => !elem.selected);
                if (newTexts.length > 0) {
                    newTexts[0].selected = true;
                }
                setTexts(newTexts);
                return;
            }
        }
    };

    const onKeyPress = useCallback(
        (e) => {
            const keyCode = e.which;
            switch (keyCode) {
                case 8: {
                    if (selectedInteractiveObject) {
                        deleteInteractiveObject(selectedInteractiveObject);
                    }
                }
            }
        },
        [
            selectedInteractiveObject,
            extendLines,
            rays,
            trends,
            retracements,
            channels,
            linearRegressionChannels,
            fans,
            freehandBrushDrawings,
            arrows,
            rectangles,
            priceRanges,
            texts,
        ]
    );

    const onClickSeriesLabel = (e, tooltip) => {
        onChangeShowEditIndicator(true);
        onChangeSelectedIndicatorMetadata(tooltip.metadata);
    };

    const loadIndicators = () => {
        const indicatorsList = indicatorsListMetadata.map((indicatorMetadata) => {
            const indicatorInstance = indicatorMetadata.type === "SMA" ? sma() : ema();
            return {
                metadata: indicatorMetadata,
                instance: indicatorInstance
                    .id(indicatorMetadata.code)
                    .stroke(indicatorMetadata.stroke)
                    .options({ windowSize: indicatorMetadata.windowSize })
                    .merge((d, c) => {
                        d[indicatorMetadata.code] = c;
                    })
                    .accessor((d) => d[indicatorMetadata.code]),
            };
        });
        const composeIndicators = indicatorsList
            .map((indicator) => indicator.instance)
            .reduce(
                (prevIndicator, nextIndicator) => (value) => prevIndicator(nextIndicator(value)),
                (value) => value
            );
        const dataWithIndicators = composeIndicators(initialData);
        const yExtentsIndicators = [(d) => [d.high, d.low]];
        for (const indicator of indicatorsList) {
            yExtentsIndicators.push(indicator.instance.accessor());
        }
        return { indicatorsList, dataWithIndicators, yExtentsIndicators };
    };
    const getXExtentsByTimeRange = (data, xAccessor, timeRange) => {
        const rangeToDays = {
            "1M": 30,
            "3M": 90,
            "6M": 180,
            "1Y": 365,
            "5Y": 1825,
            ALL: data.length,
        };
        const daysToShow = rangeToDays[timeRange] || 30;
        const endIndex = data.length - 1;
        const startIndex = timeRange === "ALL" ? 0 : Math.max(0, data.length - daysToShow);
        return [xAccessor(data[startIndex]), xAccessor(data[endIndex])];
    };

    const applyXScale = (dataToApplyScale) => {
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
        const calculatedData = change()(dataToApplyScale);
        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);
        const xExtents = getXExtentsByTimeRange(data, xAccessor, timeRange);
        return { data, xScale, xAccessor, displayXAccessor, xExtents };
    };

    const renderIndicators = (indicatorsList) => {
        const indicatorsLines = indicatorsList.map((indicator, indicatorIndex) => (
            <LineSeries
                key={indicatorIndex}
                yAccessor={indicator.instance.accessor()}
                strokeStyle={indicator.metadata.stroke}
                strokeWidth={indicator.metadata.strokeWidth}
                onDoubleClick={() => console.log("doubleClick")}
            />
        ));
        const indicatorsPoints = indicatorsList.map((indicator, indicatorIndex) => (
            <CurrentCoordinate
                key={indicatorsLines.length + indicatorIndex}
                yAccessor={indicator.instance.accessor()}
                fill={indicator.instance.stroke()}
            />
        ));
        return [...indicatorsLines, ...indicatorsPoints];
    };

    const getIndicatorsTooltips = (indicatorsList) =>
        indicatorsList.map((indicator) => ({
            yAccessor: indicator.instance.accessor(),
            type: indicator.metadata.type,
            stroke: indicator.instance.stroke(),
            windowSize: indicator.instance.options().windowSize,
            metadata: indicator.metadata,
        }));

    const pricesDisplayFormat = format(".2f");

    const unselectAllInteractiveObjects = () => {
        setExtendLines(extendLines.map((elem) => ({ ...elem, selected: false })));
        setRays(rays.map((elem) => ({ ...elem, selected: false })));
        setTrends(trends.map((elem) => ({ ...elem, selected: false })));
        setRetracements(retracements.map((elem) => ({ ...elem, selected: false })));
        setChannels(channels.map((elem) => ({ ...elem, selected: false })));
        setLinearRegressionChannels(
            linearRegressionChannels.map((elem) => ({ ...elem, selected: false }))
        );
        setFans(fans.map((elem) => ({ ...elem, selected: false })));
        setFreehandBrushDrawings(
            freehandBrushDrawings.map((elem) => ({ ...elem, selected: false }))
        );
        setArrows(arrows.map((elem) => ({ ...elem, selected: false })));
        setRectangles(rectangles.map((elem) => ({ ...elem, selected: false })));
        setPriceRanges(priceRanges.map((elem) => ({ ...elem, selected: false })));
        setTexts(texts.map((elem) => ({ ...elem, selected: false })));
    };

    const { indicatorsList, dataWithIndicators } = loadIndicators();
    const { data, xScale, xAccessor, displayXAccessor, xExtents } = applyXScale(dataWithIndicators);
    const indicatorsTooltips = getIndicatorsTooltips(indicatorsList);
    const openCloseColor = (data) => {
        return data.close > data.open ? "#26a69a" : "#ef5350";
    };

    const handleMarqueeZoom = useCallback((newXExtents) => {
        if (chartCanvasRef.current && newXExtents && newXExtents.length === 2) {
            const sortedExtents = [
                Math.min(newXExtents[0], newXExtents[1]),
                Math.max(newXExtents[0], newXExtents[1]),
            ];
            chartCanvasRef.current.xAxisZoom(sortedExtents);
        }
    }, []);

    const handleReset = () => {
        if (chartCanvasRef.current && xAccessor && data.length > 0) {
            const [start, end] = getXExtentsByTimeRange(data, xAccessor, timeRange);
            chartCanvasRef.current.xAxisZoom([start, end]);
        }
    };

    return (
        <ChartCanvas
            ref={chartCanvasRef}
            height={height}
            width={width}
            ratio={ratio}
            margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
            type="hybrid"
            seriesName="traderCharts"
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            displayXAccessor={displayXAccessor}
        >
            <Chart
                id={1}
                height={550}
                yExtents={(data) => [data.high, data.low]}
                yScale={yScale === "log" ? scaleLog() : undefined}
                padding={{ top: 10, bottom: 0 }}
            >
                <XAxis showGridLines axisAt="bottom" orient="bottom" showTicks={false} />
                <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                <EdgeIndicator
                    itemType="last"
                    fill={openCloseColor}
                    lineStroke={openCloseColor}
                    displayFormat={pricesDisplayFormat}
                    yAccessor={(data) => data.close}
                />
                <Label text="Trader Charts" x={width / 2.2} y={height / 4} />
                <VolumeProfileSeries />
                <CandlestickSeries />
                <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat("%Y-%m-%d")}
                />
                <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
                <OHLCTooltip origin={[-40, -2]} />
                <ZoomButtons onReset={handleReset} />
                {renderIndicators(indicatorsList)}
                <MovingAverageTooltip
                    onClick={onClickSeriesLabel}
                    origin={[-38, 15]}
                    options={indicatorsTooltips}
                />
                <ChartTools
                    enableInteractiveObject={enableInteractiveObject}
                    unselectAllInteractiveObjects={unselectAllInteractiveObjects}
                    setEnableInteractiveObject={setEnableInteractiveObject}
                    setSelectedInteractiveObject={setSelectedInteractiveObject}
                    extendLines={extendLines}
                    setExtendLines={setExtendLines}
                    rays={rays}
                    setRays={setRays}
                    trends={trends}
                    setTrends={setTrends}
                    retracements={retracements}
                    setRetracements={setRetracements}
                    channels={channels}
                    setChannels={setChannels}
                    linearRegressionChannels={linearRegressionChannels}
                    setLinearRegressionChannels={setLinearRegressionChannels}
                    fans={fans}
                    setFans={setFans}
                    freehandBrushDrawings={freehandBrushDrawings}
                    setFreehandBrushDrawings={setFreehandBrushDrawings}
                    arrows={arrows}
                    setArrows={setArrows}
                    rectangles={rectangles}
                    setRectangles={setRectangles}
                    priceRanges={priceRanges}
                    setPriceRanges={setPriceRanges}
                    texts={texts}
                    setTexts={setTexts}
                />
                <MarqueeZoom
                    enabled={enableInteractiveObject === "MarqueeZoom"}
                    onZoom={handleMarqueeZoom}
                    fillStyle="rgba(138, 175, 226, 0.2)"
                    strokeStyle="#8AAFE2"
                />
            </Chart>
            <Chart
                id={2}
                origin={(w, h) => [0, h - 200]}
                height={200}
                yExtents={(d) => d.volume}
                padding={{ top: 0, bottom: 10 }}
            >
                <XAxis axisAt="bottom" orient="bottom" />
                <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
                <BarSeries
                    yAccessor={(d) => d.volume}
                    fill={(d) => (d.close > d.open ? "#6BA583" : "red")}
                />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    );
};

ChartLayout.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    indicatorsListMetadata: state.indicators.indicatorsListMetadata,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowEditIndicator: (value) => dispatch(changeShowEditIndicator(value)),
    onChangeSelectedIndicatorMetadata: (indicatorMetadata) =>
        dispatch(changeSelectedIndicatorMetadata(indicatorMetadata)),
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withSize({ style: { minHeight: 600, monitorHeight: true } })(withDeviceRatio()(ChartLayout)));
