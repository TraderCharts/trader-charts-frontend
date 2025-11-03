export const FETCH_BYMA_STOCKS_DATA = "@definition/FETCH_BYMA_STOCKS_DATA";
export const FETCH_BYMA_STOCKS = "@definition/FETCH_BYMA_STOCKS";
export const SET_TRENDING_NEWS = "@saga/SET_TRENDING_NEWS";

export const fetchBymaStocksDataDefinition = (data) => ({
    type: FETCH_BYMA_STOCKS_DATA,
    payload: data,
});

export const fetchNegotiableInstrumentsDefinition = (data) => ({
    type: FETCH_BYMA_STOCKS,
    payload: data,
});

export const setTrendingNewsDefinition = (trendingNEws) => ({
    type: SET_TRENDING_NEWS,
    payload: trendingNEws,
});
