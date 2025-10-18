import {Button, Paper, Switch} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import EnhancedTable from '../../containers/Table/EnhancedTable';
import {showPageEditAlerts} from '../../redux/actions/byma.action';
import {
    calculateAlertsSagaRequest,
    deleteAlertSagaRequest,
    fetchAlertsSagaRequest,
    fetchNegotiableInstrumentsAlertsSagaRequest
} from '../../redux/sagas/actions/byma.action';
import {alertsTableSelector} from '../../selectors/byma.selector';

const rowsMetadata = [
    {id: "description", numeric: false, disablePadding: false, component: () => Button, label: "Description"},
    {id: "sourceTicker", numeric: false, disablePadding: false, label: "Source Ticker"},
    {id: "parameter1", numeric: true, disablePadding: false, label: "Param 1"},
    {id: "condition", numeric: true, disablePadding: false, label: "Condition"},
    {id: "parameter2", numeric: true, disablePadding: false, label: "Param 2"},
    {id: "active", numeric: true, disablePadding: false, component: () => Switch, label: "Active"},
    {
        id: "ringing",
        numeric: true,
        disablePadding: false,
        component: value => (value ? CheckIcon : CloseIcon),
        label: "Ringing"
    }
];

const mapStateToProps = state => ({
    alerts: alertsTableSelector(state),
    indicatorsListMetadata: state.indicators.indicatorsListMetadata,
    openEditAlerts: state.byma.showPages.editAlerts,
    bymaStocksData: state.byma.bymaStocksData
});

const mapActionsToProps = dispatch => ({
    onFetchAlertsSagaRequest: bindActionCreators(fetchAlertsSagaRequest, dispatch),
    onFetchNegotiableInstrumentsAlertsSagaRequest: bindActionCreators(fetchNegotiableInstrumentsAlertsSagaRequest, dispatch),
    showPageEditAlerts: bindActionCreators(showPageEditAlerts, dispatch),
    onDeleteAlertSagaRequest: bindActionCreators(deleteAlertSagaRequest, dispatch),
    onCalculateAlertsSagaRequest: bindActionCreators(calculateAlertsSagaRequest, dispatch)
});

const AlertsTable = ({
                         alerts,
                         onFetchAlertsSagaRequest,
                         onFetchNegotiableInstrumentsAlertsSagaRequest,
                         onCalculateAlertsSagaRequest,
                         onDeleteAlertSagaRequest,
                         showPageEditAlerts
                     }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        onFetchAlertsSagaRequest();
        onFetchNegotiableInstrumentsAlertsSagaRequest();
    }, []);

    const calculateAlerts = () => {
        onCalculateAlertsSagaRequest();
    };

    return (
        <Paper>
            <EnhancedTable
                rows={alerts}
                rowsMetadata={rowsMetadata}
                onClickAdd={() => navigate(`/alerts/create`, {state: {referer: location}})}
                onClickDelete={onDeleteAlertSagaRequest}
                cellActions={{
                    description: (_, row) => {
                        navigate(`/alerts/${row.id}/edit`, {state: {referer: location}});
                        showPageEditAlerts(true);
                    }
                }}
            />
            <Button variant="outlined" color="primary" onClick={calculateAlerts}>
                Calculate alerts
            </Button>
        </Paper>
    );
};

export default connect(mapStateToProps, mapActionsToProps)(AlertsTable);
