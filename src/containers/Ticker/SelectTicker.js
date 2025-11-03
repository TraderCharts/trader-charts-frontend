import SearchIcon from "@mui/icons-material/Search";
import {
    Dialog,
    DialogTitle,
    Divider,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

import { tickerIcons } from "../../constants/tickerIcons";
import { fuzzySearch } from "../../helpers/search";
import { fetchBymaStocksData } from "../../redux/actions/byma.action";
import {
    changeSelectedTickerCode,
    changeShowSelectTicker,
} from "../../redux/actions/containers.action";

const mapStateToProps = (state) => ({
    showSelectTicker: state.containers.showSelectTicker,
    negotiableInstruments: state.byma.negotiableInstruments,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
    onChangeSelectedTickerCode: (value) => dispatch(changeSelectedTickerCode(value)),
    onFetchBymaStocksData: () => dispatch(fetchBymaStocksData()),
});

const SelectTicker = ({
    showSelectTicker = false,
    onChangeShowSelectTicker,
    onChangeSelectedTickerCode,
    onFetchBymaStocksData,
    negotiableInstruments,
}) => {
    const [tickerListSearch, setTickerListSearch] = useState("");

    const onClose = () => onChangeShowSelectTicker(false);
    const onListItemClick = (negotiableInstrument) => () => {
        onChangeSelectedTickerCode(negotiableInstrument.ticker);
        onFetchBymaStocksData();
    };
    const onChange = (event) => setTickerListSearch(event.target.value);

    const renderTicker = (ticker) =>
        ticker.split("").map((character, characterIndex) => {
            const matches = fuzzySearch(tickerListSearch, ticker);
            return matches.includes(characterIndex) ? (
                <span key={characterIndex} style={{ color: "#3898c2" }}>
                    {character}
                </span>
            ) : (
                <span key={characterIndex}>{character}</span>
            );
        });

    return (
        <Dialog open={showSelectTicker} onClose={onClose} aria-labelledby="simple-dialog-title">
            <DialogTitle>Tickers</DialogTitle>
            <Divider />
            <TextField
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: { color: "#3898c2" }, // mantiene el color del input
                }}
                sx={{ mx: 3, mb: 1 }} // margenes idénticos a los anteriores
            />
            <Divider />
            <List>
                {negotiableInstruments
                    .filter(
                        (negotiableInstrument) =>
                            tickerListSearch === "" ||
                            fuzzySearch(tickerListSearch, negotiableInstrument.ticker).length > 0
                    )
                    .map((negotiableInstrument, negotiableInstrumentIndex) => (
                        <ListItemButton
                            onClick={onListItemClick(negotiableInstrument)}
                            key={negotiableInstrumentIndex}
                        >
                            <ListItemIcon
                                sx={{ mr: 1, transform: "scale(1.2)", minWidth: "unset" }}
                            >
                                {tickerIcons[negotiableInstrument?.icon]}
                            </ListItemIcon>
                            <ListItemText primary={renderTicker(negotiableInstrument.name)} />
                        </ListItemButton>
                    ))}
            </List>
        </Dialog>
    );
};

SelectTicker.propTypes = {
    showSelectTicker: PropTypes.bool,
    onChangeShowSelectTicker: PropTypes.func.isRequired,
    onChangeSelectedTickerCode: PropTypes.func.isRequired,
    onFetchBymaStocksData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(SelectTicker);
