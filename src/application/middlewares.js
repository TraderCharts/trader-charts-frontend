import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {
    clearAuthSagaRequest,
    clearUserSagaRequest
} from "../redux/sagas/actions/authentication.action";
import {updateExpiresAt} from "./localStorage";

export const thunkMiddleware = apis => thunk.withExtraArgument(apis);

export const sagaMiddleware = createSagaMiddleware();

export const checkTokenExpirationMiddleware = ({
                                                   getState,
                                                   dispatch
                                               }) => next => action => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    const timeNow = Date.now();
    if (expiresAt && expiresAt <= timeNow) {
        next(clearAuthSagaRequest());
        next(clearUserSagaRequest());
    } else {
        next(action);
    }
    updateExpiresAt();
};
