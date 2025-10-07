import React from "react";
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import {CirclePicker} from "react-color";
import {styled} from "@mui/material/styles";

const StyledPopover = styled(Popover)({
    marginTop: "7px",
    marginLeft: "2px",
});

const ColorPickerWrapper = styled("div")({
    padding: "20px",
});

const ColorPicker = ({show, stroke, onClose, onChangeColor, anchorEl}) => (
    <StyledPopover
        open={show}
        onClose={onClose}
        BackdropProps={{invisible: true}}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
        }}
    >
        <ColorPickerWrapper>
            <CirclePicker color={stroke} onChangeComplete={onChangeColor}/>
        </ColorPickerWrapper>
    </StyledPopover>
);

ColorPicker.propTypes = {
    stroke: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    anchorEl: PropTypes.any,
};

export default ColorPicker;
