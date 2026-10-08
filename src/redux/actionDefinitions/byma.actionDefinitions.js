export const FETCH_BYMA_STOCKS_DATA = "@definition/FETCH_BYMA_STOCKS_DATA";
export const FETCH_BYMA_STOCKS = "@definition/FETCH_BYMA_STOCKS";
export const SET_BOND_TERMS = "@definition/SET_BOND_TERMS";
export const SET_TRENDING_NEWS = "@saga/SET_TRENDING_NEWS";
export const SET_BYMA_STOCKS_DATA = "@saga/SET_BYMA_STOCKS_DATA";
export const SET_LATEST_BYMA_STOCKS_DATA = "@saga/SET_LATEST_BYMA_STOCKS_DATA";
export const SET_WATCHLISTS = "@definition/SET_WATCHLISTS";
export const SET_WATCHLIST_LATEST_DATA = "@definition/SET_WATCHLIST_LATEST_DATA";
export const ADD_WATCHLIST_TICKER = "@definition/ADD_WATCHLIST_TICKER";
export const REMOVE_WATCHLIST_TICKER = "@definition/REMOVE_WATCHLIST_TICKER";

export const fetchBymaStocksDataDefinition = (data) => ({
    type: FETCH_BYMA_STOCKS_DATA,
    payload: data,
});

export const fetchNegotiableInstrumentsDefinition = (data) => ({
    type: FETCH_BYMA_STOCKS,
    payload: data,
});

export const setBondTermsDefinition = (data) => ({
    type: SET_BOND_TERMS,
    payload: data,
});

export const setTrendingNewsDefinition = (trendingNEws) => ({
    type: SET_TRENDING_NEWS,
    payload: trendingNEws,
});

export const setBymaStocksDataDefinition = (data) => ({
    type: SET_BYMA_STOCKS_DATA,
    payload: data,
});

export const setLatestBymaStocksDataDefinition = (data) => ({
    type: SET_LATEST_BYMA_STOCKS_DATA,
    payload: data,
});

export const setWatchlistsDefinition = (watchlists) => ({
    type: SET_WATCHLISTS,
    payload: watchlists,
});

export const setWatchlistLatestDataDefinition = (latestData) => ({
    type: SET_WATCHLIST_LATEST_DATA,
    payload: latestData,
});

export const addWatchlistTickerDefinition = (ticker) => ({
    type: ADD_WATCHLIST_TICKER,
    payload: ticker,
});

export const removeWatchlistTickerDefinition = (ticker) => ({
    type: REMOVE_WATCHLIST_TICKER,
    payload: ticker,
});
