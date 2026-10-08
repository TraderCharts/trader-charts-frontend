import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import WatchlistRow from "./WatchlistRow";

const marketColumns = [
    {
        id: "instrument",
        label: "Ticker",
        tooltip: "Instrument ticker",
        align: "left",
        sortable: true,
    },
    {
        id: "price",
        label: "Price",
        tooltip: "Closing price",
        align: "right",
        sortable: true,
    },
    {
        id: "change",
        label: "Chg.",
        tooltip: "Daily change",
        align: "right",
        sortable: true,
    },
    {
        id: "changePercent",
        label: "Chg. %",
        tooltip: "Daily change percentage",
        align: "right",
        sortable: true,
    },
    {
        id: "open",
        label: "Open",
        tooltip: "Opening price",
        align: "right",
        sortable: true,
    },
    {
        id: "high",
        label: "High",
        tooltip: "Daily high",
        align: "right",
        sortable: true,
    },
    {
        id: "low",
        label: "Low",
        tooltip: "Daily low",
        align: "right",
        sortable: true,
    },
    {
        id: "volume",
        label: "Volume",
        tooltip: "Daily traded volume",
        align: "right",
        sortable: true,
    },
    {
        id: "date",
        label: "Date",
        tooltip: "Last available trading date",
        align: "right",
        sortable: true,
        separator: true,
    },
];

const bondColumns = [
    {
        id: "parity",
        label: "Parity",
        tooltip: "Bond parity at close",
        align: "right",
        sortable: true,
        metricStart: true,
    },
    {
        id: "currentYield",
        label: "Curr. Yld.",
        tooltip: "Current yield at close",
        align: "right",
        sortable: true,
    },
    {
        id: "residualValue",
        label: "Res. Val.",
        tooltip: "Residual value",
        align: "right",
        sortable: true,
    },
    {
        id: "technicalValue",
        label: "Tech. Val.",
        tooltip: "Technical value",
        align: "right",
        sortable: true,
    },
    {
        id: "accruedInterest",
        label: "Accr. Int.",
        tooltip: "Accrued interest",
        align: "right",
        sortable: true,
    },
    {
        id: "annualIncome",
        label: "Ann. Inc.",
        tooltip: "Annual income",
        align: "right",
        sortable: true,
    },
    {
        id: "couponIncome",
        label: "Coup. Inc.",
        tooltip: "Coupon income",
        align: "right",
        sortable: true,
    },
];

const getSortValue = (instrument, columnId) => {
    switch (columnId) {
        case "instrument":
            return instrument?.ticker?.toLowerCase() || "";

        case "date": {
            const timestamp = new Date(instrument?.date).getTime();

            return Number.isNaN(timestamp) ? 0 : timestamp;
        }

        case "price":
            return Number(instrument?.price?.close ?? instrument?.close ?? 0);

        case "change":
            return Number(instrument?.dailyChange ?? 0);

        case "changePercent":
            return Number(instrument?.dailyChangePercent ?? 0);

        case "open":
            return Number(instrument?.open ?? 0);

        case "high":
            return Number(instrument?.high ?? 0);

        case "low":
            return Number(instrument?.low ?? 0);

        case "volume":
            return Number(instrument?.volume ?? 0);

        case "parity":
            return Number(instrument?.parity?.close ?? 0);

        case "currentYield":
            return Number(instrument?.currentYield?.close ?? 0);

        case "residualValue":
            return Number(instrument?.residualValue ?? 0);

        case "technicalValue":
            return Number(instrument?.technicalValue ?? 0);

        case "accruedInterest":
            return Number(instrument?.accruedInterest ?? 0);

        case "annualIncome":
            return Number(instrument?.annualIncome ?? 0);

        case "couponIncome":
            return Number(instrument?.couponIncome ?? 0);

        default:
            return 0;
    }
};

const WatchlistTable = ({ instruments = [], type, onMetricClick, onRemoveTicker }) => {
    const [sortColumn, setSortColumn] = useState("instrument");
    const [sortDirection, setSortDirection] = useState("asc");

    const columns = [...marketColumns, ...(type === "bond" ? bondColumns : [])];

    const sortedInstruments = useMemo(() => {
        return [...instruments].sort((a, b) => {
            const aValue = getSortValue(a, sortColumn);
            const bValue = getSortValue(b, sortColumn);

            let result;

            if (typeof aValue === "string" && typeof bValue === "string") {
                result = aValue.localeCompare(bValue);
            } else {
                result = aValue - bValue;
            }

            return sortDirection === "asc" ? result : -result;
        });
    }, [instruments, sortColumn, sortDirection]);

    const handleSort = (columnId) => {
        if (sortColumn === columnId) {
            setSortDirection((current) => (current === "asc" ? "desc" : "asc"));

            return;
        }

        setSortColumn(columnId);
        setSortDirection("desc");
    };

    return (
        <TableContainer
            sx={{
                overflowX: "auto",
                overflowY: "hidden",

                "&::-webkit-scrollbar": {
                    height: 6,
                },
            }}
        >
            <Table
                size="small"
                stickyHeader
                sx={{
                    width: "max-content",
                    minWidth: "100%",
                    tableLayout: "auto",

                    "& .MuiTableCell-root": {
                        boxSizing: "border-box",
                        px: 0.75,
                        py: 0.55,
                    },

                    "& .MuiTableCell-root:first-of-type": {
                        pl: 1.25,
                        pr: 1.25,
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            const isSorted = sortColumn === column.id;

                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    onClick={() => column.sortable && handleSort(column.id)}
                                    sx={(theme) => ({
                                        fontSize: 10.5,
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",

                                        color: isSorted
                                            ? theme.palette.text.primary
                                            : theme.palette.text.secondary,

                                        backgroundColor: "background.paper",

                                        cursor: column.sortable ? "pointer" : "default",

                                        borderBottom: `1px solid ${theme.palette.divider}`,

                                        ...(column.separator && {
                                            borderRight: `2px solid ${theme.palette.divider}`,
                                            paddingRight: "16px",
                                        }),

                                        ...(column.metricStart && {
                                            paddingLeft: "16px",
                                        }),

                                        "&:hover": column.sortable
                                            ? {
                                                  backgroundColor: theme.palette.action.hover,
                                              }
                                            : undefined,
                                    })}
                                >
                                    <Tooltip title={column.tooltip} arrow placement="top">
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            {column.label}

                                            {isSorted &&
                                                (sortDirection === "asc" ? (
                                                    <ArrowUpwardIcon
                                                        sx={{
                                                            fontSize: 11,
                                                        }}
                                                    />
                                                ) : (
                                                    <ArrowDownwardIcon
                                                        sx={{
                                                            fontSize: 11,
                                                        }}
                                                    />
                                                ))}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedInstruments.map((instrument, index) => (
                        <WatchlistRow
                            key={instrument.ticker || index}
                            instrument={instrument}
                            type={type}
                            columns={columns}
                            onMetricClick={onMetricClick}
                            onRemoveTicker={onRemoveTicker}
                            rowIndex={index}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WatchlistTable;
