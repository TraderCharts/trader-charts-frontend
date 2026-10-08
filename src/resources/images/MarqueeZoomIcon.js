import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const MarqueeZoomIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M17.646 18.354l4 4 .708-.708-4-4z"></path>
        <path d="M12.5 21a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17zm0-1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"></path>
        <path d="M9 13h7v-1H9z"></path>
        <path d="M13 16V9h-1v7z"></path>{" "}
    </SvgIcon>
);

MarqueeZoomIcon.displayName = "MarqueeZoomIcon";
MarqueeZoomIcon.muiName = "SvgIcon";

export default MarqueeZoomIcon;
