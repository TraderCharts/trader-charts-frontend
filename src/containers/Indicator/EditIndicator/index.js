import React, {useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, Tab, Tabs} from "@mui/material";
import Divider from "@mui/material/Divider";
import {changeShowEditIndicator} from "../../../redux/actions/containers.action";
import {editIndicatorMetadata} from "../../../redux/actionDefinitions/indicators.actionDefinitions";
import TabContainer from "./TabContainer";
import InputsTab from "./InputsTab";
import StylesTab from "./StylesTab";

const mapStateToProps = state => ({
    showEditIndicator: state.containers.showEditIndicator
});

const mapActionsToProps = dispatch => ({
    onChangeShowEditIndicator: value => dispatch(changeShowEditIndicator(value)),
    onEditIndicatorMetadata: () => dispatch(editIndicatorMetadata())
});

const EditIndicator = ({
                           showEditIndicator = false,
                           onChangeShowEditIndicator,
                           onEditIndicatorMetadata
                       }) => {
    const [tabValue, setTabValue] = useState(0);

    const onClose = () => {
        onChangeShowEditIndicator(false);
        onEditIndicatorMetadata();
    };
    const onChange = (event, value) => {
        setTabValue(value);
    };

    return (
        <Dialog open={showEditIndicator} onClose={onClose}>
            <DialogTitle>Indicators</DialogTitle>
            <Divider/>
            <div>
                <Tabs value={tabValue} onChange={onChange}>
                    <Tab label="Inputs"/>
                    <Tab label="Styles"/>
                </Tabs>
                {tabValue === 0 && (
                    <TabContainer>
                        <InputsTab/>
                    </TabContainer>
                )}
                {tabValue === 1 && (
                    <TabContainer>
                        <StylesTab/>
                    </TabContainer>
                )}
            </div>
        </Dialog>
    );
};

EditIndicator.propTypes = {
    onChangeShowEditIndicator: PropTypes.func.isRequired,
    onEditIndicatorMetadata: PropTypes.func.isRequired
};

const enhance = pure =>
    connect(
        mapStateToProps,
        mapActionsToProps
    )(pure);
export default enhance(EditIndicator);
