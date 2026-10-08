import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const MultiplicationIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 13 13">
        <path fill="none" stroke="currentColor" strokeLinecap="square" d="M3 10l7-7M3 3l7 7" />
    </SvgIcon>
);

MultiplicationIcon.displayName = "MultiplicationIcon";
MultiplicationIcon.muiName = "SvgIcon";
export default MultiplicationIcon;
