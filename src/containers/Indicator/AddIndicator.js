import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    Dialog,
    DialogTitle,
    Divider,
    InputAdornment,
    List,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {fuzzySearch} from "../../helpers/search";
import {
    addIndicatorMetadata,
    changeIndicatorListSearch
} from "../../redux/actionDefinitions/indicators.actionDefinitions";
import {changeShowAddIndicator} from "../../redux/actions/containers.action";

const indicatorList = [
    {code: "SMA", name: "Moving Average", windowSize: 5, stroke: "green", strokeWidth: 4, type: "SMA"},
    {code: "EMA", name: "Exponential Moving Average", windowSize: 50, stroke: "blue", strokeWidth: 4, type: "EMA"}
];

const mapStateToProps = state => ({
    indicatorListSearch: state.indicators.indicatorListSearch,
    showAddIndicator: state.containers.showAddIndicator
});

const mapActionsToProps = dispatch => ({
    onChangeIndicatorListSearch: value => dispatch(changeIndicatorListSearch(value)),
    onChangeShowAddIndicator: value => dispatch(changeShowAddIndicator(value)),
    onAddIndicatorMetadata: indicator => dispatch(addIndicatorMetadata(indicator))
});

const AddIndicator = ({
                          showAddIndicator = false,
                          indicatorListSearch = "",
                          onChangeIndicatorListSearch,
                          onChangeShowAddIndicator,
                          onAddIndicatorMetadata
                      }) => {
    const onClose = () => onChangeShowAddIndicator(false);
    const onListItemClick = indicator => () => onAddIndicatorMetadata(indicator);
    const onChange = event => onChangeIndicatorListSearch(event.target.value);

    const renderIndicator = indicator =>
        indicator.split("").map((character, characterIndex) => {
            const matches = fuzzySearch(indicatorListSearch, indicator);
            return matches.includes(characterIndex) ? (
                <span key={characterIndex} style={{color: "#3898c2"}}>
          {character}
        </span>
            ) : (
                <span key={characterIndex} key={characterIndex}>{character}</span>
            );
        });

    return (
        <Dialog open={showAddIndicator} onClose={onClose} aria-labelledby="simple-dialog-title">
            <DialogTitle>Indicators</DialogTitle>
            <Divider/>
            <TextField
                onChange={onChange}
                variant="standard"
                sx={{
                    mx: 3,
                    my: 1,
                    "& .MuiInputBase-root": {
                        flexWrap: "wrap",
                        color: "#3898c2"
                    }
                }}
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />
            <Divider/>
            <List>
                {indicatorList
                    .filter(
                        indicator =>
                            indicatorListSearch === "" || fuzzySearch(indicatorListSearch, indicator.name).length > 0
                    )
                    .map(indicator => (
                        <ListItemButton onClick={onListItemClick(indicator)} key={indicator.code}>
                            <ListItemText primary={renderIndicator(indicator.name)}/>
                        </ListItemButton>
                    ))}
            </List>
        </Dialog>
    );
};

AddIndicator.propTypes = {
    showAddIndicator: PropTypes.bool,
    indicatorListSearch: PropTypes.string,
    onChangeIndicatorListSearch: PropTypes.func.isRequired,
    onChangeShowAddIndicator: PropTypes.func.isRequired,
    onAddIndicatorMetadata: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(AddIndicator);
