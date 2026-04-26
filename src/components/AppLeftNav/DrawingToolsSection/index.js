import React from "react";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DrawingToolButton from "./DrawingToolButton";
import DropdownDrawingTool from "./DropdownDrawingTool";
import SelectionIcon from "../../../resources/images/SelectionIcon";
import TrendLineIcon from "../../../resources/images/TrendLineIcon";
import ExtendLineIcon from "../../../resources/images/ExtendLineIcon";
import RayLineIcon from "../../../resources/images/RayLineIcon";
import ArrowIcon from "../../../resources/images/ArrowIcon";
import RectangleIcon from "../../../resources/images/RectangleIcon";
import PriceRangeIcon from "../../../resources/images/PriceRangeIcon";
import MarqueeZoomIcon from "../../../resources/images/MarqueeZoomIcon";
import FibonacciSeriesIcon from "../../../resources/images/FibonacciSeriesIcon";
import EquidistantChannelIcon from "../../../resources/images/EquidistantChannelIcon";
import LinearRegressionChannelIcon from "../../../resources/images/LinearRegressionChannelIcon";
import GannFanIcon from "../../../resources/images/GannFanIcon";
import FreehandBrushIcon from "../../../resources/images/FreehandBrushIcon";
import IndicatorsIcon from "../../../resources/images/IndicatorsIcon";
import TextIcon from "../../../resources/images/TextIcon";

const SELECTION = {
    key: "Selection",
    icon: <SelectionIcon />,
    label: "Selection",
};

const TREND_TOOLS = [
    { key: "TrendLine", icon: <TrendLineIcon />, label: "Trend Line" },
    { key: "ExtendLine", icon: <ExtendLineIcon />, label: "Extend Line" },
    { key: "Ray", icon: <RayLineIcon />, label: "Ray Line" },
];

const SHAPES = [
    { key: "Arrow", icon: <ArrowIcon />, label: "Arrow" },
    { key: "Rectangle", icon: <RectangleIcon />, label: "Rectangle" },
];

const CHANNEL_TOOLS = [
    { key: "EquidistantChannel", icon: <EquidistantChannelIcon />, label: "Equidistant Channel" },
    {
        key: "LinearRegressionChannel",
        icon: <LinearRegressionChannelIcon />,
        label: "Linear Regression Channel",
    },
];

const OTHER_TOOLS = [
    { key: "FibonacciRetracement", icon: <FibonacciSeriesIcon />, label: "Fibonacci Retracement" },
    { key: "GannFan", icon: <GannFanIcon />, label: "Gann Fan" },
    { key: "FreehandBrush", icon: <FreehandBrushIcon />, label: "Brush" },
    { key: "Text", icon: <TextIcon />, label: "Text" },
];

const MEASUREMENT_TOOLS = [
    { key: "PriceRange", icon: <PriceRangeIcon />, label: "Price Range" },
    { key: "MarqueeZoom", icon: <MarqueeZoomIcon />, label: "Marquee Zoom" },
];

const INDICATOR = {
    key: "AddIndicator",
    icon: <IndicatorsIcon />,
    label: "Add Indicator",
};

const DrawingToolsSection = ({
    activeTool,
    onSelectTool,
    onAddIndicator,
    disabled,
    showAddIndicator,
}) => {
    return (
        <>
            <DrawingToolButton
                tool={SELECTION}
                active={activeTool === SELECTION.key}
                onSelect={onSelectTool}
                disabled={disabled}
            />
            <DropdownDrawingTool
                title="Trend Tools"
                tools={TREND_TOOLS}
                activeTool={activeTool}
                onSelect={onSelectTool}
                disabled={disabled}
            />
            <DropdownDrawingTool
                title="Shapes"
                tools={SHAPES}
                activeTool={activeTool}
                onSelect={onSelectTool}
                disabled={disabled}
            />
            <DropdownDrawingTool
                title="Channels"
                tools={CHANNEL_TOOLS}
                activeTool={activeTool}
                onSelect={onSelectTool}
                disabled={disabled}
            />
            {OTHER_TOOLS.map((tool) => (
                <DrawingToolButton
                    key={tool.key}
                    tool={tool}
                    active={activeTool === tool.key}
                    onSelect={onSelectTool}
                    disabled={disabled}
                />
            ))}
            <Divider />
            {MEASUREMENT_TOOLS.map((tool) => (
                <DrawingToolButton
                    key={tool.key}
                    tool={tool}
                    active={activeTool === tool.key}
                    onSelect={onSelectTool}
                    disabled={disabled}
                />
            ))}
            <Tooltip title={INDICATOR.label} arrow placement="right">
                <ListItemButton
                    selected={showAddIndicator}
                    disabled={disabled}
                    onClick={onAddIndicator}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                >
                    <ListItemIcon
                        sx={{
                            width: 32,
                            height: 32,
                            transform: "scale(1.2)",
                            minWidth: "unset",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {INDICATOR.icon}
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
        </>
    );
};

export default DrawingToolsSection;
