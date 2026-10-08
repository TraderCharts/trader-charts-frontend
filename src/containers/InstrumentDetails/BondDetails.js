import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import { connect } from "react-redux";

import InstrumentHeader from "../../components/InstrumentDetails/InstrumentHeader";
import InstrumentOverview from "../../components/InstrumentDetails/InstrumentOverview";
import PrincipalSection from "../../components/InstrumentDetails/PrincipalSection";
import CashFlowPaybackSection from "../../components/InstrumentDetails/CashFlowPaybackSection";
import AmortizationSection from "../../components/InstrumentDetails/AmortizationSection";
import CouponSection from "../../components/InstrumentDetails/CouponSection";
import DocumentationSection from "../../components/InstrumentDetails/DocumentationSection";
import CurrentMetricsSection from "../../components/InstrumentDetails/CurrentMetricsSection";
import BondEvents from "../../components/InstrumentDetails/BondEvents";

import { changeSelectedTicker } from "../../redux/actions/containers.action";
import { fetchBymaStocksDataSagaRequest } from "../../redux/sagas/actions/byma.action";
import { useNavigate } from "react-router-dom";

const parseDate = (value) => {
    if (!value) {
        return null;
    }

    const date = new Date(
        typeof value === "string" && value.length === 10 ? `${value}T00:00:00` : value
    );

    return Number.isNaN(date.getTime()) ? null : date;
};

const isPastDate = (value) => {
    const date = parseDate(value);

    if (!date) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
};

const BondDetails = ({ instrument, onChangeSelectedTicker, onFetchBymaStocksData }) => {
    const navigate = useNavigate();
    const amortizations = instrument?.amortizations || [];
    const coupons = instrument?.coupons || [];

    const sortedAmortizations = useMemo(
        () =>
            [...amortizations].sort(
                (a, b) => (parseDate(a.date)?.getTime() || 0) - (parseDate(b.date)?.getTime() || 0)
            ),
        [amortizations]
    );

    const sortedCoupons = useMemo(
        () =>
            [...coupons].sort(
                (a, b) => (parseDate(a.date)?.getTime() || 0) - (parseDate(b.date)?.getTime() || 0)
            ),
        [coupons]
    );

    const totalAmortization = useMemo(
        () => sortedAmortizations.reduce((total, item) => total + Number(item.percent || 0), 0),
        [sortedAmortizations]
    );

    const paidAmortization = useMemo(
        () =>
            sortedAmortizations
                .filter((item) => isPastDate(item.date))
                .reduce((total, item) => total + Number(item.percent || 0), 0),
        [sortedAmortizations]
    );

    const remainingAmortization = Math.max(0, totalAmortization - paidAmortization);

    const progress =
        totalAmortization > 0 ? Math.min((paidAmortization / totalAmortization) * 100, 100) : 0;

    const nextAmortization = sortedAmortizations.find((item) => !isPastDate(item.date)) || null;

    const nextCoupon = sortedCoupons.find((item) => !isPastDate(item.date)) || null;

    const couponAverage =
        sortedCoupons.length > 0
            ? sortedCoupons.reduce((total, item) => total + Number(item.rate || 0), 0) /
              sortedCoupons.length
            : 0;

    const handleMetricClick = ({ expression, interval, tickers }) => {
        onChangeSelectedTicker({
            expression,
            interval,
            tickers,
        });

        onFetchBymaStocksData();
        navigate("/charts");
    };

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 0,
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                boxSizing: "border-box",
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.background.default : "#f7f8fa",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1440,
                    mx: "auto",
                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 3,
                        lg: 4,
                    },
                    py: {
                        xs: 2,
                        md: 3,
                    },
                    boxSizing: "border-box",
                }}
            >
                <InstrumentHeader instrument={instrument} />

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={7}>
                        <InstrumentOverview instrument={instrument} />

                        <CurrentMetricsSection
                            latestData={instrument?.latestData}
                            ticker={instrument?.ticker}
                            onMetricClick={handleMetricClick}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <PrincipalSection
                            paidAmortization={paidAmortization}
                            remainingAmortization={remainingAmortization}
                            progress={progress}
                        />
                    </Grid>
                </Grid>

                <CashFlowPaybackSection
                    currentPrice={instrument?.latestData?.price?.close}
                    coupons={sortedCoupons}
                    amortizations={sortedAmortizations}
                />

                <AmortizationSection
                    amortizations={amortizations}
                    sortedAmortizations={sortedAmortizations}
                    nextAmortization={nextAmortization}
                    isPastDate={isPastDate}
                />

                <CouponSection
                    coupons={coupons}
                    sortedCoupons={sortedCoupons}
                    nextCoupon={nextCoupon}
                    couponAverage={couponAverage}
                    isPastDate={isPastDate}
                />

                <BondEvents
                    sortedAmortizations={sortedAmortizations}
                    sortedCoupons={sortedCoupons}
                    isPastDate={isPastDate}
                />

                <DocumentationSection instrument={instrument} />
            </Box>
        </Box>
    );
};

const mapDispatchToProps = (dispatch) => ({
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onFetchBymaStocksData: () => dispatch(fetchBymaStocksDataSagaRequest()),
});

export default connect(null, mapDispatchToProps)(BondDetails);
