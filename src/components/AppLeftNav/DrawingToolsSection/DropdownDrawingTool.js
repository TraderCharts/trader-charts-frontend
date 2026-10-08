import React, { useState } from "react";
import { Box, Menu, MenuItem, ListItemIcon } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";
import ChevronRightIcon from "./../../../resources/images/ChevronRightIcon";
import ChevronLeftIcon from "./../../../resources/images/ChevronLeftIcon";

const DropdownDrawingTool = ({ title, tools, activeTool, onSelect, disabled }) => {
    const [anchor, setAnchor] = useState(null);
    const [hover, setHover] = useState(false);

    const isActive = tools.some((t) => t.key === activeTool);
    const currentIcon = tools.find((t) => t.key === activeTool)?.icon || tools[0]?.icon;

    const handleOpen = (e) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);
    const handleSelect = (tool) => {
        onSelect(tool);
        handleClose();
    };

    if (!currentIcon) return null;

    return (
        <>
            <Tooltip title={title} arrow placement="right">
                <ListItemButton
                    disabled={disabled}
                    selected={isActive}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        px: 1.5,
                        p: 0,
                    }}
                >
                    <Box
                        onClick={() => onSelect(isActive ? activeTool : tools[0].key)}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            py: 1,
                        }}
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
                            {currentIcon}
                        </ListItemIcon>
                    </Box>

                    <Box
                        onClick={handleOpen}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        sx={{
                            position: "absolute",
                            right: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            py: 1,
                            px: 0.5,
                            borderRadius: 1,
                            "&:hover": { bgcolor: "action.hover" },
                            width: 16,
                        }}
                    >
                        {(hover || anchor) && (anchor ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
                    </Box>
                </ListItemButton>
            </Tooltip>

            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{ paper: { sx: { mt: -1, ml: 1, minWidth: 180 } } }}
            >
                {tools.map((tool) => (
                    <MenuItem
                        key={tool.key}
                        selected={activeTool === tool.key}
                        onClick={() => handleSelect(tool.key)}
                        sx={{ gap: 1.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: "unset", mr: 1.5 }}>{tool.icon}</ListItemIcon>
                        {tool.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default DropdownDrawingTool;
