import { Box, Card, Grid, Typography } from "@mui/material";

import AmortizationEvents from "./AmortizationEvents";
import CouponEvents from "./CouponEvents";

const BondEvents = ({ sortedAmortizations, sortedCoupons, isPastDate }) => {
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
            <Box
                sx={{
                    px: { xs: 2, md: 2.5 },
                    py: 1.75,
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 750,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Payment Events
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mt: 0.25,
                    }}
                >
                    Historical and upcoming coupon and amortization events
                </Typography>
            </Box>

            <Box
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    p: { xs: 1, md: 1.5 },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <AmortizationEvents
                            sortedAmortizations={sortedAmortizations}
                            isPastDate={isPastDate}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <CouponEvents sortedCoupons={sortedCoupons} isPastDate={isPastDate} />
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default BondEvents;
