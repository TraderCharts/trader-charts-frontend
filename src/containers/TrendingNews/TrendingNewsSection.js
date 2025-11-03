import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchTrendingNewsSagaRequest } from "../../redux/sagas/actions/byma.action";
import TrendingNews from "./TrendingNews";

const mapActionsToProps = (dispatch) => ({
    onFetchTrendingNewsSagaRequest: bindActionCreators(fetchTrendingNewsSagaRequest, dispatch),
});

const TrendingNewsSection = ({ onFetchTrendingNewsSagaRequest }) => {
    useEffect(() => {
        onFetchTrendingNewsSagaRequest();
    }, []);

    return (
        <>
            <TrendingNews />
        </>
    );
};

const enhance = (pure) => connect(undefined, mapActionsToProps)(pure);

export default enhance(TrendingNewsSection);
