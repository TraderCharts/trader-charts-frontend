import { Box, Typography } from "@mui/material";

const CouponEvents = ({ sortedCoupons, isPastDate }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
        }}
    >
        {sortedCoupons.map((item, index) => {
            const past = isPastDate(item.date);

            return (
                <Box
                    key={`${item.date}-${index}`}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        py: 1.25,
                        px: 1.25,
                        borderRadius: 1.75,
                        bgcolor: past ? "action.hover" : "transparent",
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 650,
                            }}
                        >
                            {new Date(`${item.date}T00:00:00`).toLocaleDateString("en-GB")}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {past ? "Past event" : "Future event"}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 850,
                        }}
                    >
                        {(Number(item.rate || 0) * 100).toFixed(3).replace(/\.?0+$/, "")}%
                    </Typography>
                </Box>
            );
        })}
    </Box>
);

export default CouponEvents;
