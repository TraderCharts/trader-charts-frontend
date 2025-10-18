import {List, ListItem, ListItemIcon, Divider, Drawer, Box} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Alerts from '../../components/AppLeftNav/Alerts';
import Charts from '../../components/AppLeftNav/Charts';
import {changeShowAddIndicator} from '../../redux/actions/containers.action';
import EquidistantChannelIcon from '../../resources/images/EquidistantChannelIcon';
import ExtendLineIcon from '../../resources/images/ExtendLineIcon';
import FibonacciSeriesIcon from '../../resources/images/FibonacciSeriesIcon';
import GannFanIcon from '../../resources/images/GannFanIcon';
import IndicatorsIcon from '../../resources/images/IndicatorsIcon';
import RayLineIcon from '../../resources/images/RayLineIcon';
import TrendLineIcon from '../../resources/images/TrendLineIcon';
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from '@mui/material/ListItemButton';

const AppLeftNav = ({
                        setEnableInteractiveObject,
                        enableInteractiveObject,
                        showAddIndicator,
                        onChangeShowAddIndicator,
                        appLeftNavWidth
                    }) => {
    const location = useLocation();
    const [enableChart, setEnableChart] = useState(['charts', ''].includes(location.pathname.split('/')[1]));
    const [enableAlarms, setEnableAlarms] = useState(location.pathname.split('/')[1] === 'alerts');

    const onSelectInteractiveObjectButton = interactiveObject => {
        setEnableAlarms(false);
        setEnableInteractiveObject(interactiveObject);
    };

    const renderLeftButtons = () => (
        <Box>
            {[
                {key: 'TrendLine', icon: <TrendLineIcon/>},
                {key: 'ExtendLine', icon: <ExtendLineIcon/>},
                {key: 'Ray', icon: <RayLineIcon/>},
                {key: 'FibonacciRetracement', icon: <FibonacciSeriesIcon/>},
                {key: 'EquidistantChannel', icon: <EquidistantChannelIcon/>},
                {key: 'GannFan', icon: <GannFanIcon/>},
            ].map(item => (
                <ListItemButton
                    key={item.key}
                    selected={enableInteractiveObject === item.key}
                    disabled={enableAlarms}
                    onClick={() => onSelectInteractiveObjectButton(item.key)}
                    sx={{justifyContent: 'center'}}
                >
                    <ListItemIcon sx={{width: 32, height: 32, transform: 'scale(1.2)', minWidth: 'unset'}}>
                        {item.icon}
                    </ListItemIcon>
                </ListItemButton>
            ))}
            <ListItemButton
                onClick={() => {
                    onSelectInteractiveObjectButton(undefined);
                    onChangeShowAddIndicator(true);
                }}
                selected={showAddIndicator}
                disabled={enableAlarms}
                sx={{justifyContent: 'center'}}
            >
                <ListItemIcon sx={{width: 32, height: 32, transform: 'scale(1.2)', minWidth: 'unset'}}>
                    <IndicatorsIcon/>
                </ListItemIcon>
            </ListItemButton>
        </Box>
    );

    return (
        <Drawer variant="permanent"
                sx={{
                    width: appLeftNavWidth,
                    '& .MuiDrawer-paper': {
                        width: appLeftNavWidth,
                        boxSizing: 'border-box',
                    },
                }}>
            <Toolbar/>
            <Divider/>
            <List>{renderLeftButtons()}</List>
            <Divider/>
            <List>
                <Charts
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableAlarms(false);
                        setEnableChart(true);
                    }}
                    selected={enableChart}
                />
                <Alerts
                    onClick={() => {
                        setEnableInteractiveObject(undefined);
                        setEnableChart(false);
                        setEnableAlarms(true);
                    }}
                    selected={enableAlarms}
                />
            </List>
        </Drawer>
    );
};

AppLeftNav.propTypes = {
    setEnableInteractiveObject: PropTypes.func.isRequired,
    enableInteractiveObject: PropTypes.string,
    showAddIndicator: PropTypes.bool.isRequired,
    onChangeShowAddIndicator: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    showAddIndicator: state.containers.showAddIndicator
});

const mapActionsToProps = dispatch => ({
    onChangeShowAddIndicator: value => dispatch(changeShowAddIndicator(value))
});

export default connect(mapStateToProps, mapActionsToProps)(AppLeftNav);
