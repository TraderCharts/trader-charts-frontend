import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
const ExtendLineIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path d="M4.354 25.354l5-5-.707-.707-5 5z"></path>
        <path d="M12.354 17.354l5-5-.707-.707-5 5z"></path>
        <path d="M20.354 9.354l5-5-.707-.707-5 5z"></path>
        <path d="M18.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM10.5 20c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path>
    </SvgIcon>
);

ExtendLineIcon.displayName = "ExtendLineIcon";
ExtendLineIcon.muiName = "SvgIcon";

export default ExtendLineIcon;
