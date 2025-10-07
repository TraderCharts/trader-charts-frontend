import React from "react";
import {connect} from "react-redux";
import TextField from "@mui/material/TextField";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import {changeSelectedIndicatorMetadata} from "../../../redux/actionDefinitions/indicators.actionDefinitions";

const mapStateToProps = state => ({
    selectedIndicatorMetadata: state.indicators.selectedIndicatorMetadata
});

const mapActionsToProps = dispatch => ({
    changeSelectedIndicatorMetadata: indicatorMetadata =>
        dispatch(changeSelectedIndicatorMetadata(indicatorMetadata))
});

const InputsTab = ({
                       selectedIndicatorMetadata,
                       changeSelectedIndicatorMetadata
                   }) => (
    <form noValidate autoComplete="off">
        <TextField
            id="length"
            label="Length"
            value={selectedIndicatorMetadata.windowSize}
            onChange={event => {
                changeSelectedIndicatorMetadata({
                    code: `${selectedIndicatorMetadata.type}${Number(
                        event.target.value
                    )}`,
                    windowSize: Number(event.target.value)
                });
            }}
            margin="normal"
        />
    </form>
);

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);

export default enhance(InputsTab);
