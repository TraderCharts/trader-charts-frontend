import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const ClearIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 18 18">
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm0-9.04L6.04 5 5 6.04 7.96 9 5 11.96 6.04 13 9 10.04 11.96 13 13 11.96 10.04 9 13 6.04 11.96 5 9 7.96Z"
        />
    </SvgIcon>
);

ClearIcon.displayName = "ClearIcon";
ClearIcon.muiName = "SvgIcon";
export default ClearIcon;
