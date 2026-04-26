import { ListItemIcon } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ChatCircle from "../../resources/chat-icons/ChatCircle";

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

const KairosAI = ({ selected, onClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Tooltip key={"KairosAI"} title={"Kairos AI"} arrow placement="right">
            <StyledListItem
                onClick={() => {
                    onClick();
                    navigate("/KairosAI", { state: { referer: location } });
                }}
                selected={selected}
            >
                <StyledListItemIcon>
                    <ChatCircle />
                </StyledListItemIcon>
            </StyledListItem>
        </Tooltip>
    );
};

export default KairosAI;
