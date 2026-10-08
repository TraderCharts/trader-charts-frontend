import React, { useEffect, useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const GREEN = "#168A45";
const RED = "#FF073A";
const NEUTRAL = "#555555";

const formatNumber = (value, decimals = 2) => {
    const number = Number(value);

    return Number.isFinite(number) ? number.toFixed(decimals) : "-";
};

const normalizeValues = ({ open, high, low, close }) => {
    const values = {
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
    };

    if (Object.values(values).some((value) => !Number.isFinite(value))) {
        return null;
    }

    if (values.high < values.low) {
        return null;
    }

    return values;
};

const getMetrics = ({ open, high, low, close }) => {
    const highLowRange = high - low;
    const openCloseRange = Math.abs(close - open);

    const highLowRangePercent = open !== 0 ? (highLowRange / open) * 100 : null;

    const openCloseRangePercent = open !== 0 ? (openCloseRange / open) * 100 : null;

    const isPositive = close > open;
    const isNegative = close < open;

    return {
        highLowRange,
        highLowRangePercent,
        openCloseRange,
        openCloseRangePercent,
        isPositive,
        isNegative,
        marketColor: getMarketColor(isPositive, isNegative),
    };
};

const getMarketColor = (isPositive, isNegative) => {
    if (isPositive) {
        return GREEN;
    }

    if (isNegative) {
        return RED;
    }

    return NEUTRAL;
};

const getChangeIcon = (isPositive, isNegative) => {
    if (isPositive) {
        return ArrowUpwardRoundedIcon;
    }

    if (isNegative) {
        return ArrowDownwardRoundedIcon;
    }

    return RemoveRoundedIcon;
};

const createPriceScale = (high, low, close, height) => {
    const chartTop = 5;
    const chartBottom = height - 5;
    const chartHeight = chartBottom - chartTop;

    const priceRange = high - low;

    const padding = Math.max(priceRange * 0.07, Math.abs(close) * 0.001, 0.01);

    const minPrice = low - padding;
    const maxPrice = high + padding;

    const valueToY = (value) => {
        if (maxPrice === minPrice) {
            return chartTop + chartHeight / 2;
        }

        return chartTop + ((maxPrice - value) / (maxPrice - minPrice)) * chartHeight;
    };

    return {
        valueToY,
        chartTop,
        chartBottom,
        chartHeight,
    };
};

const drawWick = (ctx, centerX, yHigh, yLow, color) => {
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(centerX, yHigh);
    ctx.lineTo(centerX, yLow);
    ctx.stroke();

    ctx.restore();
};

const drawBody = (ctx, centerX, yOpen, yClose, color) => {
    const bodyWidth = 28;
    const minBodyHeight = 9;

    const bodyLeft = centerX - bodyWidth / 2;
    const bodyTop = Math.min(yOpen, yClose);
    const bodyBottom = Math.max(yOpen, yClose);

    const bodyHeight = Math.max(bodyBottom - bodyTop, minBodyHeight);

    const actualBodyTop = bodyBottom - bodyHeight;

    ctx.save();

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.roundRect(bodyLeft, actualBodyTop, bodyWidth, bodyHeight, 5);
    ctx.fill();

    ctx.restore();

    return {
        bodyWidth,
        bodyLeft,
    };
};

const drawEndpoint = (ctx, x, y, color) => {
    ctx.save();

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

const drawLabel = (ctx, text, x, y, align) => {
    ctx.save();

    ctx.font = '600 10px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

    ctx.textBaseline = "middle";
    ctx.textAlign = align;
    ctx.fillStyle = "rgba(80, 80, 80, 0.78)";

    ctx.fillText(text, x, y);

    ctx.restore();
};

const drawOhlcLabels = (ctx, values, positions, centerX, bodyWidth) => {
    const rightX = centerX + bodyWidth / 2 + 7;
    const leftX = centerX - bodyWidth / 2 - 7;

    drawLabel(ctx, `H ${formatNumber(values.high)}`, rightX, positions.high, "left");

    drawLabel(ctx, `L ${formatNumber(values.low)}`, rightX, positions.low, "left");

    drawLabel(ctx, `O ${formatNumber(values.open)}`, leftX, positions.open, "right");

    drawLabel(ctx, `C ${formatNumber(values.close)}`, leftX, positions.close, "right");
};

const drawCandle = (ctx, width, height, values, color) => {
    const { open, high, low, close } = values;

    const centerX = width * 0.5;

    const scale = createPriceScale(high, low, close, height);

    const positions = {
        high: scale.valueToY(high),
        low: scale.valueToY(low),
        open: scale.valueToY(open),
        close: scale.valueToY(close),
    };

    const { bodyWidth } = drawBody(ctx, centerX, positions.open, positions.close, color);

    drawWick(ctx, centerX, positions.high, positions.low, color);

    drawEndpoint(ctx, centerX, positions.high, color);

    drawEndpoint(ctx, centerX, positions.low, color);

    drawOhlcLabels(ctx, values, positions, centerX, bodyWidth);
};

const drawCanvas = (canvas, container, values) => {
    const rect = container.getBoundingClientRect();

    const width = Math.max(Math.round(rect.width), 70);
    const height = Math.max(Math.round(rect.height), 105);

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const color = getMarketColor(values.close > values.open, values.close < values.open);

    drawCandle(ctx, width, height, values, color);
};

const RangeMetric = ({ label, value, percent, color, Icon }) => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: "0.72rem",
                    lineHeight: 1.1,
                    fontWeight: 700,
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                }}
            >
                {label}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.25,
                    mt: 0.3,
                }}
            >
                <Icon
                    sx={{
                        fontSize: 22,
                        fontWeight: 900,
                        color,
                    }}
                />

                <Typography
                    component="span"
                    sx={{
                        fontSize: "0.98rem",
                        lineHeight: 1,
                        fontWeight: 850,
                        color,
                        fontVariantNumeric: "tabular-nums",
                        whiteSpace: "nowrap",
                    }}
                >
                    {formatNumber(value)}
                    {" · "}
                    {formatNumber(percent)}%
                </Typography>
            </Box>
        </Box>
    );
};

const IntradayCanvas = ({ open, high, low, close }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const values = useMemo(
        () =>
            normalizeValues({
                open,
                high,
                low,
                close,
            }),
        [open, high, low, close]
    );

    const metrics = useMemo(() => (values ? getMetrics(values) : null), [values]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container || !values) {
            return undefined;
        }

        let animationFrame;

        const render = () => {
            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                drawCanvas(canvas, container, values);
            });
        };

        const resizeObserver = new ResizeObserver(render);

        resizeObserver.observe(container);

        render();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [values]);

    if (!values || !metrics) {
        return null;
    }

    const ChangeIcon = getChangeIcon(metrics.isPositive, metrics.isNegative);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                mt: 0.5,
                width: "fit-content",
                maxWidth: "100%",
            }}
        >
            <Box
                ref={containerRef}
                sx={{
                    width: 165,
                    height: 105,
                    flexShrink: 0,
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </Box>

            <Box
                sx={{
                    minWidth: 105,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.9,
                }}
            >
                <RangeMetric
                    label="High-Low Range"
                    value={metrics.highLowRange}
                    percent={metrics.highLowRangePercent}
                    color={metrics.marketColor}
                    Icon={ChangeIcon}
                />

                <RangeMetric
                    label="Open-Close Range"
                    value={metrics.openCloseRange}
                    percent={metrics.openCloseRangePercent}
                    color={metrics.marketColor}
                    Icon={ChangeIcon}
                />
            </Box>
        </Box>
    );
};

export default IntradayCanvas;
