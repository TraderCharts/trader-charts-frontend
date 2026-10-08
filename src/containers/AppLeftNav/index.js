import { List, Divider, Drawer } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeShowAddIndicator } from "../../redux/actions/containers.action";
import DrawingToolsSection from "../../components/AppLeftNav/DrawingToolsSection";
import NavigationSection from "../../components/AppLeftNav/NavigationSection";

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

    const selectTool = (tool) => {
        setEnableInteractiveObject(tool);
        setEnableAlarms(false);
    };

    const clearInteractive = () => setEnableInteractiveObject(undefined);

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
            <List>
                <DrawingToolsSection
                    activeTool={enableInteractiveObject}
                    onSelectTool={selectTool}
                    onAddIndicator={() => {
                        selectTool(undefined);
                        onChangeShowAddIndicator(true);
                    }}
                    disabled={enableAlarms}
                    showAddIndicator={showAddIndicator}
                />
            </List>
            <Divider />
            <List>
                <NavigationSection
                    enableChart={enableChart}
                    enableAlarms={enableAlarms}
                    selectedOption={selectedOption}
                    onSelectChart={() => {
                        clearInteractive();
                        setEnableAlarms(false);
                        setEnableChart(true);
                    }}
                    onSelectAlerts={() => {
                        clearInteractive();
                        setEnableChart(false);
                        setEnableAlarms(true);
                    }}
                    onSelectTrendingNews={() => {
                        clearInteractive();
                        setEnableChart(false);
                        setEnableAlarms(false);
                        setSelectedOption("trendingNews");
                    }}
                    onSelectKairosAI={() => {
                        clearInteractive();
                        setEnableChart(false);
                        setEnableAlarms(false);
                        setSelectedOption("KairosAI");
                    }}
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
    appLeftNavWidth: PropTypes.number,
};

const mapStateToProps = (state) => ({
    showAddIndicator: state.containers.showAddIndicator,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowAddIndicator: (value) => dispatch(changeShowAddIndicator(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(AppLeftNav);
