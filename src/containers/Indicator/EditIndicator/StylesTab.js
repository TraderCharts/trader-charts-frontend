import React, {useState} from "react";
import {connect} from "react-redux";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";
import IconButton from "@mui/material/IconButton";
import {changeShowColorPicker} from "../../../redux/actions/containers.action";
import ColorPicker from "../../../components/ColorPicker/index";
import {changeSelectedIndicatorMetadata} from "../../../redux/actionDefinitions/indicators.actionDefinitions";

const mapStateToProps = state => ({
    selectedIndicatorMetadata: state.indicators.selectedIndicatorMetadata,
    showColorPicker: state.containers.showColorPicker
});

const mapActionsToProps = dispatch => ({
    onChangeShowColorPicker: value => dispatch(changeShowColorPicker(value)),
    onChangeSelectedIndicatorMetadata: indicatorMetadata =>
        dispatch(changeSelectedIndicatorMetadata(indicatorMetadata))
});

const StylesTab = ({
                       selectedIndicatorMetadata,
                       onChangeSelectedIndicatorMetadata,
                       showColorPicker = false,
                       onChangeShowColorPicker
                   }) => {
    const [colorPickerAnchor, setColorPickerAnchor] = useState(null);

    const openColorPicker = event => {
        onChangeShowColorPicker(true);
        setColorPickerAnchor(event.target);
    };

    const onCloseColorPicker = () => {
        onChangeShowColorPicker(false);
    };

    const onChangeColor = color => {
        onChangeSelectedIndicatorMetadata({stroke: color.hex});
        onChangeShowColorPicker(false);
    };

    return (
        <form noValidate autoComplete="off">
            <div>
                <p>Thickness</p>
                <Slider
                    min={1}
                    max={3}
                    defaultValue={selectedIndicatorMetadata.strokeWidth}
                    onChange={value => {
                        onChangeSelectedIndicatorMetadata({strokeWidth: Number(value)});
                    }}
                />
            </div>
            <IconButton onClick={openColorPicker}>
                <div
                    style={{
                        width: "16px",
                        height: "16px"
                    }}
                >
          <span>
            <div
                style={{
                    backgroundColor: selectedIndicatorMetadata.stroke,
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    position: "relative",
                    outline: "none",
                    borderRadius: "3px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset"
                }}
            />
          </span>
                </div>
            </IconButton>
            <ColorPicker
                anchorEl={colorPickerAnchor}
                stroke={selectedIndicatorMetadata.stroke}
                show={showColorPicker}
                onClose={onCloseColorPicker}
                onChangeColor={onChangeColor}
            />
        </form>
    );
};

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);
export default enhance(StylesTab);
