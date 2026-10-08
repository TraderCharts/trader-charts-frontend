import SearchIcon from "@mui/icons-material/Search";
import {
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Box,
    Typography,
    Chip,
    Button,
    DialogActions,
    IconButton,
    InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { tickerIcons } from "../../constants/tickerIcons";
import { fetchBondTerms } from "../../redux/actions/byma.action";
import { fetchBymaStocksDataSagaRequest } from "../../redux/sagas/actions/byma.action";
import {
    changeSelectedTicker,
    changeShowSelectTicker,
} from "../../redux/actions/containers.action";
import {
    AdditionIcon,
    SubtractionIcon,
    MultiplicationIcon,
    DivisionIcon,
    ExponentiationIcon,
    HideOperatorsIcon,
    ShowOperatorsIcon,
    ClearIcon,
} from "../../resources/icons/operators";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
    showSelectTicker: state.containers.showSelectTicker,
    negotiableInstruments: state.byma.negotiableInstruments,
});

const mapActionsToProps = (dispatch) => ({
    onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onFetchBymaStocksData: () => dispatch(fetchBymaStocksDataSagaRequest()),
    onFetchBondTerms: (tickers) => dispatch(fetchBondTerms(tickers)),
});

const metrics = [
    { id: "price", label: "Price", token: "price", default: true },
    { id: "parity", label: "Parity", token: "parity" },
    { id: "currentYield", label: "Current Yield", token: "currentYield" },
    { id: "residualValue", label: "Residual Value", token: "residualValue" },
    { id: "technicalValue", label: "Technical Value", token: "technicalValue" },
    { id: "accruedInterest", label: "Accrued Interest", token: "accruedInterest" },
    { id: "annualIncome", label: "Annual Income", token: "annualIncome" },
    { id: "couponIncome", label: "Coupon Income", token: "couponIncome" },
];

const operators = [
    { icon: <DivisionIcon fontSize="small" />, value: "/" },
    { icon: <SubtractionIcon fontSize="small" />, value: "-" },
    { icon: <AdditionIcon fontSize="small" />, value: "+" },
    { icon: <MultiplicationIcon fontSize="small" />, value: "*" },
    { icon: <ExponentiationIcon fontSize="small" />, value: "^" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
];

const SelectTicker = ({
    showSelectTicker = false,
    onChangeShowSelectTicker,
    onChangeSelectedTicker,
    onFetchBymaStocksData,
    onFetchBondTerms,
    negotiableInstruments,
}) => {
    const [expression, setExpression] = useState("");
    const [selectedMetric, setSelectedMetric] = useState("price");
    const [showOperatorsBar, setShowOperatorsBar] = useState(true);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (showSelectTicker && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [showSelectTicker]);

    const onClose = () => {
        setExpression("");
        setSelectedMetric("price");
        onChangeShowSelectTicker(false);
    };

    const onConfirm = () => {
        if (expression.trim()) {
            const tickerPattern = /([A-Z0-9]+)(?:\..*?)(?=\s|$|[+\-*/^()])/g;
            const tickers = [];
            let match;

            while ((match = tickerPattern.exec(expression)) !== null) {
                const ticker = match[1];

                if (!tickers.includes(ticker)) {
                    tickers.push(ticker);
                }
            }

            const lastSelectedTicker = {
                expression: expression.trim(),
                interval: "D",
                tickers,
            };
            onChangeSelectedTicker(lastSelectedTicker);

            onFetchBymaStocksData();
            onFetchBondTerms(tickers);
            localStorage.setItem("lastSelectedTicker", JSON.stringify(lastSelectedTicker));
            navigate("/charts", { state: { referer: "select-ticker" } });

            onClose();
        }
    };

    const handleTextChange = (event) => {
        const value = event.target.value;
        setExpression(value);
    };

    const getSearchTerm = () => {
        const text = expression;
        const match = text.match(/[A-Z0-9]+$/i);
        return match ? match[0] : "";
    };

    const addToExpression = (ticker, hasMetrics = true, metricToken = null) => {
        const token = hasMetrics ? `${ticker}.${metricToken} ` : `${ticker}.price `;

        const searchTerm = getSearchTerm();

        // Si hay una palabra siendo escrita, reemplazarla
        if (searchTerm) {
            const lastWordIndex = expression.lastIndexOf(searchTerm);
            const beforeLastWord = expression.substring(0, lastWordIndex);
            const newExpression = beforeLastWord + token;
            setExpression(newExpression);
        } else {
            // Agregar al final
            setExpression(expression + token);
        }

        inputRef.current?.focus();
    };

    const addOperator = (op) => {
        let newExpression = expression;
        const isParenthesis = op === "(" || op === ")";

        if (isParenthesis) {
            newExpression = expression + op;
        } else {
            if (expression.length > 0 && !expression.endsWith(" ")) {
                newExpression = expression + " " + op + " ";
            } else if (expression.endsWith(" ")) {
                newExpression = expression + op + " ";
            } else {
                newExpression = expression + op + " ";
            }
        }

        setExpression(newExpression);
        inputRef.current?.focus();
    };

    const clearExpression = () => {
        setExpression("");
        inputRef.current?.focus();
    };

    const toggleOperators = () => {
        setShowOperatorsBar(!showOperatorsBar);
    };

    const searchTerm = getSearchTerm();

    const hasMetrics = (instrument) => {
        return instrument.bondTermsId !== undefined && instrument.bondTermsId !== null;
    };

    const filteredInstruments = negotiableInstruments.filter(
        (instrument) =>
            searchTerm === "" ||
            instrument.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instrument.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog
            open={showSelectTicker}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            <DialogTitle sx={{ pb: 0, pt: 2 }}>Buscar</DialogTitle>
            <Box sx={{ p: 2, pt: 1 }}>
                <TextField
                    inputRef={inputRef}
                    value={expression}
                    onChange={handleTextChange}
                    placeholder="Ej: AL30D.parity + GD30D.parity"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {expression && (
                                    <IconButton onClick={clearExpression} size="small" edge="end">
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                        sx: { fontFamily: "monospace", fontSize: 14, pr: 1 },
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        mt: 1,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                    }}
                >
                    {showOperatorsBar &&
                        operators.map((op, idx) => (
                            <IconButton
                                key={idx}
                                size="small"
                                onClick={() => addOperator(op.value)}
                                sx={{ width: 28, height: 28, borderRadius: 1 }}
                            >
                                {op.icon || op.label}
                            </IconButton>
                        ))}
                    <IconButton
                        size="small"
                        onClick={toggleOperators}
                        sx={{ width: 28, height: 28, borderRadius: 1 }}
                    >
                        {showOperatorsBar ? (
                            <HideOperatorsIcon fontSize="small" />
                        ) : (
                            <ShowOperatorsIcon fontSize="small" />
                        )}
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                    Métrica seleccionada: {metrics.find((m) => m.id === selectedMetric)?.label}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                    {metrics.map((metric) => (
                        <Chip
                            key={metric.id}
                            label={metric.label}
                            size="small"
                            onClick={() => setSelectedMetric(metric.id)}
                            clickable
                            variant={selectedMetric === metric.id ? "filled" : "outlined"}
                            color={selectedMetric === metric.id ? "primary" : "default"}
                        />
                    ))}
                </Box>
            </Box>

            <Divider />
            <List sx={{ maxHeight: 300, overflow: "auto", py: 0 }}>
                {filteredInstruments.slice(0, 10).map((instrument, index) => {
                    const hasMetricsFlag = hasMetrics(instrument);
                    return (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                if (hasMetricsFlag) {
                                    addToExpression(instrument.ticker, true, selectedMetric);
                                } else {
                                    addToExpression(instrument.ticker, false);
                                }
                            }}
                            sx={{ py: 1 }}
                        >
                            <ListItemIcon sx={{ mr: 1, minWidth: 32, color: "white" }}>
                                {tickerIcons[instrument?.icon]}
                            </ListItemIcon>
                            <ListItemText
                                primary={instrument.name}
                                secondary={instrument.ticker}
                                secondaryTypographyProps={{ variant: "caption" }}
                            />
                            {hasMetricsFlag && (
                                <Chip
                                    label="Bono"
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderRadius: 1, height: 22 }}
                                />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider />
            <DialogActions sx={{ px: 2, py: 1 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    disableElevation
                    disabled={!expression.trim()}
                >
                    Aplicar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SelectTicker.propTypes = {
    showSelectTicker: PropTypes.bool,
    onChangeShowSelectTicker: PropTypes.func.isRequired,
    onChangeSelectedTicker: PropTypes.func.isRequired,
    onFetchBymaStocksData: PropTypes.func.isRequired,
    negotiableInstruments: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(SelectTicker);
