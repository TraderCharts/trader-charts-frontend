import React from "react";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const DrawingToolButton = ({ tool, active, onSelect, disabled }) => {
    return (
        <Tooltip title={tool.label} arrow placement="right">
            <ListItemButton
                selected={active}
                disabled={disabled}
                onClick={() => onSelect(tool.key)}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <ListItemIcon
                    sx={{
                        width: 32,
                        height: 32,
                        transform: "scale(1.2)",
                        minWidth: "unset",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {tool.icon}
                </ListItemIcon>
            </ListItemButton>
        </Tooltip>
    );
};

export default DrawingToolButton;
