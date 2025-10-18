import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField
} from "@mui/material";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {bindActionCreators} from "redux";
import {fetchSelectedAlert} from "../../redux/actions/byma.action";
import {saveAlertSagaRequest} from "../../redux/sagas/actions/byma.action";

const mapStateToProps = (state, ownProps) => ({
    negotiableInstruments: state.byma.negotiableInstruments,
    alerts: state.byma.alerts,
    selectedAlertSaved: state.byma.selectedAlert,
    alertConditionOperations: state.byma.alertConditionOperations,
    alertConditionExpressions: state.byma.alertConditionExpressions
});

const mapActionsToProps = dispatch => ({
    onFetchSelectedAlert: bindActionCreators(fetchSelectedAlert, dispatch),
    onSaveAlertSagaRequest: bindActionCreators(saveAlertSagaRequest, dispatch)
});

const EditAlerts = ({
                        negotiableInstruments,
                        selectedAlertSaved,
                        alertConditionExpressions,
                        alertConditionOperations,
                        onFetchSelectedAlert,
                        onSaveAlertSagaRequest
                    }) => {
    const [selectedAlert, setSelectedAlert] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        onFetchSelectedAlert(id);
    }, [id, onFetchSelectedAlert]);

    const onChangeSelectedAlert = attribute =>
        setSelectedAlert(prev => ({...prev, ...attribute}));

    const saveAlert = async () => {
        await onSaveAlertSagaRequest({...selectedAlertSaved, ...selectedAlert});
        navigate(`/alerts`, {state: {referer: location}});
    };

    const onClose = () => navigate(`/alerts`, {state: {referer: location}});

    const isValidAlert = () => {
        const newSelectedAlert = {...selectedAlertSaved, ...selectedAlert};
        return (
            newSelectedAlert.description &&
            newSelectedAlert.sourceNegotiableInstrumentId &&
            newSelectedAlert.parameter1 &&
            newSelectedAlert.condition &&
            newSelectedAlert.parameter2
        );
    };

    return (
        <Paper sx={{width: "100%"}}>
            <form noValidate autoComplete="off">
                <Grid container spacing={4} sx={{display: "flex", flexWrap: "wrap", paddingTop: "1.3em"}}>
                    <Grid item xs={12}>
                        <TextField
                            id="field-description"
                            label="Description"
                            value={selectedAlert.description || selectedAlertSaved.description || ""}
                            onChange={event => onChangeSelectedAlert({description: event.target.value})}
                            required
                            sx={{mx: 2, width: 200}}
                        />
                    </Grid>

                    <Grid container item xs={12} direction="row" justifyContent="flex-start" alignItems="center"
                          spacing={2}>
                        <Grid item>
                            <TextField
                                id="field-source-ticker"
                                select
                                label="Source Ticker"
                                value={selectedAlert.sourceNegotiableInstrumentId || selectedAlertSaved.sourceNegotiableInstrumentId || ""}
                                onChange={event => onChangeSelectedAlert({sourceNegotiableInstrumentId: event.target.value})}
                                variant="filled"
                                required
                                sx={{width: 200}}
                                SelectProps={{MenuProps: {sx: {width: 200}}}}
                            >
                                {negotiableInstruments.map(n => (
                                    <MenuItem key={n.id} value={n.id}>
                                        {n.ticker}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                id="field-param-1"
                                select
                                label="Parameter 1"
                                value={selectedAlert.parameter1 || selectedAlertSaved.parameter1 || ""}
                                onChange={event => onChangeSelectedAlert({parameter1: event.target.value})}
                                variant="filled"
                                required
                                sx={{width: 200}}
                                SelectProps={{MenuProps: {sx: {width: 200}}}}
                            >
                                {alertConditionExpressions.map(ind => (
                                    <MenuItem key={ind.id} value={ind.id}>
                                        {ind.code}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                id="field-conditions"
                                select
                                label="Conditions"
                                value={selectedAlert.condition || selectedAlertSaved.condition || ""}
                                onChange={event => onChangeSelectedAlert({condition: event.target.value})}
                                variant="filled"
                                required
                                sx={{width: 200}}
                                SelectProps={{MenuProps: {sx: {width: 200}}}}
                            >
                                {alertConditionOperations.map(op => (
                                    <MenuItem key={op.id} value={op.id}>
                                        {op.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item>
                            <TextField
                                id="field-param-2"
                                select
                                label="Parameter 2"
                                value={selectedAlert.parameter2 || selectedAlertSaved.parameter2 || ""}
                                onChange={event => onChangeSelectedAlert({parameter2: event.target.value})}
                                variant="filled"
                                required
                                sx={{width: 200}}
                                SelectProps={{MenuProps: {sx: {width: 200}}}}
                            >
                                {alertConditionExpressions.map(ind => (
                                    <MenuItem key={ind.id} value={ind.id}>
                                        {ind.code}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Switch
                                        id="checkbox-active"
                                        checked={selectedAlert.active ?? selectedAlertSaved.active}
                                        onChange={event => onChangeSelectedAlert({active: event.target.checked})}
                                        color="primary"
                                    />
                                }
                                label="Active"
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl sx={{width: 200}}>
                            <InputLabel htmlFor="select-multiple-tickers">Tickers</InputLabel>
                            <Select
                                multiple
                                value={selectedAlert.targetTickers || selectedAlertSaved.targetTickers || []}
                                onChange={event => onChangeSelectedAlert({targetTickers: event.target.value})}
                                input={<Input id="select-multiple-tickers"/>}
                                MenuProps={{sx: {width: 200}}}
                            >
                                {negotiableInstruments.map(n => (
                                    <MenuItem
                                        key={n.id}
                                        value={n.id}
                                        sx={{
                                            fontWeight:
                                                (selectedAlert.targetTickers || selectedAlertSaved.targetTickers).indexOf(n.ticker) === -1
                                                    ? "400"
                                                    : "500"
                                        }}
                                    >
                                        {n.ticker}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Button variant="contained" onClick={onClose} sx={{m: 1}}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={saveAlert} disabled={!isValidAlert()}
                                sx={{m: 1}}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default connect(mapStateToProps, mapActionsToProps)(EditAlerts);
