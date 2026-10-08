import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const AgroIcon = (props) => (
    <SvgIcon {...props} viewBox="0 -0.5 18 18" style={{ width: 40, height: 40 }}>
        <path d="M4 9 A5 5 0 0 1 14 9" fill="url(#aqmemidv4)" />
        <path d="M14 9 A5 5 0 0 1 4 9" fill="#818181" />

        <path d="M9 9a1 1 0 011-1h4v1H9zM4 9h5a1 1 0 01-1 1H4V9z" fill="#F0F3FA" />

        <circle cx="9" cy="9" r="5" fill="none" stroke="white" strokeWidth="0.5" />
        <defs>
            <linearGradient
                id="aqmemidv4"
                x1="0"
                y1="0"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#318C49" />
                <stop offset="1" stopColor="#318C49" />
            </linearGradient>
        </defs>
    </SvgIcon>
);

AgroIcon.displayName = "AgroIcon";
AgroIcon.muiName = "SvgIcon";

export default AgroIcon;
