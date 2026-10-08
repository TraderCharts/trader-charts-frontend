import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

const AdditionIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 13 13">
        <path fill="none" stroke="currentColor" strokeLinecap="square" d="M2.5 6.5h8m-4-4v8" />
    </SvgIcon>
);

AdditionIcon.displayName = "AdditionIcon";
AdditionIcon.muiName = "SvgIcon";
export default AdditionIcon;
