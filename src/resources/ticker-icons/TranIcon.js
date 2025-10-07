import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
let TranIcon = props => (
    <SvgIcon {...props} viewBox="0 0 22 22">
        <path fill="#007AC3" d="M0 0h18v18H0z"/>
        <path fillRule="evenodd"
              d="M9 3L3 9l6 6 6-6-6-6zm.37 4l-1.83 5-1.83-5h3.66zm1.03 4.27L11.54 8H9.27l1.14 3.27zm2.82-3.02l-.76 2.2-.75-2.2h1.5z"
              fill="#fff"/>
    </SvgIcon>
);

TranIcon.displayName = "TranIcon";
TranIcon.muiName = "SvgIcon";

export default TranIcon;
