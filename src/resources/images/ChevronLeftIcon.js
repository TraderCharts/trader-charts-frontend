import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const ChevronLeftIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6" />
    </SvgIcon>
);

ChevronLeftIcon.displayName = "ChevronLeftIcon";
ChevronLeftIcon.muiName = "SvgIcon";

export default ChevronLeftIcon;
