export const SET_AUTH = "@redux/SET_AUTH";
export const SET_USER = "@redux/SET_USER";
export const CLEAR_AUTH = "@redux/CLEAR_AUTH";
export const CLEAR_USER = "@redux/CLEAR_USER";

export const setAuthDefinition = auth => ({
    type: SET_AUTH,
    auth
});

export const setUserDefinition = user => ({
    type: SET_USER,
    user
});

export const clearAuthDefinition = () => ({
    type: CLEAR_AUTH
});

export const clearUserDefinition = () => ({
    type: CLEAR_USER
});
