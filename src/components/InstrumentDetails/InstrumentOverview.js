import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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

const InfoItem = ({ label, value }) => (
    <Box sx={{ minWidth: 0 }}>
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{
                display: "block",
                mb: 0.5,
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 700,
            }}
        >
            {label}
        </Typography>

        <Typography
            variant="body2"
            sx={{
                fontWeight: 650,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            {value || "-"}
        </Typography>
    </Box>
);

const InstrumentOverview = ({ instrument }) => {
    return (
        <Card
            elevation={0}
            sx={{
                mb: 2,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
            }}
        >
            <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.75 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 750,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Instrument
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.25 }}
                >
                    Main bond characteristics
                </Typography>
            </Box>

            <Box
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        "&:last-child": {
                            pb: { xs: 2, md: 2.5 },
                        },
                    }}
                >
                    <Grid container spacing={2.5}>
                        <Grid item xs={6} sm={4}>
                            <InfoItem label="Symbol" value={instrument?.symbol} />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem label="ISIN" value={instrument?.isin} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <InfoItem label="Issuer" value={instrument?.issuer} />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem
                                label="Emission"
                                value={formatDate(instrument?.emissionDate)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem
                                label="Par Value"
                                value={`${instrument?.parValue ?? "-"} ${
                                    instrument?.currencyEmission || ""
                                }`}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem label="Bond Type" value={instrument?.bondType} />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem
                                label="Emission Currency"
                                value={instrument?.currencyEmission}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem
                                label="Payment Currency"
                                value={instrument?.currencyPayment}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <InfoItem label="Governing Law" value={instrument?.governingLaw} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Box>
        </Card>
    );
};

export default InstrumentOverview;
