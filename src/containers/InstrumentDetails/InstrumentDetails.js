import { Box, Typography } from "@mui/material";

import BondDetails from "./BondDetails";

const InstrumentDetails = ({ instrument }) => {
    if (!instrument) {
        return null;
    }

    if (instrument.bondTermsId) {
        return <BondDetails instrument={instrument} />;
    }

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    maxWidth: 1400,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4, lg: 6 },
                    py: { xs: 2, md: 3 },
                    boxSizing: "border-box",
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    Instrument Details
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {instrument.ticker} — {instrument.name}
                </Typography>
            </Box>
        </Box>
    );
};

export default InstrumentDetails;
