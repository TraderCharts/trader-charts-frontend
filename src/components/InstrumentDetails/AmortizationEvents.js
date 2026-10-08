import { Box, Chip, Typography } from "@mui/material";

const AmortizationEvents = ({ sortedAmortizations, isPastDate }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
        }}
    >
        {sortedAmortizations.map((item, index) => {
            const past = isPastDate(item.date);

            return (
                <Box
                    key={`${item.date}-${index}`}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0,1fr) auto auto",
                        alignItems: "center",
                        gap: 2,
                        py: 1.15,
                        px: 1.25,
                        borderRadius: 1.75,
                        bgcolor: past ? "action.hover" : "transparent",
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 650,
                        }}
                    >
                        {new Date(`${item.date}T00:00:00`).toLocaleDateString("en-GB")}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        {Number(item.percent || 0)
                            .toFixed(3)
                            .replace(/\.?0+$/, "")}
                        %
                    </Typography>

                    <Chip
                        label={past ? "Paid" : "Pending"}
                        size="small"
                        variant={past ? "outlined" : "filled"}
                        color={past ? "default" : "primary"}
                        sx={{
                            minWidth: 78,
                            borderRadius: 1.25,
                            fontWeight: 650,
                        }}
                    />
                </Box>
            );
        })}
    </Box>
);

export default AmortizationEvents;
