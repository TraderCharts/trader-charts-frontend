export const LOGIN_SAGA_REQUEST = "@saga/LOGIN_SAGA_REQUEST";
export const REGISTER_USER_SAGA_REQUEST = "@saga/REGISTER_USER_SAGA_REQUEST";
export const SET_USER_SAGA_REQUEST = "@saga/SET_USER_SAGA_REQUEST";
export const CLEAR_AUTH_SAGA_REQUEST = "@saga/CLEAR_AUTH_SAGA_REQUEST";
export const CLEAR_USER_SAGA_REQUEST = "@saga/CLEAR_USER_SAGA_REQUEST";

export const loginSagaRequest = auth => ({type: LOGIN_SAGA_REQUEST, auth});

export const registerUserSagaRequest = user => ({
    type: REGISTER_USER_SAGA_REQUEST,
    user
});

export const clearUserSagaRequest = () => ({type: CLEAR_USER_SAGA_REQUEST});

export const clearAuthSagaRequest = () => ({type: CLEAR_AUTH_SAGA_REQUEST});
