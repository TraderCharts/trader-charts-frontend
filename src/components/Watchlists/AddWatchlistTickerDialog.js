import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import { tickerIcons } from "../../constants/tickerIcons";

const TYPE_FILTERS = [
    { value: "all", label: "All" },
    { value: "STOCKS", label: "Stocks" },
    { value: "BONDS", label: "Bonds" },
    { value: "MUTUAL FUNDS", label: "Mutual Funds" },
    { value: "CURRENCIES", label: "Currencies" },
];

const getInstrumentType = (instrument) => {
    return instrument?.type?.name?.toUpperCase() || null;
};

const getTicker = (value) => {
    if (typeof value === "string") {
        return value.trim().toUpperCase();
    }

    if (value?.ticker) {
        return value.ticker.trim().toUpperCase();
    }

    return null;
};

const AddWatchlistTickerDialog = ({
    open,
    onClose,
    onAdd,
    negotiableInstruments = [],
    watchlistTickers = [],
}) => {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const inputRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        setSearch("");
        setSelectedType("all");

        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timeout);
    }, [open]);

    const existingTickers = useMemo(() => {
        return new Set((watchlistTickers || []).map(getTicker).filter(Boolean));
    }, [watchlistTickers]);

    const filteredInstruments = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return (
            (negotiableInstruments || [])
                .filter((instrument) => {
                    const ticker = getTicker(instrument);

                    return Boolean(ticker);
                })
                // IMPORTANT:
                // Nunca mostrar instrumentos que ya están
                // en la watchlist seleccionada.
                .filter((instrument) => {
                    const ticker = getTicker(instrument);

                    return !existingTickers.has(ticker);
                })
                // Filtrar por tipo real proveniente de instrument.type.name
                .filter((instrument) => {
                    if (selectedType === "all") {
                        return true;
                    }

                    return getInstrumentType(instrument) === selectedType;
                })
                // Filtrar por ticker o nombre
                .filter((instrument) => {
                    if (!normalizedSearch) {
                        return true;
                    }

                    const ticker = instrument?.ticker?.toLowerCase() || "";
                    const name = instrument?.name?.toLowerCase() || "";

                    return ticker.includes(normalizedSearch) || name.includes(normalizedSearch);
                })
                .slice(0, 30)
        );
    }, [negotiableInstruments, existingTickers, search, selectedType]);

    const handleAdd = (ticker) => {
        const normalizedTicker = getTicker(ticker);

        if (!normalizedTicker) {
            return;
        }

        // Segunda protección:
        // aunque por algún motivo el render todavía no se haya actualizado,
        // nunca mandar un ticker que ya existe.
        if (existingTickers.has(normalizedTicker)) {
            return;
        }

        onAdd(normalizedTicker);
    };

    const handleClose = () => {
        setSearch("");
        setSelectedType("all");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    pb: 1,
                    pt: 2,
                }}
            >
                Add ticker
            </DialogTitle>

            <Box sx={{ px: 2, pb: 1.5 }}>
                <TextField
                    inputRef={inputRef}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search ticker or instrument..."
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        mt: 1,
                        flexWrap: "wrap",
                    }}
                >
                    {TYPE_FILTERS.map((type) => (
                        <Chip
                            key={type.value}
                            label={type.label}
                            size="small"
                            clickable
                            onClick={() => setSelectedType(type.value)}
                            variant={selectedType === type.value ? "filled" : "outlined"}
                            color={selectedType === type.value ? "primary" : "default"}
                        />
                    ))}
                </Box>
            </Box>

            <Divider />

            <List
                sx={{
                    maxHeight: 360,
                    overflow: "auto",
                    py: 0,
                }}
            >
                {filteredInstruments.length > 0 ? (
                    filteredInstruments.map((instrument) => {
                        const ticker = getTicker(instrument);
                        const type = getInstrumentType(instrument);

                        return (
                            <ListItemButton
                                key={ticker}
                                onClick={() => handleAdd(ticker)}
                                sx={{
                                    py: 1,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        mr: 1,
                                        minWidth: 32,
                                    }}
                                >
                                    {tickerIcons[instrument?.icon]}
                                </ListItemIcon>

                                <ListItemText
                                    primary={instrument.name || ticker}
                                    secondary={ticker}
                                    secondaryTypographyProps={{
                                        variant: "caption",
                                    }}
                                />

                                {type && (
                                    <Chip
                                        label={type}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 1,
                                            height: 22,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        );
                    })
                ) : (
                    <Box
                        sx={{
                            py: 5,
                            px: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            No tickers found
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: "block",
                                mt: 0.5,
                            }}
                        >
                            Try another search or filter.
                        </Typography>
                    </Box>
                )}
            </List>

            <Divider />

            <DialogActions
                sx={{
                    px: 2,
                    py: 1,
                }}
            >
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddWatchlistTickerDialog;
