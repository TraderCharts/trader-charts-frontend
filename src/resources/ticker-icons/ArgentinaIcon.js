import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

// I recommend minifying it a bit using this https://jakearchibald.github.io/svgomg/
let ArgentinaIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path
      d="m0 0h18v5H0zm0 13h18v5H0z"
      fill="#1e88e5"
      shape-rendering="crispEdges"
    />
    <path d="m0 5h18v8H0z" fill="#f8f9fd" shape-rendering="crispEdges" />
    <path
      d="m12 8.94l-1.5.81.75 1.5-1.5-.75-.7 1.5-.8-1.5-1.5.75.75-1.65L6 8.94l1.5-.54-.75-1.65 1.5.75.8-1.5.7 1.5 1.5-.75-.75 1.65 1.5.54z"
      fill="#fbc02d"
    />
  </svg>
);

ArgentinaIcon.displayName = "ArgentinaIcon";
ArgentinaIcon.muiName = "SvgIcon";

export default ArgentinaIcon;
