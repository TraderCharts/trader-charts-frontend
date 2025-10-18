import React, {useState, useRef, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    BarSeries,
    CandlestickSeries,
    Chart,
    ChartCanvas,
    CrossHairCursor,
    CurrentCoordinate,
    discontinuousTimeScaleProvider,
    EdgeIndicator,
    ema,
    sma,
    Label,
    LineSeries,
    MouseCoordinateX,
    MouseCoordinateY,
    MovingAverageTooltip,
    OHLCTooltip,
    TrendLine,
    VolumeProfileSeries,
    withDeviceRatio,
    withSize,
    XAxis,
    YAxis,
    ZoomButtons,
    FibonacciRetracement,
    EquidistantChannel,
    GannFan
} from "react-financial-charts";
import {change} from "@react-financial-charts/indicators";
import {format} from "d3-format";
import {hexToRGBA} from '../../helpers/parse';
import {changeShowEditIndicator} from "../../redux/actions/containers.action";
import {changeSelectedIndicatorMetadata} from "../../redux/actionDefinitions/indicators.actionDefinitions";
import {timeFormat} from "d3-time-format";

const ChartLayout = ({
                         onChangeShowEditIndicator, onChangeSelectedIndicatorMetadata, indicatorsListMetadata = [],
                         data: initialData, width, height, ratio, enableInteractiveObject, setEnableInteractiveObject
                     }) => {
    const [extendLines, setExtendLines] = useState([]);
    const [rays, setRays] = useState([]);
    const [trends, setTrends] = useState([]);
    const [retracements, setRetracements] = useState([]);
    const [channels, setChannels] = useState([]);
    const [fans, setFans] = useState([]);
    const [selectedInteractiveObject, setSelectedInteractiveObject] = useState(undefined);


    useEffect(() => {
        document.addEventListener("keyup", onKeyPress);

        return () => {
            document.removeEventListener("keyup", onKeyPress);
        }
    }, [extendLines, rays, trends, retracements, channels, fans, selectedInteractiveObject])

    const deleteInteractiveObject = (interactiveObject) => {
        switch (interactiveObject) {
            case 'extendLines':
                let newExtendLines = extendLines.filter(elem => !elem.selected)
                if (newExtendLines.length > 0) {
                    newExtendLines[0].selected = true
                }
                setExtendLines(newExtendLines)
                return;
            case 'rays':
                let newRays = rays.filter(elem => !elem.selected)
                if (newRays.length > 0) {
                    newRays[0].selected = true
                }
                setRays(newRays)
                return;
            case 'trends':
                let newTrends = trends.filter(elem => !elem.selected)
                if (newTrends.length > 0) {
                    newTrends[0].selected = true
                }
                setTrends(newTrends)
                return;
            case 'retracements':
                let newRetracements = retracements.filter(elem => !elem.selected)
                if (newRetracements.length > 0) {
                    newRetracements[0].selected = true
                }
                setRetracements(newRetracements)
                return;
            case 'channels':
                let newChannels = channels.filter(elem => !elem.selected)
                if (newChannels.length > 0) {
                    newChannels[0].selected = true
                }
                setChannels(newChannels)
                return;
            case 'fans':
                let newFans = fans.filter(elem => !elem.selected)
                if (newFans.length > 0) {
                    newFans[0].selected = true
                }
                setFans(newFans)
                return;
        }
    }

    const onKeyPress = useCallback((e) => {
        const keyCode = e.which;
        switch (keyCode) {
            case 8: {
                if (selectedInteractiveObject) {
                    deleteInteractiveObject(selectedInteractiveObject)
                }
            }
        }
    }, [extendLines, rays, trends, retracements, channels, fans, selectedInteractiveObject])

    const onClickSeriesLabel = (e, tooltip) => {
        onChangeShowEditIndicator(true);
        onChangeSelectedIndicatorMetadata(tooltip.metadata);
    };

    const loadIndicators = () => {
        const indicatorsList = indicatorsListMetadata.map(
            indicatorMetadata => {
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
            }
        );
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

    const applyXScale = dataToApplyScale => {
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
            d => d.date
        );

        const calculatedData = change()(dataToApplyScale);
        const {data, xScale, xAccessor, displayXAccessor} = xScaleProvider(
            calculatedData
        );
        const start = xAccessor(data[data.length - 1]);
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        return {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
            xExtents
        };
    };

    const renderIndicators = indicatorsList => {
        const indicatorsLines = indicatorsList.map((indicator, indicatorIndex) => (
            <LineSeries
                key={indicatorIndex}
                yAccessor={indicator.instance.accessor()}
                strokeStyle={indicator.metadata.stroke}
                strokeWidth={indicator.metadata.strokeWidth}
                onDoubleClick={event => console.log("lkadlkasljk")}
            />
        ));

        // show point at line
        const indicatorsPoints = indicatorsList.map((indicator, indicatorIndex) => (
            <CurrentCoordinate
                key={indicatorsLines.length + indicatorIndex}
                yAccessor={indicator.instance.accessor()}
                fill={indicator.instance.stroke()}
            />
        ));
        return [...indicatorsLines, ...indicatorsPoints];
    };

    const getIndicatorsTooltips = indicatorsList =>
        // show labels
        indicatorsList.map((indicator, indicatorIndex) => ({
            yAccessor: indicator.instance.accessor(),
            type: indicator.metadata.type,
            stroke: indicator.instance.stroke(),
            windowSize: indicator.instance.options().windowSize,
            metadata: indicator.metadata
        }));

    const pricesDisplayFormat = format(".2f");

    /*
        const toObject = (array, iteratee = identity) => {
            return array.reduce((returnObj, a) => {
                const [key, value] = iteratee(a);
                return {
                    ...returnObj,
                    [key]: value
                };
            }, {});
        }


        const handleSelection = (e, interactives, moreProps) => {
            const objs = toObject(interactives, each => {
                return [
                    `trends_${each.chartId}`,
                    each.objects,
                ];
            })
            //this.setState(objs);
        }
    */

    const onDrawCompleteExtendsLine = (e, extendLines) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setExtendLines(extendLines);
        setSelectedInteractiveObject('extendLines')
    }
    const onDrawCompleteRayLine = (e, rays) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setRays(rays);
        setSelectedInteractiveObject('rays')
    }
    const onDrawCompleteTrendLine = (e, trends) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setTrends(trends);
        setSelectedInteractiveObject('trends')
    }
    const onDrawCompleteFibonacciRetracements = (e, retracements) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setRetracements(retracements);
        setSelectedInteractiveObject('retracements')
    }
    const onDrawCompleteEquidistantChannels = (e, channels) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setChannels(channels);
        setSelectedInteractiveObject('channels')
    }
    const onDrawCompleteGannFans = (e, fans) => {
        unselectAllInteractiveObjects()
        setEnableInteractiveObject(undefined);
        setFans(fans);
        setSelectedInteractiveObject('fans')
    }
    const openCloseColor = (data) => {
        return data.close > data.open ? "#26a69a" : "#ef5350";
    };

    const unselectAllInteractiveObjects = () => {
        setExtendLines(extendLines.map(elem => ({...elem, selected: false})))
        setRays(rays.map(elem => ({...elem, selected: false})))
        setTrends(trends.map(elem => ({...elem, selected: false})))
        setRetracements(retracements.map(elem => ({...elem, selected: false})))
        setChannels(channels.map(elem => ({...elem, selected: false})))
        setFans(fans.map(elem => ({...elem, selected: false})))
    }

    const {
        indicatorsList,
        dataWithIndicators,
    } = loadIndicators();
    const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
        xExtents
    } = applyXScale(dataWithIndicators);

    const indicatorsTooltips = getIndicatorsTooltips(indicatorsList);


    const trendLineRef = useRef(null);
    const FibonacciRetracementRef = useRef(null);
    const EquidistantChannelRef = useRef(null);
    const GannFanRef = useRef(null);

    console.log('selectedInteractiveObject', selectedInteractiveObject)
    console.log('trends', trends)

    return (
        <ChartCanvas
            height={800}
            width={width}
            ratio={ratio}
            margin={{left: 70, right: 70, top: 20, bottom: 30}}
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
                yExtents={(data) => {
                    return [data.high, data.low];
                }}
                padding={{top: 10, bottom: 0}}
            >
                <XAxis showGridLines axisAt="bottom" orient="bottom" showTicks={false}/>
                <YAxis showGridLines tickFormat={pricesDisplayFormat}/>
                <EdgeIndicator
                    itemType="last"
                    fill={openCloseColor}
                    lineStroke={openCloseColor}
                    displayFormat={pricesDisplayFormat}
                    yAccessor={(data: IOHLCData) => {
                        return data.close;
                    }}
                />
                <Label
                    text="Trader Charts"
                    x={(width) / 2.2}
                    y={(height) / 4}
                />
                <VolumeProfileSeries/>
                <CandlestickSeries/>
                <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat("%Y-%m-%d")}
                />
                <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")}
                />
                <OHLCTooltip origin={[-40, -2]}/>
                <ZoomButtons/>
                {renderIndicators(indicatorsList)}

                <MovingAverageTooltip
                    onClick={onClickSeriesLabel}
                    origin={[-38, 15]}
                    options={indicatorsTooltips}
                />
                <TrendLine
                    ref={trendLineRef}
                    enabled={enableInteractiveObject === 'ExtendLine'}
                    type="XLINE"
                    snap={false}
                    onComplete={(e, extendLines, moreProps) => {
                        onDrawCompleteExtendsLine(e, extendLines)
                    }}
                    trends={extendLines}
                    onSelect={(e, extendLines) => {
                        unselectAllInteractiveObjects()
                        setExtendLines(extendLines)
                        setSelectedInteractiveObject('extendLines')
                    }}
                />
                <TrendLine
                    ref={trendLineRef}
                    enabled={enableInteractiveObject === 'Ray'}
                    type="RAY"
                    snap={false}
                    onComplete={(e, rays, moreProps) => {
                        onDrawCompleteRayLine(e, rays)
                    }}
                    trends={rays}
                    onSelect={(e, rays) => {
                        unselectAllInteractiveObjects()
                        setRays(rays)
                        setSelectedInteractiveObject('rays')
                    }}
                />
                <TrendLine
                    ref={trendLineRef}
                    enabled={enableInteractiveObject === 'TrendLine'}
                    type="LINE"
                    snap={false}
                    onComplete={(e, trends, moreProps) => {
                        onDrawCompleteTrendLine(e, trends)
                    }}
                    trends={trends}
                    onSelect={(e, trends) => {
                        unselectAllInteractiveObjects()
                        setTrends(trends)
                        setSelectedInteractiveObject('trends')
                    }}
                />
                <FibonacciRetracement
                    ref={FibonacciRetracementRef}
                    enabled={enableInteractiveObject === 'FibonacciRetracement'}
                    retracements={retracements}
                    onComplete={(e, retracements, moreProps) => {
                        onDrawCompleteFibonacciRetracements(e, retracements)
                    }}
                />
                <EquidistantChannel
                    ref={EquidistantChannelRef}
                    enabled={enableInteractiveObject === 'EquidistantChannel'}
                    onComplete={(e, channels, moreProps) => {
                        onDrawCompleteEquidistantChannels(e, channels)
                    }}
                    channels={channels}
                    appearance={{
                        fill: hexToRGBA('#8AAFE2', 0.2)
                    }}
                />
                <GannFan
                    ref={GannFanRef}
                    enabled={enableInteractiveObject === 'GannFan'}
                    onComplete={(e, fans, moreProps) => {
                        onDrawCompleteGannFans(e, fans)
                    }}
                    fans={fans}
                    appearance={{
                        fill: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"].map(
                            elem => hexToRGBA(elem, 0.2)),
                    }}
                />
            </Chart>
            {/*<DrawingObjectSelector
                    enabled={!enableInteractiveObjects}
                    getInteractiveNodes={(e, node) => {
                        return trends_1
                    }}
                    drawingObjectMap={{
                        Trendline: "trends"
                    }}
                    onSelect={(e, interactives, moreProps) => {
                        handleSelection(e, interactives)
                    }}
                />*/}
            <Chart
                id={2}
                origin={(w, h) => [0, h - 150]}
                height={150}
                yExtents={d => d.volume}
                padding={{top: 10, bottom: 20}}
            >
                <XAxis axisAt="bottom" orient="bottom"/>
                <YAxis
                    axisAt="left"
                    orient="left"
                    ticks={5}
                    tickFormat={format(".2s")}
                />
                <BarSeries
                    yAccessor={d => d.volume}
                    fill={d => (d.close > d.open ? "#6BA583" : "red")}
                />
            </Chart>
            <CrossHairCursor/>
        </ChartCanvas>
    );
}

ChartLayout.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    indicatorsListMetadata: state.indicators.indicatorsListMetadata
});

const mapActionsToProps = dispatch => ({
    onChangeShowEditIndicator: value => dispatch(changeShowEditIndicator(value)),
    onChangeSelectedIndicatorMetadata: indicatorMetadata =>
        dispatch(changeSelectedIndicatorMetadata(indicatorMetadata))
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withSize({style: {minHeight: 600}})(withDeviceRatio()(ChartLayout)));
