import { Box, Typography } from "@mui/material";

import WatchlistTable from "./WatchlistTable";

const WatchlistGroup = ({ title, instruments = [], type, onMetricClick, onRemoveTicker }) => {
    if (!instruments.length) {
        return null;
    }

    return (
        <Box
            sx={{
                mb: 2,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 0.5,
                    mb: 0.75,
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 700,
                        fontSize: 12,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        fontSize: 11,
                    }}
                >
                    {instruments.length}
                </Typography>
            </Box>

            <WatchlistTable
                instruments={instruments}
                type={type}
                onMetricClick={onMetricClick}
                onRemoveTicker={onRemoveTicker}
            />
        </Box>
    );
};

export default WatchlistGroup;
