import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

import AddWatchlistTickerDialog from "./AddWatchlistTickerDialog";

const WatchlistsHeader = ({
    watchlists = [],
    selectedWatchlistId,
    onChangeWatchlist,
    onAddTicker,
    negotiableInstruments = [],
}) => {
    const [openAddTicker, setOpenAddTicker] = useState(false);

    const selectedWatchlist = watchlists.find((watchlist) => watchlist._id === selectedWatchlistId);

    const handleAddTicker = (ticker) => {
        onAddTicker(ticker);
        setOpenAddTicker(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    flexDirection: { xs: "column", md: "row" },
                    mb: 1.5,
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                        }}
                    >
                        Watchlists
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.35 }}
                    >
                        Market overview
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: { xs: "100%", md: "auto" },
                    }}
                >
                    {watchlists.length > 0 && (
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: { xs: 0, md: 200 },
                                flex: { xs: 1, md: "initial" },
                            }}
                        >
                            <InputLabel>Watchlist</InputLabel>

                            <Select
                                value={selectedWatchlistId || ""}
                                label="Watchlist"
                                onChange={(event) => onChangeWatchlist(event.target.value)}
                                sx={{
                                    fontSize: 13,
                                    height: 36,
                                }}
                            >
                                {watchlists.map((watchlist) => (
                                    <MenuItem
                                        key={watchlist._id}
                                        value={watchlist._id}
                                        sx={{ fontSize: 13 }}
                                    >
                                        {watchlist.name}
                                        {watchlist.favorite ? " ★" : ""}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddTicker(true)}
                        sx={{
                            height: 36,
                            minWidth: "auto",
                            whiteSpace: "nowrap",
                            textTransform: "none",
                        }}
                    >
                        Add ticker
                    </Button>
                </Box>
            </Box>

            <AddWatchlistTickerDialog
                open={openAddTicker}
                onClose={() => setOpenAddTicker(false)}
                onAdd={handleAddTicker}
                negotiableInstruments={negotiableInstruments}
                watchlistTickers={selectedWatchlist?.tickers || []}
            />
        </>
    );
};

export default WatchlistsHeader;
