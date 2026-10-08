import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import WatchlistsHeader from "../../components/Watchlists/WatchlistsHeader";
import WatchlistsToolbar from "../../components/Watchlists/WatchlistsToolbar";
import WatchlistGroup from "../../components/Watchlists/WatchlistGroup";

import { addWatchlistTicker, removeWatchlistTicker } from "../../redux/actions/byma.action";
import { changeSelectedTicker } from "../../redux/actions/containers.action";
import { fetchWatchlistsSagaRequest } from "../../redux/sagas/actions/byma.action";

import {
    negotiableInstrumentsSelector,
    watchlistsSelector,
    watchlistLatestDataSelector,
} from "../../selectors/byma.selector";

const mapStateToProps = (state) => ({
    watchlists: watchlistsSelector(state),
    watchlistLatestData: watchlistLatestDataSelector(state),
    negotiableInstruments: negotiableInstrumentsSelector(state),
});

const mapActionsToProps = (dispatch) => ({
    onFetchWatchlists: () => dispatch(fetchWatchlistsSagaRequest()),
    onChangeSelectedTicker: (value) => dispatch(changeSelectedTicker(value)),
    onAddTicker: (ticker) => dispatch(addWatchlistTicker(ticker)),
    onRemoveTicker: (ticker) => dispatch(removeWatchlistTicker(ticker)),
});

const WatchlistsSection = ({
    watchlists,
    watchlistLatestData,
    negotiableInstruments,

    onFetchWatchlists,
    onChangeSelectedTicker,

    onAddTicker,
    onRemoveTicker,
}) => {
    const navigate = useNavigate();

    const [selectedWatchlistId, setSelectedWatchlistId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        onFetchWatchlists();
    }, [onFetchWatchlists]);

    const watchlistsWithData = useMemo(() => {
        const latestByTicker = new Map(
            (watchlistLatestData || []).map((data) => [data.ticker, data])
        );

        return (watchlists || []).map((watchlist) => ({
            ...watchlist,

            instruments: (watchlist.items || watchlist.tickers || [])
                .map((item) => {
                    const ticker = typeof item === "string" ? item : item?.ticker;

                    if (!ticker) {
                        return null;
                    }

                    const latestData = latestByTicker.get(ticker);

                    return {
                        ...(typeof item === "object" ? item : {}),
                        ...(latestData || {}),
                        ticker,
                    };
                })
                .filter(Boolean),
        }));
    }, [watchlists, watchlistLatestData]);

    useEffect(() => {
        if (selectedWatchlistId === null && watchlistsWithData.length > 0) {
            setSelectedWatchlistId(watchlistsWithData[0]._id);
        }
    }, [watchlistsWithData, selectedWatchlistId]);

    const selectedWatchlist = useMemo(
        () =>
            watchlistsWithData.find((watchlist) => watchlist._id === selectedWatchlistId) ||
            watchlistsWithData[0],
        [watchlistsWithData, selectedWatchlistId]
    );

    const filteredInstruments = useMemo(() => {
        const instruments = selectedWatchlist?.instruments || [];
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return instruments;
        }

        return instruments.filter((instrument) => {
            const ticker = instrument.ticker?.toLowerCase() || "";
            const name = instrument.name?.toLowerCase() || "";

            return ticker.includes(normalizedSearch) || name.includes(normalizedSearch);
        });
    }, [selectedWatchlist, search]);

    const stockInstruments = useMemo(
        () =>
            filteredInstruments.filter(
                (instrument) => instrument.type === "STOCK" || instrument.type === "stock"
            ),
        [filteredInstruments]
    );

    const bondInstruments = useMemo(
        () =>
            filteredInstruments.filter(
                (instrument) =>
                    instrument.bondTermsId != null ||
                    instrument.residualValue != null ||
                    instrument.couponRate != null ||
                    instrument.parity != null
            ),
        [filteredInstruments]
    );

    const handleChangeWatchlist = (watchlistId) => {
        setSelectedWatchlistId(watchlistId);
        setSearch("");
    };

    const handleAddTicker = (ticker) => {
        const normalizedTicker = ticker?.trim().toUpperCase();

        if (!normalizedTicker) {
            return;
        }

        onAddTicker(normalizedTicker);
    };

    const handleRemoveTicker = (ticker) => {
        if (!ticker) {
            return;
        }

        onRemoveTicker(ticker);
    };

    const handleMetricClick = (instrument, metric) => {
        const ticker = instrument?.ticker?.trim().toUpperCase();

        if (!ticker) {
            return;
        }

        const selectedTicker = {
            expression: `${ticker}.${metric}`,
            interval: "D",
            tickers: [ticker],
        };

        onChangeSelectedTicker(selectedTicker);

        localStorage.setItem("lastSelectedTicker", JSON.stringify(selectedTicker));

        navigate("/charts", {
            state: {
                referer: "watchlists",
            },
        });
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1800,
                    mx: "auto",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    py: { xs: 1.5, md: 2 },
                    boxSizing: "border-box",
                }}
            >
                <WatchlistsHeader
                    watchlists={watchlistsWithData}
                    selectedWatchlistId={selectedWatchlistId}
                    onChangeWatchlist={handleChangeWatchlist}
                    onAddTicker={handleAddTicker}
                    negotiableInstruments={negotiableInstruments}
                />

                <WatchlistsToolbar search={search} onSearchChange={setSearch} />

                {stockInstruments.length > 0 && (
                    <WatchlistGroup
                        title="Stocks"
                        instruments={stockInstruments}
                        type="stock"
                        onMetricClick={handleMetricClick}
                        onRemoveTicker={handleRemoveTicker}
                    />
                )}

                {bondInstruments.length > 0 && (
                    <WatchlistGroup
                        title="Bonds"
                        instruments={bondInstruments}
                        type="bond"
                        onMetricClick={handleMetricClick}
                        onRemoveTicker={handleRemoveTicker}
                    />
                )}
            </Box>
        </Box>
    );
};

export default connect(mapStateToProps, mapActionsToProps)(WatchlistsSection);
