import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";

import { tickerIcons } from "../../constants/tickerIcons.js";
import { changeShowSelectTicker } from "../../redux/actions/containers.action";

const SymbolSearchContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4a4a4a",
    borderRadius: 32,
    height: 48,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "#3a3a3a",
    },
}));

const SymbolInput = styled(InputBase)(({ theme }) => ({
    padding: "0 8px",
    fontSize: "15px",
    fontWeight: 500,
    color: theme.palette.common.white,
    whiteSpace: "nowrap",

    "& .MuiInputBase-input": {
        padding: "12px 0",
        whiteSpace: "nowrap",
        overflow: "visible",
        textOverflow: "clip",
        width: "auto",

        "&::placeholder": {
            color: theme.palette.common.white,
            opacity: 0.6,
        },
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    marginLeft: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 18,
    transition: "all 0.2s ease",

    "&:hover": {
        backgroundColor: theme.palette.grey[200],
    },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: "50%",
    color: theme.palette.common.white,
    opacity: 0.7,
}));

const SearchSymbol = ({ selectedTicker, negotiableInstruments, onChangeShowSelectTicker }) => {
    const expression = selectedTicker?.expression || "Select Symbol";

    return (
        <Tooltip title="Search Symbol" arrow placement="bottom">
            <SymbolSearchContainer onClick={() => onChangeShowSelectTicker(true)}>
                {negotiableInstruments
                    .filter((elem) => selectedTicker?.tickers?.includes(elem.ticker))
                    .map((elem) => {
                        const Icon = tickerIcons[elem.icon];

                        return Icon ? (
                            <IconWrapper key={elem.ticker}>
                                <Box sx={{ display: "flex" }}>{Icon}</Box>
                            </IconWrapper>
                        ) : null;
                    })}

                <SymbolInput
                    value={expression}
                    placeholder="Select Symbol"
                    readOnly
                    inputProps={{
                        readOnly: true,
                        style: {
                            fieldSizing: "content",
                        },
                    }}
                    sx={{
                        flex: expression.length > 30 ? "0 0 auto" : 1,
                    }}
                />

                <SearchIconWrapper>
                    <SearchIcon sx={{ fontSize: 18 }} />
                </SearchIconWrapper>
            </SymbolSearchContainer>
        </Tooltip>
    );
};

const mapStateToProps = (state) => ({
    selectedTicker: state.containers.selectedTicker,
    negotiableInstruments: state.byma.negotiableInstruments,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(SearchSymbol);
