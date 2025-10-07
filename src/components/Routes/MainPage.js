import React, {useEffect, useState} from "react";
import AppUpperNav from "../../components/AppUpperNav";
import NotFound from "../../components/NotFound";
import AlertsSection from "../../containers/Alerts/AlertsSection";
import EditAlerts from "../../containers/Alerts/EditAlerts";
import AppLeftNav from "../../containers/AppLeftNav";
import Charts from "../../containers/Chart/ChartChooser";
import AddIndicator from "../../containers/Indicator/AddIndicator";
import EditIndicator from "../../containers/Indicator/EditIndicator/index";
import SelectTicker from "../../containers/Ticker/SelectTicker";
import {connect} from "react-redux";
import {Routes, Route, useLocation} from "react-router-dom";
import {bindActionCreators} from "redux";
import {fetchNegotiableInstruments} from "../../redux/actions/byma.action";
import {fetchIndicatorMetadata} from "../../redux/actions/indicators.action";
import {clearAuthSagaRequest} from "../../redux/sagas/actions/authentication.action";
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";

const appLeftNavWidth = 78;

const StyledChartContainer = styled(Box)(({theme}) => ({
    flexGrow: 1,
}));


const MainPage = ({onFetchNegotiableInstruments, onFetchIndicatorMetadata}) => {
    const location = useLocation();
    const [enableInteractiveObject, setEnableInteractiveObject] = useState(undefined);

    useEffect(() => {
        onFetchIndicatorMetadata();
        onFetchNegotiableInstruments();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Box sx={{display: 'flex'}}>
            <AppLeftNav
                appLeftNavWidth={appLeftNavWidth}
                enableInteractiveObject={enableInteractiveObject}
                setEnableInteractiveObject={setEnableInteractiveObject}
            />
            <AppUpperNav appLeftNavWidth={appLeftNavWidth}/>
            <StyledChartContainer>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<Charts enableInteractiveObject={enableInteractiveObject}
                                                     setEnableInteractiveObject={setEnableInteractiveObject}/>}/>
                    <Route path="/charts" element={<Charts enableInteractiveObject={enableInteractiveObject}
                                                           setEnableInteractiveObject={setEnableInteractiveObject}/>}/>
                    <Route path="/alerts" element={<AlertsSection/>}/>
                    <Route path="/alerts/create" element={<EditAlerts/>}/>
                    <Route path="/alerts/:id/edit" element={<EditAlerts/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <AddIndicator/>
                <EditIndicator/>
                <SelectTicker/>
            </StyledChartContainer>
        </Box>
    );
};

const mapStateToProps = state => ({
    auth: state.authentication.auth
});

const mapActionsToProps = dispatch => ({
    clearAuth: bindActionCreators(clearAuthSagaRequest, dispatch),
    onFetchNegotiableInstruments: bindActionCreators(fetchNegotiableInstruments, dispatch),
    onFetchIndicatorMetadata: bindActionCreators(fetchIndicatorMetadata, dispatch)
});

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);

export default enhance(MainPage);
