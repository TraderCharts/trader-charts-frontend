import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
const SelectionIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 27 29">
        <path d="M18 15h8v-1h-8z"></path>
        <path d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path>{" "}
    </SvgIcon>
);

SelectionIcon.displayName = "SelectionIcon";
SelectionIcon.muiName = "SvgIcon";

export default SelectionIcon;
