/* eslint-disable no-process-env */
import {call, put} from 'redux-saga/effects';
import {
    clearAuthDefinition,
    clearUserDefinition,
    setAuthDefinition,
    setUserDefinition
} from '../../actionDefinitions/authentication.actionDefinitions';

export function* setAuth({apiClients, auth}) {
    const expiresAt = JSON.stringify(
        process.env.REACT_APP_TIMEOUT_MINS * 60 * 1000 + new Date().getTime()
    );
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("expires_at", expiresAt);
    yield put(setAuthDefinition(auth));
}

export function* setUser({apiClients, user}) {
    yield put(setUserDefinition(user));
}

export function* clearAuth() {
    localStorage.removeItem("auth");
    localStorage.removeItem("expires_at");
    yield put(clearAuthDefinition());
}

export function* clearUser() {
    yield put(clearUserDefinition());
}

export function* registerUser({apiClients, auth, user}) {
    yield call(setAuth, {apiClients, auth});
    const retrievedUsers = yield call(
        apiClients.authenticationClient.getUserByUniqueUserToken,
        user.sub
    );
    const retrievedUser =
        retrievedUsers.length > 0 ? retrievedUsers[0] : undefined;
    if (!retrievedUser) {
        yield call(apiClients.authenticationClient.registerUser, user);
    } else {
        yield call(
            apiClients.authenticationClient.updateUser,
            user,
            retrievedUser.id
        );
    }
    yield call(setUser, {apiClients, user});
}
