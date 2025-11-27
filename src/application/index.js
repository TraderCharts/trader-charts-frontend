import { createTheme, ThemeProvider } from "@mui/material/styles";
import deepmerge from "deepmerge";
import { useEffect } from "react";
import { Provider as ConnectProvider, useDispatch } from "react-redux";

import MainRoutes from "../components/Routes/MainRoutes";
import AlertsClient from "../redux/clients/AlertsClient";
import AuthenticationClient from "../redux/clients/AuthenticationClient";
import BymaClient from "../redux/clients/BymaClient";
import IndicatorsClient from "../redux/clients/IndicatorsClient";
import TrendingNewsClient from "../redux/clients/TrendingNewsClient";
import {
    clearAuthSagaRequest,
    clearUserSagaRequest,
} from "../redux/sagas/actions/authentication.action";
import rootSagas from "../redux/sagas/index";
import { updateExpiresAt } from "./localStorage";
import { checkTokenExpirationMiddleware, sagaMiddleware, thunkMiddleware } from "./middlewares";
import { configureStore } from "./store";

const clientName = process.env.REACT_APP_CLIENT_NAME_THEME;
const clientThemeData = require(`../resources/themes/${clientName}.json`);
const globalThemeData = require("../resources/themes/global.json");

const themeData = deepmerge(clientThemeData.theme, globalThemeData.theme);
const muiTheme = createTheme(themeData);

const apiConf = require(`../resources/apis/${clientName}.config.json`);
const bymaClient = new BymaClient(apiConf);
const authenticationClient = new AuthenticationClient(apiConf);
const indicatorsClient = new IndicatorsClient(apiConf);
const alertsClient = new AlertsClient(apiConf);
const trendingNewsClient = new TrendingNewsClient(apiConf);

const apiClients = {
    apiConf,
    authenticationClient,
    bymaClient,
    indicatorsClient,
    alertsClient,
    trendingNewsClient,
};

const middlewares = [checkTokenExpirationMiddleware, thunkMiddleware(apiClients), sagaMiddleware];

const store = configureStore(apiConf, middlewares);
sagaMiddleware.run(rootSagas, { apiClients });

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

            checkExpiration();
            const intervalId = setInterval(checkExpiration, 60 * 1000);

            return () => clearInterval(intervalId);
        }
    }, [dispatch]);

    return null;
};

const Application = () => (
    <ThemeProvider theme={muiTheme}>
        <ConnectProvider store={store}>
            <TokenExpirationHandler />
            <MainRoutes />
        </ConnectProvider>
    </ThemeProvider>
);

export default Application;
