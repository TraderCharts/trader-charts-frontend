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

const CouponSection = ({ coupons, sortedCoupons, nextCoupon, couponAverage, isPastDate }) => {
    const couponOption = {
        animation: true,

        grid: {
            left: 58,
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

                const coupon = sortedCoupons[item.dataIndex];
                const ratePercent = Number(coupon.rate || 0) * 100;

                return `
                    <div style="font-size:14px">
                        <strong>${formatDate(coupon.date)}</strong>
                        <br />
                        Coupon rate:
                        <strong>${formatPercent(ratePercent, 3)}</strong>
                        <br />
                        Status:
                        <strong>
                            ${isPastDate(coupon.date) ? "Paid" : "Pending"}
                        </strong>
                    </div>
                `;
            },
        },

        xAxis: {
            type: "category",
            data: sortedCoupons.map((item) => formatDate(item.date)),
            axisLabel: {
                fontSize: 13,
                color: "#666",
                rotate: sortedCoupons.length > 5 ? 30 : 0,
                margin: 12,
            },
            axisLine: {
                lineStyle: {
                    color: "#d8d8d8",
                },
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
                barMaxWidth: 46,

                data: sortedCoupons.map((item) => ({
                    value: Number(item.rate || 0) * 100,

                    itemStyle: {
                        color: isPastDate(item.date) ? "#90A4AE" : "#7E57C2",
                        borderRadius: [6, 6, 0, 0],
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
                title="Coupon Schedule"
                subtitle="Coupon rates applicable on each payment date"
                action={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        {nextCoupon && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.75,
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1.5,
                                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                                    color: "secondary.main",
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
                                    {formatDate(nextCoupon.date)}
                                </Typography>

                                <Chip
                                    label={formatPercent(nextCoupon.rate * 100, 3)}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        borderRadius: 1.25,
                                        fontWeight: 750,
                                        bgcolor: (theme) =>
                                            alpha(theme.palette.secondary.main, 0.1),
                                        color: "secondary.main",
                                    }}
                                />
                            </Box>
                        )}

                        <Chip
                            label={`${coupons.length} events`}
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
                    option={couponOption}
                    style={{
                        width: "100%",
                        height: "320px",
                    }}
                    opts={{
                        renderer: "svg",
                    }}
                />

                <Box
                    sx={{
                        mt: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        flexWrap: "wrap",
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Average rate across recorded events
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 800 }}>
                        {formatPercent(couponAverage * 100, 3)}
                    </Typography>
                </Box>
            </SectionCard>
        </Box>
    );
};

export default CouponSection;
