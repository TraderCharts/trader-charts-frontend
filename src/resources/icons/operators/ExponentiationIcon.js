import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const ExponentiationIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 13 13">
        <path fill="none" stroke="currentColor" strokeLinecap="square" d="M3 7l3.5-3.5L10 7" />
    </SvgIcon>
);

ExponentiationIcon.displayName = "ExponentiationIcon";
ExponentiationIcon.muiName = "SvgIcon";
export default ExponentiationIcon;
