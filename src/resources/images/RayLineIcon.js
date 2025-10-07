import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
let RayLineIcon = props => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path d="M8.354 20.354l5-5-.707-.707-5 5z"></path>
        <
            path d="M16.354 12.354l8-8-.707-.707-8 8z"></path>
        <path
            d="M14.5 15c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM6.5 23c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path>
    </SvgIcon>
);

RayLineIcon.displayName = "RayLineIcon";
RayLineIcon.muiName = "SvgIcon";

export default RayLineIcon;


