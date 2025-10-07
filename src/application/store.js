import {applyMiddleware, compose, createStore} from "redux";
import reducers from "../redux/reducers/index";

const getEnhancers = middlewares => {
    let enhancers = {};
    if (process.env.NODE_ENV === "development") {
        const composeEnhancers =
            typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: "ChartsRedux"})
                : compose;

        enhancers = composeEnhancers(applyMiddleware(...middlewares));
    } else {
        enhancers = applyMiddleware(...middlewares);
    }
    return enhancers;
};

export const configureStore = (apiConf, middlewares) => {
    const persistedState = {
        authentication: {
            auth: JSON.parse(localStorage.getItem("auth"))
        }
    };

    const store = createStore(
        reducers,
        persistedState,
        compose(getEnhancers(middlewares))
    );

    return store;
};
