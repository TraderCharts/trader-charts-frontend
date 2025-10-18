import React from "react";
import {ListItem, ListItemIcon} from "@mui/material";
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import {useNavigate, useLocation} from "react-router-dom";
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

const Charts = ({selected, onClick}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <StyledListItem
            onClick={() => {
                onClick();
                navigate("/charts", {state: {referer: location}});
            }}
            selected={selected}
        >
            <StyledListItemIcon>
                <InsertChartOutlined/>
            </StyledListItemIcon>
        </StyledListItem>
    );
};

export default Charts;
