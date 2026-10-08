import { Box, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ReactECharts from "echarts-for-react";

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

const formatPercent = (value, decimals = 2) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return "-";
    }

    const number = Number(value);

    if (number === 0) {
        return "0%";
    }

    return `${Number(number.toFixed(decimals))}%`;
};

const SectionCard = ({ title, subtitle, children, action }) => (
    <Box
        sx={{
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

const AmortizationSection = ({
    amortizations,
    sortedAmortizations,
    nextAmortization,
    isPastDate,
}) => {
    const amortizationOption = {
        animation: true,

        grid: {
            left: 54,
            right: 24,
            top: 30,
            bottom: 45,
            containLabel: true,
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params) => {
                const item = params?.[0];

                if (!item) {
                    return "";
                }

                const amortization = sortedAmortizations[item.dataIndex];

                return `
                    <div style="font-size:14px">
                        <strong>${formatDate(amortization.date)}</strong>
                        <br />
                        Amortization:
                        <strong>${formatPercent(amortization.percent, 3)}</strong>
                        <br />
                        Status:
                        <strong>
                            ${isPastDate(amortization.date) ? "Paid" : "Pending"}
                        </strong>
                    </div>
                `;
            },
        },

        xAxis: {
            type: "category",
            data: sortedAmortizations.map((item) => formatDate(item.date)),
            axisLabel: {
                fontSize: 13,
                color: "#666",
                rotate: sortedAmortizations.length > 8 ? 35 : 0,
                margin: 12,
            },
            axisLine: {
                lineStyle: {
                    color: "#d8d8d8",
                },
            },
            axisTick: {
                alignWithLabel: true,
            },
        },

        yAxis: {
            type: "value",
            name: "%",
            nameTextStyle: {
                fontSize: 13,
                color: "#777",
            },
            axisLabel: {
                fontSize: 13,
                color: "#666",
                formatter: (value) => formatPercent(value, 3),
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(0,0,0,0.07)",
                },
            },
        },

        series: [
            {
                type: "bar",
                barMaxWidth: 34,
                data: sortedAmortizations.map((item) => ({
                    value: Number(item.percent || 0),
                    itemStyle: {
                        color: isPastDate(item.date) ? "#90A4AE" : "#1976D2",
                        borderRadius: [5, 5, 0, 0],
                    },
                })),
                label: {
                    show: true,
                    position: "top",
                    fontSize: 13,
                    fontWeight: 700,
                    formatter: (params) => formatPercent(params.value, 3),
                },
                emphasis: {
                    focus: "series",
                },
            },
        ],
    };

    return (
        <Box sx={{ mb: 2 }}>
            <SectionCard
                title="Amortization Schedule"
                subtitle="Scheduled principal payments by date"
                action={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        {nextAmortization && (
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
                                    Next
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 750,
                                    }}
                                >
                                    {formatDate(nextAmortization.date)}
                                </Typography>

                                <Chip
                                    label={formatPercent(nextAmortization.percent, 3)}
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

                        <Chip
                            label={`${amortizations.length} events`}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: 1.5,
                                fontWeight: 650,
                            }}
                        />
                    </Box>
                }
            >
                <ReactECharts
                    option={amortizationOption}
                    style={{
                        width: "100%",
                        height: "320px",
                    }}
                    opts={{
                        renderer: "svg",
                    }}
                />
            </SectionCard>
        </Box>
    );
};

export default AmortizationSection;
