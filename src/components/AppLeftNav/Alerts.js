import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {ListItem, ListItemIcon} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {styled} from "@mui/material/styles";
import ListItemButton from '@mui/material/ListItemButton';

const StyledListItem = styled(ListItemButton)({
    justifyContent: "center",
});

const StyledListItemIcon = styled(ListItemIcon)({
    width: 32,
    height: 32,
    transform: "scale(1.2)",
    minWidth: "unset",
});

const Alerts = ({selected, onClick}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <StyledListItem
            onClick={() => {
                onClick();
                navigate("/alerts", {state: {referer: location}});
            }}
            selected={selected}
        >
            <StyledListItemIcon>
                <NotificationsActiveIcon/>
            </StyledListItemIcon>
        </StyledListItem>
    );
};

export default Alerts;
