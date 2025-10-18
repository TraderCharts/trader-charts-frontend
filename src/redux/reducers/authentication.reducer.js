import {
    CLEAR_AUTH,
    CLEAR_USER,
    SET_AUTH,
    SET_USER
} from "../actionDefinitions/authentication.actionDefinitions";

const initialState = {
    auth: undefined,
    user: undefined
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {...state, auth: action.auth};
        case CLEAR_AUTH:
            return {...state, auth: undefined};
        case SET_USER:
            return {...state, user: action.user};
        case CLEAR_USER:
            return {...state, user: undefined};
        default:
            return state;
    }
};

export default authenticationReducer;
