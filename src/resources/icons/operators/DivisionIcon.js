import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const DivisionIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 13 13">
        <path fill="none" stroke="currentColor" strokeLinecap="square" d="M2.5 6.5h9" />
        <circle fill="currentColor" cx="7" cy="3" r="1" />
        <circle fill="currentColor" cx="7" cy="10" r="1" />
    </SvgIcon>
);

DivisionIcon.displayName = "DivisionIcon";
DivisionIcon.muiName = "SvgIcon";
export default DivisionIcon;
