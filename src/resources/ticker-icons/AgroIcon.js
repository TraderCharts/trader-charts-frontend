import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
let AgroIcon = props => (
    <SvgIcon {...props} viewBox="4 2 14 14">
        <path d="M14 9A5 5 0 014 9h10z" fill="url(#aqmemidv4)"/>
        <path opacity=".5" d="M14 9H4a5 5 0 1110 0z" fill="#818181"/>
        <path d="M9 9a1 1 0 011-1h4v1H9zM4 9h5a1 1 0 01-1 1H4V9z" fill="#F0F3FA"/>
        <defs>
            <linearGradient id="aqmemidv4" x1="11.97" y1="12.6" x2="5.06" y2="6.33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#318C49"/>
                <stop offset="1" stopColor="#318C49" stopOpacity="0"/>
            </linearGradient>
        </defs>
    </SvgIcon>
);

AgroIcon.displayName = "AgroIcon";
AgroIcon.muiName = "SvgIcon";

export default AgroIcon;
