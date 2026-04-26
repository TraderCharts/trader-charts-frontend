import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
const TextIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path
            fill="currentColor"
            d="M8 6.5c0-.28.22-.5.5-.5H14v16h-2v1h5v-1h-2V6h5.5c.28 0 .5.22.5.5V9h1V6.5c0-.83-.67-1.5-1.5-1.5h-12C7.67 5 7 5.67 7 6.5V9h1V6.5Z"
        ></path>
    </SvgIcon>
);

TextIcon.displayName = "TextIcon";
TextIcon.muiName = "SvgIcon";

export default TextIcon;
