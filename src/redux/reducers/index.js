import {combineReducers} from "redux";

import authentication from "./authentication.reducer";
import containers from "./containers.reducer";
import byma from "./byma.reducer";
import indicators from "./indicators.reducer";

const rootReducer = combineReducers({
    authentication,
    indicators,
    containers,
    byma,
});

export default rootReducer;
