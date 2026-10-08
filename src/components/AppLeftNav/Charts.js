import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import { ListItemIcon } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StyledListItem = styled(ListItemButton)({
    justifyContent: "center",
});

const StyledListItemIcon = styled(ListItemIcon)({
    width: 32,
    height: 32,
    transform: "scale(1.2)",
    minWidth: "unset",
    justifyContent: "center",
    alignItems: "center",
    color: "inherit",
});

const Charts = ({ selected, onClick, sx, placement = "right" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Tooltip key={"Charts"} title={"Advanced charts"} arrow placement={placement}>
            <StyledListItem
                onClick={() => {
                    onClick();
                    navigate("/charts", { state: { referer: location } });
                }}
                selected={selected}
                sx={sx}
            >
                <StyledListItemIcon>
                    <InsertChartOutlined />
                </StyledListItemIcon>
            </StyledListItem>
        </Tooltip>
    );
};

export default Charts;
