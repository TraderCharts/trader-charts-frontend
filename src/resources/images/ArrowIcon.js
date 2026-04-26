import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
const ArrowIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path fillRule="nonzero" d="M7.354 21.354l14-14-.707-.707-14 14z"></path>
        <path d="M21 7l-8 3 5 5z"></path>
        <path
            fillRule="nonzero"
            d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"
        ></path>{" "}
    </SvgIcon>
);

ArrowIcon.displayName = "ArrowIcon";
ArrowIcon.muiName = "SvgIcon";

export default ArrowIcon;
