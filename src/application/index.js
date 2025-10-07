import React, {useEffect} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Provider as ConnectProvider, useDispatch} from "react-redux";
import deepmerge from "deepmerge";
import rootSagas from "../redux/sagas/index";
import {
    clearAuthSagaRequest,
    clearUserSagaRequest
} from "../redux/sagas/actions/authentication.action";
import MainRoutes from "../components/Routes/MainRoutes";

import {configureStore} from "./store";
import {
    checkTokenExpirationMiddleware,
    sagaMiddleware,
    thunkMiddleware
} from "./middlewares";
import {updateExpiresAt} from "./localStorage";
import BymaClient from "../redux/clients/BymaClient";
import AlertsClient from "../redux/clients/AlertsClient";
import AuthenticationClient from "../redux/clients/AuthenticationClient";
import IndicatorsClient from "../redux/clients/IndicatorsClient";

const clientName = process.env.REACT_APP_CLIENT_NAME;
const clientThemeData = require(`../resources/themes/${clientName}.json`);
const globalThemeData = require("../resources/themes/global.json");

const themeData = deepmerge(clientThemeData.theme, globalThemeData.theme);
const muiTheme = createTheme(themeData);

const apiConf = require(`../resources/apis/${clientName}.config.json`);
const bymaClient = new BymaClient(apiConf);
const authenticationClient = new AuthenticationClient(apiConf);
const indicatorsClient = new IndicatorsClient(apiConf);
const alertsClient = new AlertsClient(apiConf);

const apiClients = {
    apiConf,
    authenticationClient,
    bymaClient,
    indicatorsClient,
    alertsClient
};

const middlewares = [
    checkTokenExpirationMiddleware,
    thunkMiddleware(apiClients),
    sagaMiddleware
];

const store = configureStore(apiConf, middlewares);
sagaMiddleware.run(rootSagas, {apiClients});

// 🔹 Hook que reemplaza history.listen para expirar sesión
const TokenExpirationHandler = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (process.env.REACT_APP_ENV === "production") {
            const checkExpiration = () => {
                const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
                const timeNow = Date.now();
                if (expiresAt && expiresAt <= timeNow) {
                    dispatch(clearAuthSagaRequest());
                    dispatch(clearUserSagaRequest());
                }
                updateExpiresAt();
            };

            checkExpiration(); // primera verificación inmediata
            const intervalId = setInterval(checkExpiration, 60 * 1000); // revisa cada minuto

            return () => clearInterval(intervalId); // limpiar al desmontar
        }
    }, [dispatch]);

    return null; // no renderiza nada
};

const Application = () => (
    <ThemeProvider theme={muiTheme}>
        <ConnectProvider store={store}>
            <TokenExpirationHandler/>
            <MainRoutes/>
        </ConnectProvider>
    </ThemeProvider>
);

export default Application;
