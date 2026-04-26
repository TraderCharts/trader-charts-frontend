import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const ChevronRightIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6" />
    </SvgIcon>
);

ChevronRightIcon.displayName = "ChevronRightIcon";
ChevronRightIcon.muiName = "SvgIcon";

export default ChevronRightIcon;
