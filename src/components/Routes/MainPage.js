import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";

import AppUpperNav from "../../components/AppUpperNav";
import NotFound from "../../components/NotFound";
import AlertsSection from "../../containers/Alerts/AlertsSection";
import EditAlerts from "../../containers/Alerts/EditAlerts";
import AppLeftNav from "../../containers/AppLeftNav";
import Charts from "../../containers/Chart/ChartChooser";
import AddIndicator from "../../containers/Indicator/AddIndicator";
import EditIndicator from "../../containers/Indicator/EditIndicator/index";
import KairosAISection from "../../containers/KairosAI/KairosAISection";
import SelectTicker from "../../containers/Ticker/SelectTicker";
import TrendingNewsSection from "../../containers/TrendingNews/TrendingNewsSection";
import { fetchNegotiableInstruments, fetchBymaStocksData } from "../../redux/actions/byma.action";
import { fetchIndicatorMetadata } from "../../redux/actions/indicators.action";
import { clearAuthSagaRequest } from "../../redux/sagas/actions/authentication.action";
import { changeSelectedTicker } from "../../redux/actions/containers.action";

const appLeftNavWidth = 78;

const StyledChartContainer = styled(Box)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
}));

const MainPage = ({
    onFetchNegotiableInstruments,
    onFetchIndicatorMetadata,
    onChangeSelectedTicker,
    onFetchBymaStocksData,
}) => {
    const location = useLocation();
    const [enableInteractiveObject, setEnableInteractiveObject] = useState(undefined);

    useEffect(() => {
        onFetchIndicatorMetadata();
        onFetchNegotiableInstruments();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const onChangeTicker = (negotiableInstrument) => {
        onChangeSelectedTicker(negotiableInstrument);
        onFetchBymaStocksData();
    };

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <AppLeftNav
                appLeftNavWidth={appLeftNavWidth}
                enableInteractiveObject={enableInteractiveObject}
                setEnableInteractiveObject={setEnableInteractiveObject}
            />
            <AppUpperNav appLeftNavWidth={appLeftNavWidth} onChangeInterval={onChangeTicker} />
            <StyledChartContainer>
                <Toolbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Charts
                                enableInteractiveObject={enableInteractiveObject}
                                setEnableInteractiveObject={setEnableInteractiveObject}
                            />
                        }
                    />
                    <Route
                        path="/charts"
                        element={
                            <Charts
                                enableInteractiveObject={enableInteractiveObject}
                                setEnableInteractiveObject={setEnableInteractiveObject}
                            />
                        }
                    />
                    <Route path="/alerts" element={<AlertsSection />} />
                    <Route path="/alerts/create" element={<EditAlerts />} />
                    <Route path="/alerts/:id/edit" element={<EditAlerts />} />
                    <Route path="/trendingNews" element={<TrendingNewsSection />} />
                    <Route path="/KairosAI" element={<KairosAISection />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <AddIndicator />
                <EditIndicator />
                <SelectTicker />
            </StyledChartContainer>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
});

const mapActionsToProps = (dispatch) => ({
    clearAuth: bindActionCreators(clearAuthSagaRequest, dispatch),
    onFetchNegotiableInstruments: bindActionCreators(fetchNegotiableInstruments, dispatch),
    onFetchIndicatorMetadata: bindActionCreators(fetchIndicatorMetadata, dispatch),
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onFetchBymaStocksData: () => dispatch(fetchBymaStocksData()),
});

const enhance = (pure) => connect(mapStateToProps, mapActionsToProps)(pure);

export default enhance(MainPage);
