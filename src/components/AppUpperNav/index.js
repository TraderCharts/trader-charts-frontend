import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { clearAuthSagaRequest } from "../../redux/sagas/actions/authentication.action";
import { changeShowSelectTicker } from "../../redux/actions/containers.action";
import { tickerIcons } from "../../constants/tickerIcons.js";

const AppBarWrapper = ({ appLeftNavWidth, ...other }) => <AppBar {...other} />;

const StyledAppBar = styled(AppBarWrapper)(({ theme, appLeftNavWidth }) => ({
  float: "right",
  zIndex: theme.zIndex.drawer - 1,
  width: `calc(100% - ${appLeftNavWidth}px)`,
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: 50,
  height: 50,
});

const StyledTitleContainer = styled("div")({
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
});

const StyledTypography = styled(Typography)({
  marginRight: "9em",
});

const StyledButton = styled(Button)({
  border: "1px solid lightblue",
});

const AppUpperNav = ({
  auth,
  selectedTickerCode,
  clearAuthSagaRequest,
  onChangeShowSelectTicker,
  appLeftNavWidth,
  negotiableInstruments,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    clearAuthSagaRequest();
    navigate("/login", { state: { referer: location } });
  };

  const picture = auth?.idTokenPayload?.picture;
  const selectedTicker = negotiableInstruments.find(
    (elem) => elem.ticker === selectedTickerCode
  );

  return (
    <StyledAppBar position="fixed" appLeftNavWidth={appLeftNavWidth}>
      <StyledToolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <StyledTitleContainer>
          <StyledTypography variant="subtitle1" color="inherit">
            Trader Charts
          </StyledTypography>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => onChangeShowSelectTicker(true)}
            startIcon={tickerIcons[selectedTicker?.icon]}
          >
            {selectedTicker?.name}
          </StyledButton>
        </StyledTitleContainer>
        <div>
          <IconButton
            aria-owns={anchorEl ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {picture ? <Avatar src={picture} /> : <AccountCircle />}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate("profile")}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Show Message</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  user: state.authentication.user,
  selectedTickerCode: state.containers.selectedTickerCode,
  negotiableInstruments: state.byma.negotiableInstruments,
});

const mapActionsToProps = (dispatch) => ({
  clearAuthSagaRequest: () => dispatch(clearAuthSagaRequest()),
  onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(AppUpperNav);
