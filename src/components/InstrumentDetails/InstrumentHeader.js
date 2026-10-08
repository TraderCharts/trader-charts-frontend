import React from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import Tooltip from "@mui/material/Tooltip";

import IntradayCanvas from "./IntradayCanvas";

const GREEN = "#168A45";
const RED = "#FF073A";
const NEUTRAL = "#555555";

const formatNumber = (value, decimals = 2) => {
    const number = Number(value);

    return Number.isFinite(number) ? number.toFixed(decimals) : "-";
};

const formatDate = (value) => {
    if (!value) {
        return "-";
    }

    const date = new Date(
        typeof value === "string" && value.length === 10 ? `${value}T00:00:00` : value
    );

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const getMarketState = (change) => {
    if (change > 0) {
        return {
            color: GREEN,
            background: alpha(GREEN, 0.11),
            Icon: ArrowUpwardRoundedIcon,
        };
    }

    if (change < 0) {
        return {
            color: RED,
            background: alpha(RED, 0.1),
            Icon: ArrowDownwardRoundedIcon,
        };
    }

    return {
        color: NEUTRAL,
        background: "transparent",
        Icon: RemoveRoundedIcon,
    };
};

const InstrumentIdentity = ({ instrument }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: "1.8rem",
                        md: "2rem",
                    },
                    fontWeight: 850,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                }}
            >
                {instrument?.symbol || "-"}
            </Typography>

            <Chip
                label="BOND"
                size="small"
                sx={{
                    height: 24,
                    borderRadius: 1.25,
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.09),
                    color: "primary.main",
                }}
            />
        </Box>
    );
};

const PriceDisplay = ({ price, change, changePercent, marketState }) => {
    const { color, background, Icon } = marketState;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                mt: 1.25,
                flexWrap: "wrap",
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: "2.5rem",
                        md: "3rem",
                    },
                    lineHeight: 0.95,
                    letterSpacing: "-0.045em",
                    color,
                    fontWeight: 900,
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                {formatNumber(price)}
            </Typography>

            {change !== null && (
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.4,
                        px: 0.85,
                        py: 0.45,
                        borderRadius: 1.25,
                        bgcolor: background,
                        color,
                    }}
                >
                    <Icon
                        sx={{
                            fontSize: 28,
                            fontWeight: 900,
                        }}
                    />

                    <Typography
                        component="span"
                        sx={{
                            fontSize: "1.4rem",
                            fontWeight: 850,
                            lineHeight: 1,
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {change > 0 ? "+" : ""}
                        {formatNumber(change)}
                    </Typography>

                    {changePercent !== null && (
                        <>
                            <Typography
                                component="span"
                                sx={{
                                    opacity: 0.5,
                                    fontWeight: 700,
                                    mx: 0.1,
                                }}
                            >
                                ·
                            </Typography>

                            <Typography
                                component="span"
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: 850,
                                    lineHeight: 1,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {changePercent > 0 ? "+" : ""}
                                {formatNumber(changePercent)}%
                            </Typography>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

const ClosingPriceContext = ({ date }) => {
    return (
        <Box sx={{ mt: 0.9 }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    fontWeight: 600,
                    fontSize: "0.76rem",
                }}
            >
                Closing price · on {formatDate(date)}
            </Typography>
        </Box>
    );
};

const IntradaySection = ({ latestData }) => {
    return (
        <Box
            sx={{
                width: "fit-content",
                maxWidth: "100%",
                p: 1.5,
                borderRadius: 2,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.025),
            }}
        >
            <Typography
                sx={{
                    mb: 0.75,
                    fontSize: "0.8rem",
                    lineHeight: 1.2,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "text.secondary",
                }}
            >
                Intraday Overview
            </Typography>

            <IntradayCanvas
                open={latestData?.open}
                high={latestData?.high}
                low={latestData?.low}
                close={latestData?.close}
            />
        </Box>
    );
};
const InstrumentActions = ({ instrument }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: {
                    xs: "flex-start",
                    md: "flex-end",
                },
                gap: 0.75,
                flexWrap: "wrap",
                alignSelf: "start",
            }}
        >
            <Tooltip title="Download terms and conditions">
                <Chip
                    component="a"
                    href={
                        instrument?.termsDocumentUrl ? `/${instrument.termsDocumentUrl}` : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                    icon={<DownloadOutlinedIcon />}
                    label="Terms & Conditions"
                    variant="outlined"
                    sx={{
                        height: 34,
                        borderRadius: 1.5,
                        fontWeight: 650,
                        textDecoration: "none",
                        "& .MuiChip-icon": {
                            fontSize: 18,
                        },
                    }}
                />
            </Tooltip>

            <Chip
                icon={<AccountBalanceOutlinedIcon />}
                label={instrument?.currencyEmission || "-"}
                variant="outlined"
                sx={{
                    height: 34,
                    borderRadius: 1.5,
                    fontWeight: 650,
                }}
            />

            <Chip
                icon={<PaymentsOutlinedIcon />}
                label={instrument?.currencyPayment || "-"}
                variant="outlined"
                sx={{
                    height: 34,
                    borderRadius: 1.5,
                    fontWeight: 650,
                }}
            />

            <Chip
                icon={<PublicOutlinedIcon />}
                label={instrument?.governingLaw || "-"}
                variant="outlined"
                sx={{
                    height: 34,
                    borderRadius: 1.5,
                    fontWeight: 650,
                }}
            />
        </Box>
    );
};

const InstrumentHeader = ({ instrument }) => {
    const latestData = instrument?.latestData || {};

    const price = Number(latestData?.price?.close ?? latestData?.close);

    const previousClose = Number(latestData?.previousClose);

    const hasPrice = Number.isFinite(price);
    const hasPreviousClose = Number.isFinite(previousClose);

    const change = hasPrice && hasPreviousClose ? price - previousClose : null;

    const changePercent =
        change !== null && previousClose !== 0 ? (change / previousClose) * 100 : null;

    const marketState = getMarketState(change);

    return (
        <Card
            elevation={0}
            sx={{
                mb: 2,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
                overflow: "hidden",
            }}
        >
            <CardContent
                sx={{
                    p: {
                        xs: 2,
                        md: 2.5,
                    },
                    "&:last-child": {
                        pb: {
                            xs: 2,
                            md: 2.5,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "auto auto 1fr",
                        },
                        alignItems: "center",
                        columnGap: {
                            xs: 2,
                            md: 3,
                        },
                        rowGap: 2,
                    }}
                >
                    {/* ================================================= */}
                    {/* COLUMN 1 — INSTRUMENT */}
                    {/* ================================================= */}

                    <Box
                        sx={{
                            minWidth: 0,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        <InstrumentIdentity instrument={instrument} />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <PriceDisplay
                                price={price}
                                change={change}
                                changePercent={changePercent}
                                marketState={marketState}
                            />

                            <ClosingPriceContext date={latestData?.date} />
                        </Box>
                    </Box>

                    {/* ================================================= */}
                    {/* COLUMN 2 — INTRADAY */}
                    {/* ================================================= */}

                    <Box
                        sx={{
                            justifySelf: "start",
                            minWidth: 0,
                        }}
                    >
                        <IntradaySection latestData={latestData} />
                    </Box>

                    {/* ================================================= */}
                    {/* COLUMN 3 — ACTIONS */}
                    {/* ================================================= */}

                    <InstrumentActions instrument={instrument} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default InstrumentHeader;
