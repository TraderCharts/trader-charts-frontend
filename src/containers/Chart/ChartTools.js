import React, { useRef } from "react";
import {
    TrendLine,
    FibonacciRetracement,
    EquidistantChannel,
    GannFan,
} from "react-financial-charts";
import {
    FreehandBrush,
    Arrow,
    Rectangle,
    Text,
    LinearRegressionChannel,
} from "@react-financial-charts/interactive";
import { hexToRGBA } from "../../helpers/parse";

const ChartTools = ({
    enableInteractiveObject,
    extendLines,
    setExtendLines,
    rays,
    setRays,
    trends,
    setTrends,
    retracements,
    setRetracements,
    channels,
    setChannels,
    linearRegressionChannels,
    setLinearRegressionChannels,
    fans,
    setFans,
    freehandBrushDrawings,
    setFreehandBrushDrawings,
    arrows,
    setArrows,
    rectangles,
    setRectangles,
    priceRanges,
    setPriceRanges,
    texts,
    setTexts,
    unselectAllInteractiveObjects,
    setEnableInteractiveObject,
    setSelectedInteractiveObject,
}) => {
    const trendLineRef = useRef(null);
    const FibonacciRetracementRef = useRef(null);
    const EquidistantChannelRef = useRef(null);
    const GannFanRef = useRef(null);

    const onDrawCompleteExtendsLine = (e, extendLines) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setExtendLines(extendLines);
        setSelectedInteractiveObject("extendLines");
    };

    const onDrawCompleteRayLine = (e, rays) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setRays(rays);
        setSelectedInteractiveObject("rays");
    };

    const onDrawCompleteTrendLine = (e, trends) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setTrends(trends);
        setSelectedInteractiveObject("trends");
    };

    const onDrawCompleteFibonacciRetracements = (e, retracements) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setRetracements(retracements);
        setSelectedInteractiveObject("retracements");
    };

    const onDrawCompleteEquidistantChannels = (e, channels) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setChannels(channels);
        setSelectedInteractiveObject("channels");
    };

    const onDrawCompleteLinearRegressionChannel = (e, channels) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setLinearRegressionChannels(channels);
        setSelectedInteractiveObject("linearRegressionChannels");
    };

    const onDrawCompleteGannFans = (e, fans) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setFans(fans);
        setSelectedInteractiveObject("fans");
    };

    const onDrawCompleteFreehandBrush = (e, drawings) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setFreehandBrushDrawings(drawings);
        setSelectedInteractiveObject("freehandBrushDrawings");
    };

    const onDrawCompleteArrow = (e, arrows) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setArrows(arrows);
        setSelectedInteractiveObject("arrows");
    };

    const onDrawCompleteRectangle = (e, rectangles) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setRectangles(rectangles);
        setSelectedInteractiveObject("rectangles");
    };

    const onDrawCompletePriceRange = (e, priceRanges) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        setPriceRanges(priceRanges);
        setSelectedInteractiveObject("priceRanges");
    };

    const onChoosePosition = (e, newText) => {
        unselectAllInteractiveObjects();
        setEnableInteractiveObject(undefined);
        const newTextList = [...(texts || []), { ...newText, selected: true }];
        setTexts(newTextList);
        setSelectedInteractiveObject("texts");
    };

    const onDragComplete = (e, newTextList) => {
        setTexts(newTextList);
    };

    const onSelectText = (e, newTextList) => {
        unselectAllInteractiveObjects();
        setTexts(newTextList);
        setSelectedInteractiveObject("texts");
    };

    const onEditText = (e, index, newText) => {
        const newTextList = [...(texts || [])];
        if (newTextList[index]) {
            newTextList[index] = {
                ...newTextList[index],
                text: newText,
            };
            setTexts(newTextList);
        }
    };

    return (
        <>
            <TrendLine
                ref={trendLineRef}
                enabled={enableInteractiveObject === "ExtendLine"}
                type="XLINE"
                snap={false}
                onComplete={onDrawCompleteExtendsLine}
                trends={extendLines}
                onSelect={(e, extendLines) => {
                    unselectAllInteractiveObjects();
                    setExtendLines(extendLines);
                    setSelectedInteractiveObject("extendLines");
                }}
            />
            <TrendLine
                ref={trendLineRef}
                enabled={enableInteractiveObject === "Ray"}
                type="RAY"
                snap={false}
                onComplete={onDrawCompleteRayLine}
                trends={rays}
                onSelect={(e, rays) => {
                    unselectAllInteractiveObjects();
                    setRays(rays);
                    setSelectedInteractiveObject("rays");
                }}
            />
            <TrendLine
                ref={trendLineRef}
                enabled={enableInteractiveObject === "TrendLine"}
                type="LINE"
                snap={false}
                onComplete={onDrawCompleteTrendLine}
                trends={trends}
                onSelect={(e, trends) => {
                    unselectAllInteractiveObjects();
                    setTrends(trends);
                    setSelectedInteractiveObject("trends");
                }}
            />
            <FibonacciRetracement
                ref={FibonacciRetracementRef}
                enabled={enableInteractiveObject === "FibonacciRetracement"}
                retracements={retracements}
                onComplete={onDrawCompleteFibonacciRetracements}
                onSelect={(e, retracements) => {
                    unselectAllInteractiveObjects();
                    setRetracements(retracements);
                    setSelectedInteractiveObject("retracements");
                }}
            />
            <EquidistantChannel
                ref={EquidistantChannelRef}
                enabled={enableInteractiveObject === "EquidistantChannel"}
                onComplete={onDrawCompleteEquidistantChannels}
                channels={channels}
                appearance={{
                    fill: hexToRGBA("#8AAFE2", 0.2),
                }}
                onSelect={(e, channels) => {
                    unselectAllInteractiveObjects();
                    setChannels(channels);
                    setSelectedInteractiveObject("channels");
                }}
            />
            <LinearRegressionChannel
                enabled={enableInteractiveObject === "LinearRegressionChannel"}
                channels={linearRegressionChannels}
                onComplete={onDrawCompleteLinearRegressionChannel}
                onSelect={(e, channels) => {
                    unselectAllInteractiveObjects();
                    setLinearRegressionChannels(channels);
                    setSelectedInteractiveObject("linearRegressionChannels");
                }}
                appearance={{
                    stroke: "#8AAFE2",
                    strokeWidth: 2,
                    fill: "rgba(138, 175, 226, 0.1)",
                }}
                hoverText={{ enable: false }}
            />
            <GannFan
                ref={GannFanRef}
                enabled={enableInteractiveObject === "GannFan"}
                onComplete={onDrawCompleteGannFans}
                fans={fans}
                appearance={{
                    fill: [
                        "#e41a1c",
                        "#377eb8",
                        "#4daf4a",
                        "#984ea3",
                        "#ff7f00",
                        "#ffff33",
                        "#a65628",
                        "#f781bf",
                    ].map((elem) => hexToRGBA(elem, 0.2)),
                }}
                onSelect={(e, fans) => {
                    unselectAllInteractiveObjects();
                    setFans(fans);
                    setSelectedInteractiveObject("fans");
                }}
            />
            <FreehandBrush
                enabled={enableInteractiveObject === "FreehandBrush"}
                drawings={freehandBrushDrawings}
                onComplete={onDrawCompleteFreehandBrush}
                onSelect={(e, drawings) => {
                    unselectAllInteractiveObjects();
                    setFreehandBrushDrawings(drawings);
                    setSelectedInteractiveObject("freehandBrushDrawings");
                }}
                color="#FF9800"
                lineWidth={3}
                hoverText={{ enable: false }}
            />
            <Arrow
                enabled={enableInteractiveObject === "Arrow"}
                arrows={arrows}
                onComplete={onDrawCompleteArrow}
                onSelect={(e, arrows) => {
                    unselectAllInteractiveObjects();
                    setArrows(arrows);
                    setSelectedInteractiveObject("arrows");
                }}
                color="#8AAFE2"
                lineWidth={2}
                hoverText={{ enable: false }}
            />
            <Rectangle
                enabled={enableInteractiveObject === "Rectangle"}
                rectangles={rectangles}
                onComplete={onDrawCompleteRectangle}
                onSelect={(e, rectangles) => {
                    unselectAllInteractiveObjects();
                    setRectangles(rectangles);
                    setSelectedInteractiveObject("rectangles");
                }}
                appearance={{
                    strokeStyle: "#8AAFE2",
                    strokeWidth: 2,
                    fill: "rgba(138, 175, 226, 0.2)",
                    edgeStroke: "#8AAFE2",
                    edgeFill: "#8AAFE2",
                    edgeStrokeWidth: 1,
                }}
                hoverText={{ enable: false }}
            />
            <Rectangle
                enabled={enableInteractiveObject === "PriceRange"}
                rectangles={priceRanges}
                onComplete={onDrawCompletePriceRange}
                onSelect={(e, priceRanges) => {
                    unselectAllInteractiveObjects();
                    setPriceRanges(priceRanges);
                    setSelectedInteractiveObject("priceRanges");
                }}
                appearance={{
                    strokeStyle: "#8AAFE2",
                    strokeWidth: 2,
                    fill: "rgba(138, 175, 226, 0.2)",
                    edgeStroke: "#8AAFE2",
                    edgeFill: "#8AAFE2",
                    edgeStrokeWidth: 1,
                }}
                measure={true}
                hoverText={{ enable: false }}
            />
            <Text
                enabled={enableInteractiveObject === "Text"}
                textList={texts}
                onChoosePosition={onChoosePosition}
                onDragComplete={onDragComplete}
                onSelect={onSelectText}
                onEdit={onEditText}
                appearance={{
                    bgFill: "transparent",
                    bgStrokeWidth: 1,
                    bgStroke: "#1E53E5",
                    textFill: "#000000",
                    fontFamily: "sans-serif",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: "normal",
                }}
                defaultText="Text"
                hoverText={{ enable: false }}
            />
        </>
    );
};

export default ChartTools;
