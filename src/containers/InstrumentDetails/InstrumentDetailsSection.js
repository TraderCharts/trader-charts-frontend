import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import InstrumentDetails from "./InstrumentDetails";

const InstrumentDetailsSection = ({
    negotiableInstruments = [],
    bondTerms = [],
    latestBymaStocksData = [],
}) => {
    const { ticker } = useParams();

    const instrument = negotiableInstruments.find((instrument) => instrument.ticker === ticker);

    if (!instrument) {
        return null;
    }

    const bondTerm = bondTerms.find((term) => term._id === instrument.bondTermsId);

    if (!bondTerm) {
        return null;
    }

    const latestData = latestBymaStocksData.find((data) => data.ticker === ticker);

    const instrumentDetails = {
        ticker: instrument.ticker,
        name: instrument.name,
        bondTermsId: instrument.bondTermsId,

        ...bondTerm,

        latestData,
    };

    return <InstrumentDetails instrument={instrumentDetails} />;
};

const mapStateToProps = (state) => ({
    negotiableInstruments: state.byma.negotiableInstruments,
    bondTerms: state.byma.bondTerms,
    latestBymaStocksData: state.byma.latestBymaStocksData,
});

export default connect(mapStateToProps)(InstrumentDetailsSection);
