import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
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
});

const Alerts = ({ selected, onClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Tooltip key={"Alerts"} title={"Alerts"} arrow placement="right">
            <StyledListItem
                onClick={() => {
                    onClick();
                    navigate("/alerts", { state: { referer: location } });
                }}
                selected={selected}
            >
                <StyledListItemIcon>
                    <NotificationsActiveIcon />
                </StyledListItemIcon>
            </StyledListItem>
        </Tooltip>
    );
};

export default Alerts;
