import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
let FibonacciSeriesIcon = props => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path d="M3 5h22V4H3zM3 17h22v-1H3zM3 11h19.5v-1H3zM5.5 23H25v-1H5.5z"/>
        <path
            d="M3.5 24a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 3.5 24zm0 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm21-13a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 24.5 12zm0 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </SvgIcon>
);

FibonacciSeriesIcon.displayName = "FibonacciSeriesIcon";
FibonacciSeriesIcon.muiName = "SvgIcon";

export default FibonacciSeriesIcon;
