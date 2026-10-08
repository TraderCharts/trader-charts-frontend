import { Box, Card, Grid, Typography } from "@mui/material";

const Metric = ({ label, value, emphasis = false, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            minWidth: 0,
            cursor: onClick ? "pointer" : "default",
            borderRadius: 1.5,
            p: 0.75,
            mx: -0.75,
            transition: "background-color 0.15s ease",
            "&:hover": onClick
                ? {
                      bgcolor: "action.hover",
                  }
                : undefined,
        }}
    >
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{
                display: "block",
                fontSize: "0.67rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 700,
                mb: 0.25,
            }}
        >
            {label}
        </Typography>

        <Typography
            variant="body2"
            sx={{
                fontWeight: emphasis ? 800 : 650,
                whiteSpace: "nowrap",
            }}
        >
            {value}
        </Typography>
    </Box>
);

const format = (value, decimals = 2) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return "-";
    }

    return Number(value).toFixed(decimals);
};

const formatPercent = (value, decimals = 2) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return "-";
    }

    return `${Number(value).toFixed(decimals)}%`;
};

const CurrentMetricsSection = ({ latestData, ticker, onMetricClick }) => {
    if (!latestData) {
        return null;
    }

    const price = latestData.price || {};
    const parity = latestData.parity || {};
    const currentYield = latestData.currentYield || {};

    const handleMetricClick = (metric) => {
        if (!ticker || !onMetricClick) {
            return;
        }

        onMetricClick({
            expression: `${ticker}.${metric}`,
            interval: "D",
            tickers: [ticker],
        });
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, md: 2.5 },
                    py: 1.25,
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 750,
                    }}
                >
                    Current Market Metrics
                </Typography>
            </Box>

            <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.5 }}>
                <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Price"
                            value={format(price.close)}
                            emphasis
                            onClick={() => handleMetricClick("price")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Residual Value"
                            value={format(latestData.residualValue)}
                            onClick={() => handleMetricClick("residualValue")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Parity"
                            value={formatPercent(parity.close)}
                            onClick={() => handleMetricClick("parity")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Current Yield"
                            value={formatPercent(Number(currentYield.close || 0) * 100, 3)}
                            onClick={() => handleMetricClick("currentYield")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Technical Value"
                            value={format(latestData.technicalValue, 4)}
                            onClick={() => handleMetricClick("technicalValue")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Accrued Interest"
                            value={format(latestData.accruedInterest, 4)}
                            onClick={() => handleMetricClick("accruedInterest")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Annual Income"
                            value={format(latestData.annualIncome)}
                            onClick={() => handleMetricClick("annualIncome")}
                        />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Metric
                            label="Coupon Income"
                            value={format(latestData.couponIncome)}
                            onClick={() => handleMetricClick("couponIncome")}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default CurrentMetricsSection;
