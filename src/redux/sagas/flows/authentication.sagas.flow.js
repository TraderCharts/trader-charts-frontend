import { call, take } from "redux-saga/effects";

import {
    CLEAR_AUTH_SAGA_REQUEST,
    CLEAR_USER_SAGA_REQUEST,
    REGISTER_USER_SAGA_REQUEST,
} from "../actions/authentication.action";
import { clearAuth, clearUser, registerUser } from "../generators/authentication.sagas.generator";

export function* loginFlow({ apiClients }, { payload: { auth, navigate } }) {
    const { user } = yield take(REGISTER_USER_SAGA_REQUEST);
    yield call(registerUser, { apiClients, auth, user });
    yield call(navigate, "/");
    yield take(CLEAR_AUTH_SAGA_REQUEST);
    yield call(clearAuth);
    yield take(CLEAR_USER_SAGA_REQUEST);
    yield call(clearUser);
}
