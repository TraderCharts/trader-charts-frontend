import { Box, Divider, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { changeShowSelectTicker } from "../../redux/actions/containers.action";
import { clearAuthSagaRequest } from "../../redux/sagas/actions/authentication.action";

import SearchSymbol from "../../components/AppUpperNav/SearchSymbol";
import IntervalSelector from "../../components/AppUpperNav/IntervalSelector";
import InstrumentDetails from "../../components/AppUpperNav/InstrumentDetails";
import UserMenu from "../../components/AppUpperNav/UserMenu";
import Charts from "../../components/AppLeftNav/Charts";
import Watchlist from "../../components/AppUpperNav/Watchlist";

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "appLeftNavWidth",
})(({ theme, appLeftNavWidth }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundImage: "none",
    boxShadow: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
    zIndex: theme.zIndex.drawer - 1,
    width: `calc(100% - ${appLeftNavWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const StyledToolbar = styled(Toolbar)({
    minHeight: 64,
    height: 64,
    padding: "0 16px",
    justifyContent: "space-between",
});

const ToolbarGroup = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 0,
    height: "100%",
});

const Separator = styled(Divider)(({ theme }) => ({
    height: 32,
    margin: "0 12px",
    borderColor: alpha(theme.palette.common.white, 0.2),
}));

const AppUpperNav = ({
    auth,
    selectedTicker,
    appLeftNavWidth,
    negotiableInstruments,
    bondTerms,
    onChangeShowSelectTicker,
    clearAuthSagaRequest,
    onChangeInterval,
}) => {
    const [selectedInterval, setSelectedInterval] = useState("D");
    const navigate = useNavigate();
    const location = useLocation();

    const handleIntervalClick = (interval) => {
        setSelectedInterval(interval);

        if (onChangeInterval) {
            onChangeInterval({ interval });
        }
    };

    const isChartsPage = location.pathname === "/" || location.pathname === "/charts";

    const isInstrumentDetailsPage = location.pathname.startsWith("/instrumentDetails");

    return (
        <StyledAppBar position="fixed" appLeftNavWidth={appLeftNavWidth}>
            <StyledToolbar>
                <ToolbarGroup>
                    <SearchSymbol
                        selectedTicker={selectedTicker}
                        negotiableInstruments={negotiableInstruments}
                        onOpen={() => onChangeShowSelectTicker(true)}
                    />

                    <Separator orientation="vertical" />

                    <IntervalSelector
                        selectedInterval={selectedInterval}
                        onChangeInterval={handleIntervalClick}
                    />

                    <Separator orientation="vertical" />

                    <Charts
                        onClick={() => {
                            if (!isChartsPage) {
                                navigate("/charts");
                            }
                        }}
                        sx={{
                            color: "rgba(255,255,255,0.75)",
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            ...(isChartsPage && {
                                color: "#fff",
                                backgroundColor: "rgba(255,255,255,0.1)",
                            }),
                            "&:hover": {
                                color: "#fff",
                                backgroundColor: "rgba(255,255,255,0.1)",
                            },
                        }}
                        placement="bottom"
                    />

                    <Watchlist />

                    <InstrumentDetails
                        selected={isInstrumentDetailsPage}
                        selectedTicker={selectedTicker}
                        negotiableInstruments={negotiableInstruments}
                        bondTerms={bondTerms}
                    />
                </ToolbarGroup>

                <ToolbarGroup>
                    <UserMenu
                        auth={auth}
                        onLogout={() => {
                            clearAuthSagaRequest();
                        }}
                    />
                </ToolbarGroup>
            </StyledToolbar>
        </StyledAppBar>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
    user: state.authentication.user,
    selectedTicker: state.containers.selectedTicker,
    negotiableInstruments: state.byma.negotiableInstruments,
    bondTerms: state.byma.bondTerms,
});

const mapActionsToProps = (dispatch) => ({
    clearAuthSagaRequest: () => dispatch(clearAuthSagaRequest()),
    onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(AppUpperNav);
