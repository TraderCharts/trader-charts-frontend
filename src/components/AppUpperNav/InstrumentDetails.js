import {
    Menu,
    MenuItem,
    Tooltip,
    IconButton,
    ListItemText,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const InstrumentDetails = ({
    selectedTicker,
    negotiableInstruments = [],
    bondTerms = [],
    selected = false,
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const bondInstruments = useMemo(() => {
        const tickers = selectedTicker?.tickers || [];

        return tickers
            .map((ticker) =>
                negotiableInstruments.find((instrument) => instrument.ticker === ticker)
            )
            .filter(
                (instrument) =>
                    instrument?.bondTermsId &&
                    bondTerms.some((term) => term._id === instrument.bondTermsId)
            );
    }, [selectedTicker, negotiableInstruments, bondTerms]);

    if (bondInstruments.length === 0) {
        return null;
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Instrument details" arrow placement="bottom">
                <IconButton
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        ...(selected && {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        }),
                        "&:hover": {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <DescriptionOutlined />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 260,
                        borderRadius: 2,
                        overflow: "hidden",
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        INSTRUMENT DETAILS
                    </Typography>
                </Box>

                <Divider />

                {bondInstruments.map((instrument) => (
                    <MenuItem
                        key={instrument.ticker}
                        onClick={() => {
                            handleClose();
                            navigate(`/instrumentDetails/${instrument.ticker}`);
                        }}
                        sx={{
                            py: 1.25,
                            px: 2,
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {instrument.ticker}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" color="text.secondary">
                                    {instrument.name}
                                </Typography>
                            }
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default InstrumentDetails;
