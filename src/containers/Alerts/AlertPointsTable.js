import { connect } from "react-redux";

import EnhancedTable from "../../containers/Table/EnhancedTable";
import { alertPointsSelector } from "../../selectors/byma.selector";

const rowsMetadata = [
    { id: "ticker", numeric: false, disablePadding: false, label: "Ticker" },
    { id: "points", numeric: true, disablePadding: false, label: "Points" },
];

const mapStateToProps = (state) => ({
    alertPoints: alertPointsSelector(state),
});

const AlertPointsTable = ({ alertPoints }) => (
    <div>
        <EnhancedTable rows={alertPoints} rowsMetadata={rowsMetadata} />
    </div>
);

const enhance = (pure) => connect(mapStateToProps, undefined)(pure);

export default enhance(AlertPointsTable);
