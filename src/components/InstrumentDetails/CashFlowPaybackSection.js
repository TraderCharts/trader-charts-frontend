import { Box, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ReactECharts from "echarts-for-react";

const MARKET_PRICE_COLOR = "#90A4AE";
const CASH_FLOW_COLOR = "#5470C6";

const formatDate = (value) => {
    if (!value) {
        return "-";
    }

    const date = parseDate(value);

    if (!date) {
        return "-";
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const parseDate = (value) => {
    if (!value) {
        return null;
    }

    const date = new Date(
        typeof value === "string" && value.length === 10 ? `${value}T00:00:00` : value
    );

    return Number.isNaN(date.getTime()) ? null : date;
};

const formatNumber = (value, decimals = 2) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return "-";
    }

    return Number(value).toFixed(decimals);
};

const SectionCard = ({ title, subtitle, children, action }) => (
    <Box
        sx={{
            mb: 2,
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.paper",
            overflow: "hidden",
        }}
    >
        <Box
            sx={{
                px: { xs: 2, md: 2.5 },
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Box sx={{ minWidth: 0 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 750,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mt: 0.25,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            {action}
        </Box>

        <Box
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                p: { xs: 1.5, md: 2 },
            }}
        >
            {children}
        </Box>
    </Box>
);

const MetricCard = ({ label, value, highlighted = false, subtle = false }) => (
    <Box
        sx={{
            p: 1.75,
            borderRadius: 2,
            bgcolor: (theme) => {
                if (highlighted) {
                    return alpha(theme.palette.primary.main, 0.08);
                }

                if (subtle) {
                    return alpha(theme.palette.text.primary, 0.035);
                }

                return "action.hover";
            },
        }}
    >
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>

        <Typography
            variant="h6"
            sx={{
                fontWeight: 800,
                mt: 0.25,
            }}
        >
            {value}
        </Typography>
    </Box>
);

const CashFlowLegend = ({ marketPriceColor }) => (
    <Box
        sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 3 },
            flexWrap: "wrap",
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
            }}
        >
            <Box
                sx={{
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    bgcolor: CASH_FLOW_COLOR,
                }}
            />

            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
                Cumulative cash flows
            </Typography>
        </Box>

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
            }}
        >
            <Box
                sx={{
                    width: 24,
                    height: 0,
                    borderTop: `2px dashed ${marketPriceColor}`,
                }}
            />

            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 650 }}>
                Current market price
            </Typography>
        </Box>
    </Box>
);

/* ============================================================
 * Cash-flow event helpers
 * ============================================================ */

const createEmptyEvent = (date) => ({
    date,
    amount: 0,
    types: [],
});

const addEventComponent = (eventsByDate, item, amount, type) => {
    const date = parseDate(item.date);

    if (!date || amount <= 0) {
        return;
    }

    const key = item.date;

    if (!eventsByDate.has(key)) {
        eventsByDate.set(key, createEmptyEvent(item.date));
    }

    const event = eventsByDate.get(key);

    event.amount += amount;

    event.types.push({
        type,
        amount,
    });
};

const buildCashFlowEvents = (coupons, amortizations, today) => {
    const eventsByDate = new Map();

    coupons.forEach((item) => {
        const amount = Number(item.rate || 0) * 100;

        addEventComponent(eventsByDate, item, amount, "Coupon");
    });

    amortizations.forEach((item) => {
        const amount = Number(item.percent || 0);

        addEventComponent(eventsByDate, item, amount, "Amortization");
    });

    return Array.from(eventsByDate.values())
        .filter((event) => {
            const date = parseDate(event.date);

            return date && date >= today && event.amount > 0;
        })
        .sort((a, b) => parseDate(a.date) - parseDate(b.date));
};

/* ============================================================
 * Payback calculation
 * ============================================================ */

const calculatePayback = (events, currentPrice, today) => {
    let cumulative = 0;
    let paybackEvent = null;

    const marketPrice = Number(currentPrice || 0);

    const chartEvents = events.map((event) => {
        cumulative += event.amount;

        if (!paybackEvent && cumulative >= marketPrice) {
            paybackEvent = {
                ...event,
                cumulative,
            };
        }

        return {
            ...event,
            cumulative,
        };
    });

    const futureCashFlows = cumulative;
    const paybackDate = paybackEvent?.date || null;

    const paybackPeriod =
        paybackDate && parseDate(paybackDate)
            ? (parseDate(paybackDate) - today) / (365.25 * 24 * 60 * 60 * 1000)
            : null;

    const cashFlowsAboveMarketPrice = Math.max(futureCashFlows - marketPrice, 0);

    return {
        chartEvents,
        futureCashFlows,
        paybackEvent,
        paybackDate,
        paybackPeriod,
        cashFlowsAboveMarketPrice,
    };
};

/* ============================================================
 * Chart geometry
 * ============================================================ */

const buildChartSegments = (chartEvents) => {
    const horizontalSegments = [];
    const verticalSegments = [];

    chartEvents.forEach((event, index) => {
        if (index === 0) {
            return;
        }

        const previousEvent = chartEvents[index - 1];

        horizontalSegments.push({
            fromX: index - 1,
            toX: index,
            y: previousEvent.cumulative,
        });

        verticalSegments.push({
            x: index,
            fromY: previousEvent.cumulative,
            toY: event.cumulative,
        });
    });

    return {
        horizontalSegments,
        verticalSegments,
    };
};

/* ============================================================
 * Chart tooltip
 * ============================================================ */

const formatCashFlowTooltip = (event) => {
    const details = event.types
        .map(
            (component) => `
                ${component.type}:
                <strong>
                    ${formatNumber(component.amount)}
                </strong>
                <br />
            `
        )
        .join("");

    return `
        <div style="font-size:14px">
            <strong>
                ${formatDate(event.date)}
            </strong>
            <br />
            ${details}
            Cumulative cash flows:
            <strong>
                ${formatNumber(event.cumulative)}
            </strong>
        </div>
    `;
};

/* ============================================================
 * Chart option
 * ============================================================ */

const buildCashFlowChartOption = ({ chartEvents, currentPrice }) => {
    const chartDates = chartEvents.map((event) => formatDate(event.date));

    const { horizontalSegments, verticalSegments } = buildChartSegments(chartEvents);

    return {
        animation: true,

        legend: {
            show: false,
        },

        grid: {
            left: 70,
            right: 30,
            top: 55,
            bottom: 65,
            containLabel: true,
        },

        tooltip: {
            trigger: "axis",

            formatter: (params) => {
                const item = params?.find((param) => param.seriesName === "Cash flow events");

                if (!item) {
                    return "";
                }

                const event = chartEvents[item.dataIndex];

                if (!event) {
                    return "";
                }

                return formatCashFlowTooltip(event);
            },
        },

        xAxis: {
            type: "category",
            data: chartDates,

            axisLabel: {
                fontSize: 12,
                color: "#666",
                rotate: chartDates.length > 6 ? 30 : 0,
                margin: 14,
            },

            axisLine: {
                lineStyle: {
                    color: "#d8d8d8",
                },
            },
        },

        yAxis: {
            type: "value",
            name: "Value",

            nameTextStyle: {
                fontSize: 13,
                color: "#777",
            },

            axisLabel: {
                fontSize: 12,
                color: "#666",
                formatter: (value) => formatNumber(value),
            },

            splitLine: {
                show: false,
            },
        },

        series: [
            {
                name: "Cash flow events",
                type: "scatter",

                data: chartEvents.map((event) => event.cumulative),

                symbol: "circle",
                symbolSize: 8,

                itemStyle: {
                    color: CASH_FLOW_COLOR,
                },

                label: {
                    show: true,
                    position: "left",
                    distance: 8,

                    formatter: (params) => {
                        const event = chartEvents[params.dataIndex];

                        return `+${formatNumber(event.amount)}`;
                    },

                    fontSize: 14,
                    fontWeight: 700,
                },

                z: 5,
            },

            {
                name: "Cumulative cash flows",
                type: "custom",

                renderItem: (params, api) => {
                    const segment = horizontalSegments[params.dataIndex];

                    if (!segment) {
                        return null;
                    }

                    const start = api.coord([segment.fromX, segment.y]);

                    const end = api.coord([segment.toX, segment.y]);

                    return {
                        type: "line",

                        shape: {
                            x1: start[0],
                            y1: start[1],
                            x2: end[0],
                            y2: end[1],
                        },

                        style: {
                            stroke: CASH_FLOW_COLOR,
                            lineWidth: 3,
                        },

                        silent: true,
                    };
                },

                data: horizontalSegments.map((segment) => [segment.fromX, segment.toX, segment.y]),

                z: 2,
            },

            {
                name: "Cash flow jumps",
                type: "custom",

                renderItem: (params, api) => {
                    const segment = verticalSegments[params.dataIndex];

                    if (!segment) {
                        return null;
                    }

                    const start = api.coord([segment.x, segment.fromY]);

                    const end = api.coord([segment.x, segment.toY]);

                    return {
                        type: "line",

                        shape: {
                            x1: start[0],
                            y1: start[1],
                            x2: end[0],
                            y2: end[1],
                        },

                        style: {
                            stroke: CASH_FLOW_COLOR,
                            lineWidth: 2,
                            lineDash: [5, 5],
                        },

                        silent: true,
                    };
                },

                data: verticalSegments.map((segment) => [segment.x, segment.fromY, segment.toY]),

                z: 3,
            },

            {
                name: "Current market price",
                type: "line",

                data: chartDates.map(() => Number(currentPrice || 0)),

                symbol: "none",

                lineStyle: {
                    color: MARKET_PRICE_COLOR,
                    type: "dashed",
                    width: 1.5,
                    opacity: 0.8,
                },

                tooltip: {
                    show: false,
                },

                z: 1,
            },
        ],
    };
};

/* ============================================================
 * Header action
 * ============================================================ */

const PaybackHeader = ({ paybackDate, paybackEvent }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
        }}
    >
        {paybackDate && (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1.5,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                    color: "primary.main",
                }}
            >
                <EventOutlinedIcon fontSize="small" />

                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Expected payback
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 750,
                    }}
                >
                    {formatDate(paybackDate)}
                </Typography>

                <Chip
                    label={`${formatNumber(paybackEvent.cumulative)} Cash Flows`}
                    size="small"
                    color="primary"
                    sx={{
                        height: 22,
                        borderRadius: 1.25,
                        fontWeight: 750,
                    }}
                />
            </Box>
        )}
    </Box>
);

/* ============================================================
 * Metrics
 * ============================================================ */

const PaybackMetrics = ({
    currentPrice,
    futureCashFlows,
    paybackPeriod,
    cashFlowsAboveMarketPrice,
}) => (
    <Box
        sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
            },
            gap: 1,
        }}
    >
        <MetricCard label="Current market price" value={formatNumber(currentPrice)} subtle />

        <MetricCard label="Cumulative cash flows" value={formatNumber(futureCashFlows)} />

        <MetricCard
            label="Payback period"
            value={
                paybackPeriod !== null ? `${formatNumber(paybackPeriod, 1)} years` : "Not reached"
            }
            highlighted
        />

        <MetricCard
            label="Cash flows above market price"
            value={formatNumber(cashFlowsAboveMarketPrice)}
            highlighted
        />
    </Box>
);

/* ============================================================
 * Main component
 * ============================================================ */

const CashFlowPaybackSection = ({ currentPrice, coupons = [], amortizations = [] }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = buildCashFlowEvents(coupons, amortizations, today);

    const {
        chartEvents,
        futureCashFlows,
        paybackEvent,
        paybackDate,
        paybackPeriod,
        cashFlowsAboveMarketPrice,
    } = calculatePayback(events, currentPrice, today);

    const chartOption = buildCashFlowChartOption({
        chartEvents,
        currentPrice,
        paybackEvent,
    });

    return (
        <SectionCard
            title="Cash Flow Payback"
            subtitle="Future cash flows required to recover today's market price"
            action={<PaybackHeader paybackDate={paybackDate} paybackEvent={paybackEvent} />}
        >
            {chartEvents.length === 0 ? (
                <Box
                    sx={{
                        minHeight: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                    }}
                >
                    <Typography variant="body2">No future cash flows available.</Typography>
                </Box>
            ) : (
                <>
                    <ReactECharts
                        option={chartOption}
                        style={{
                            width: "100%",
                            height: "380px",
                        }}
                        opts={{
                            renderer: "svg",
                        }}
                    />

                    <CashFlowLegend marketPriceColor={MARKET_PRICE_COLOR} />

                    <PaybackMetrics
                        currentPrice={currentPrice}
                        futureCashFlows={futureCashFlows}
                        paybackPeriod={paybackPeriod}
                        cashFlowsAboveMarketPrice={cashFlowsAboveMarketPrice}
                    />
                </>
            )}
        </SectionCard>
    );
};

export default CashFlowPaybackSection;
