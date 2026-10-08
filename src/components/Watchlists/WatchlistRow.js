import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";

const METRIC_COLUMNS = new Set([
    "price",
    "parity",
    "currentYield",
    "residualValue",
    "technicalValue",
    "accruedInterest",
    "annualIncome",
    "couponIncome",
]);

const PRICE_COLUMNS = new Set(["price", "open", "high", "low"]);
const CHANGE_COLUMNS = new Set(["change", "changePercent"]);

const getValue = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    return typeof value === "object" ? (value.close ?? null) : value;
};

const formatNumber = (value, maximumFractionDigits = 2) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }

    return Number(value).toLocaleString(undefined, {
        maximumFractionDigits,
    });
};

const formatPrice = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }

    const number = Number(value);

    return number.toLocaleString(undefined, {
        minimumFractionDigits: number < 100 ? 2 : 0,
        maximumFractionDigits: number < 100 ? 4 : 2,
    });
};

const formatPercent = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }

    const number = Number(value);

    return `${number >= 0 ? "+" : ""}${number.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}%`;
};

const formatPlainPercent = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }

    return `${Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}%`;
};

const formatVolume = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }

    const number = Number(value);
    const absolute = Math.abs(number);

    if (absolute >= 1_000_000_000) {
        return `${(number / 1_000_000_000).toLocaleString(undefined, {
            maximumFractionDigits: 1,
        })}B`;
    }

    if (absolute >= 1_000_000) {
        return `${(number / 1_000_000).toLocaleString(undefined, {
            maximumFractionDigits: 1,
        })}M`;
    }

    if (absolute >= 1_000) {
        return `${(number / 1_000).toLocaleString(undefined, {
            maximumFractionDigits: 1,
        })}K`;
    }

    return number.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
};

const formatDate = (value) => {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

const getChangeColor = (value, theme) => {
    if (value === null || value === undefined) {
        return theme.palette.text.secondary;
    }

    const number = Number(value);

    if (Number.isNaN(number) || number === 0) {
        return theme.palette.text.secondary;
    }

    return number > 0 ? theme.palette.success.main : theme.palette.error.main;
};

const getCellValue = (instrument, columnId) => {
    if (columnId === "price") {
        return getValue(instrument?.price) ?? instrument?.close ?? null;
    }

    if (columnId === "parity" || columnId === "currentYield") {
        return getValue(instrument?.[columnId]);
    }

    if (columnId === "change") {
        return instrument?.dailyChange ?? null;
    }

    if (columnId === "changePercent") {
        return instrument?.dailyChangePercent ?? null;
    }

    return instrument?.[columnId] ?? null;
};

const getMetricExpression = (columnId) => {
    return METRIC_COLUMNS.has(columnId) ? columnId : null;
};

const formatMetric = (value, columnId) => {
    if (columnId === "date") {
        return formatDate(value);
    }

    if (columnId === "changePercent") {
        return formatPercent(value);
    }

    if (columnId === "change") {
        if (value === null || value === undefined || Number.isNaN(Number(value))) {
            return "—";
        }

        const number = Number(value);

        return `${number >= 0 ? "+" : ""}${formatPrice(number)}`;
    }

    if (PRICE_COLUMNS.has(columnId)) {
        return formatPrice(value);
    }

    if (columnId === "volume") {
        return formatVolume(value);
    }

    if (columnId === "parity") {
        return formatNumber(value, 2);
    }

    if (columnId === "currentYield") {
        return formatPlainPercent(Number(value) * 100);
    }

    if (
        columnId === "residualValue" ||
        columnId === "technicalValue" ||
        columnId === "accruedInterest" ||
        columnId === "annualIncome" ||
        columnId === "couponIncome"
    ) {
        return formatNumber(value, 4);
    }

    return formatNumber(value);
};

const getTooltip = (columnId) => {
    const tooltips = {
        price: "Closing price",
        change: "Change from previous close",
        changePercent: "Change from previous close (%)",
        open: "Opening price",
        high: "Daily high",
        low: "Daily low",
        volume: "Daily traded volume",
        date: "Last available trading date",
        parity: "Bond parity at close",
        currentYield: "Current yield at close",
        residualValue: "Residual value",
        technicalValue: "Technical value",
        accruedInterest: "Accrued interest",
        annualIncome: "Annual income",
        couponIncome: "Coupon income",
    };

    return tooltips[columnId] || "";
};

const WatchlistRow = ({ instrument, columns, onMetricClick, onRemoveTicker, rowIndex = 0 }) => {
    const dailyChange = Number(instrument?.dailyChange);
    const isPositive = dailyChange > 0;
    const isNegative = dailyChange < 0;

    return (
        <TableRow
            hover
            sx={(theme) => ({
                backgroundColor:
                    rowIndex % 2 === 0
                        ? theme.palette.background.paper
                        : theme.palette.action.hover,

                transition: "background-color 120ms ease",

                "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                },

                "&:last-child td": {
                    borderBottom: 0,
                },

                "& .MuiTableCell-root": {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxSizing: "border-box",
                },
            })}
        >
            {columns.map((column) => {
                if (column.id === "instrument") {
                    return (
                        <TableCell key={column.id} sx={{ minWidth: 100 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.7,
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 3,
                                        height: 21,
                                        borderRadius: 1,
                                        flexShrink: 0,
                                        backgroundColor: (theme) =>
                                            isPositive
                                                ? theme.palette.success.main
                                                : isNegative
                                                  ? theme.palette.error.main
                                                  : theme.palette.divider,
                                    }}
                                />

                                <Tooltip
                                    title={instrument?.name || instrument?.ticker || ""}
                                    arrow
                                    placement="top-start"
                                >
                                    <Typography
                                        variant="body2"
                                        onClick={() => onMetricClick(instrument, "price")}
                                        sx={(theme) => ({
                                            fontSize: 12,
                                            lineHeight: 1.2,
                                            fontWeight: 650,
                                            whiteSpace: "nowrap",
                                            cursor: "pointer",
                                            transition:
                                                "color 120ms ease, text-decoration-color 120ms ease",

                                            "&:hover": {
                                                color: theme.palette.primary.main,
                                                textDecoration: "underline",
                                                textUnderlineOffset: "2px",
                                            },
                                        })}
                                    >
                                        {instrument?.ticker || "—"}
                                    </Typography>
                                </Tooltip>

                                {onRemoveTicker && (
                                    <Tooltip title="Remove ticker" arrow>
                                        <IconButton
                                            size="small"
                                            aria-label={`Remove ${instrument?.ticker || "ticker"}`}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onRemoveTicker(instrument.ticker);
                                            }}
                                            sx={(theme) => ({
                                                ml: "auto",
                                                p: 0.35,
                                                width: 26,
                                                height: 26,
                                                flexShrink: 0,
                                                color: theme.palette.text.secondary,

                                                "&:hover": {
                                                    color: theme.palette.error.main,
                                                    backgroundColor:
                                                        theme.palette.error.main + "14",
                                                },
                                            })}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        </TableCell>
                    );
                }

                const value = getCellValue(instrument, column.id);
                const metricExpression = getMetricExpression(column.id);
                const isChangeColumn = CHANGE_COLUMNS.has(column.id);

                return (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        onClick={() => {
                            if (metricExpression) {
                                onMetricClick(instrument, metricExpression);
                            }
                        }}
                        sx={(theme) => ({
                            whiteSpace: "nowrap",
                            cursor: metricExpression ? "pointer" : "default",
                            fontVariantNumeric: "tabular-nums",

                            color: isChangeColumn
                                ? getChangeColor(value, theme)
                                : theme.palette.text.primary,

                            ...(column.separator && {
                                borderRight: `2px solid ${theme.palette.divider}`,
                                paddingRight: "16px",
                            }),

                            ...(column.metricStart && {
                                paddingLeft: "16px",
                            }),
                        })}
                    >
                        <Tooltip title={getTooltip(column.id)} arrow>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={(theme) => ({
                                    fontSize: 11.5,
                                    lineHeight: 1.2,
                                    fontWeight:
                                        column.id === "price" || column.id === "parity" ? 650 : 450,
                                    fontVariantNumeric: "tabular-nums",

                                    ...(metricExpression && {
                                        transition:
                                            "color 120ms ease, text-decoration-color 120ms ease",

                                        "&:hover": {
                                            color: theme.palette.primary.main,
                                            textDecoration: "underline",
                                            textUnderlineOffset: "2px",
                                        },
                                    }),
                                })}
                            >
                                {formatMetric(value, column.id)}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default WatchlistRow;
