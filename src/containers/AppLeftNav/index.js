import { List, ListItemIcon, Divider, Drawer, Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import Alerts from "../../components/AppLeftNav/Alerts";
import Charts from "../../components/AppLeftNav/Charts";
import KairosAI from "../../components/AppLeftNav/KairosAI";
import TrendingNews from "../../components/AppLeftNav/TrendingNews";
import { changeShowAddIndicator } from "../../redux/actions/containers.action";
import EquidistantChannelIcon from "../../resources/images/EquidistantChannelIcon";
import ExtendLineIcon from "../../resources/images/ExtendLineIcon";
import FibonacciSeriesIcon from "../../resources/images/FibonacciSeriesIcon";
import GannFanIcon from "../../resources/images/GannFanIcon";
import IndicatorsIcon from "../../resources/images/IndicatorsIcon";
import RayLineIcon from "../../resources/images/RayLineIcon";
import TrendLineIcon from "../../resources/images/TrendLineIcon";

const AppLeftNav = ({
    setEnableInteractiveObject,
    enableInteractiveObject,
    showAddIndicator,
    onChangeShowAddIndicator,
    appLeftNavWidth,
}) => {
    const location = useLocation();
    const [enableChart, setEnableChart] = useState(
        ["charts", ""].includes(location.pathname.split("/")[1])
    );
    const [enableAlarms, setEnableAlarms] = useState(location.pathname.split("/")[1] === "alerts");
    const [selectedOption, setSelectedOption] = useState(
        location.pathname.split("/")[1] === "trendingNews"
    );

    const onSelectInteractiveObjectButton = (interactiveObject) => {
        setEnableAlarms(false);
        setEnableInteractiveObject(interactiveObject);
    };

    const renderLeftButtons = () => (
        <Box>
            {[
                { key: "TrendLine", icon: <TrendLineIcon />, label: "Trend Line" },
                { key: "ExtendLine", icon: <ExtendLineIcon />, label: "Extend Line" },
                { key: "Ray", icon: <RayLineIcon />, label: "Ray Line" },
                {
                    key: "FibonacciRetracement",
                    icon: <FibonacciSeriesIcon />,
                    label: "Fibonacci Retracement",
                },
                {
                    key: "EquidistantChannel",
                    icon: <EquidistantChannelIcon />,
                    label: "Equidistant Channel",
                },
                { key: "GannFan", icon: <GannFanIcon />, label: "Gann Fan" },
            ].map((item) => (
                <Tooltip key={item.key} title={item.label} arrow placement="right">
                    <ListItemButton
                        key={item.key}
                        selected={enableInteractiveObject === item.key}
                        disabled={enableAlarms}
                        onClick={() => onSelectInteractiveObjectButton(item.key)}
                        sx={{ justifyContent: "center" }}
                    >
                        <ListItemIcon
                            sx={{
                                width: 32,
                                height: 32,
                                transform: "scale(1.2)",
                                minWidth: "unset",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>
            ))}
            <Tooltip key={"AddIndicator"} title={"Add indicator"} arrow placement="right">
                <ListItemButton
                    onClick={() => {
                        onSelectInteractiveObjectButton(undefined);
                        onChangeShowAddIndicator(true);
                    }}
                    selected={showAddIndicator}
                    disabled={enableAlarms}
                    sx={{ justifyContent: "center" }}
                >
                    <ListItemIcon
                        sx={{
                            width: 32,
                            height: 32,
                            transform: "scale(1.2)",
                            minWidth: "unset",
                        }}
                    >
                        <IndicatorsIcon />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
        </Box>
    );
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: appLeftNavWidth,
                "& .MuiDrawer-paper": {
                    width: appLeftNavWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Divider />
            <List>{renderLeftButtons()}</List>
            <Divider />
            <List>
                <Charts
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableAlarms(false);
                        setEnableChart(true);
                    }}
                    selected={enableChart}
                />

                <Alerts
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableChart(false);
                        setEnableAlarms(true);
                    }}
                    selected={enableAlarms}
                />

                <TrendingNews
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableChart(false);
                        setEnableAlarms(false);
                        setSelectedOption("trendingNews");
                    }}
                    selected={selectedOption === "trendingNews"}
                />
                <KairosAI
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableChart(false);
                        setEnableAlarms(false);
                        setSelectedOption("KairosAI");
                    }}
                    selected={selectedOption === "KairosAI"}
                />
            </List>
        </Drawer>
    );
};

AppLeftNav.propTypes = {
    setEnableInteractiveObject: PropTypes.func.isRequired,
    enableInteractiveObject: PropTypes.string,
    showAddIndicator: PropTypes.bool.isRequired,
    onChangeShowAddIndicator: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    showAddIndicator: state.containers.showAddIndicator,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowAddIndicator: (value) => dispatch(changeShowAddIndicator(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(AppLeftNav);
