import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    Box,
    Divider,
    alpha,
    IconButton,
    Tooltip,
    InputBase,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import webAuth0 from "application/webAuth0";
import { tickerIcons } from "../../constants/tickerIcons.js";
import { changeShowSelectTicker } from "../../redux/actions/containers.action";
import { clearAuthSagaRequest } from "../../redux/sagas/actions/authentication.action";

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "appLeftNavWidth",
})(({ theme, appLeftNavWidth }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundImage: "none",
    boxShadow: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
    zIndex: theme.zIndex.drawer - 1,
    width: `calc(100% - ${appLeftNavWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const StyledToolbar = styled(Toolbar)({
    minHeight: 64,
    height: 64,
    padding: "0 16px",
    justifyContent: "space-between",
});

const ToolbarGroup = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 0,
    height: "100%",
});

const Separator = styled(Box)(({ theme }) => ({
    width: 1,
    height: 32,
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    margin: "0 12px",
}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
    width: 48,
    height: 48,
    padding: 0,
    color: alpha(theme.palette.common.white, 0.8),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
}));

const LogoText = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: "1.5rem",
    letterSpacing: "-0.3px",
    color: theme.palette.common.white,
    marginLeft: 12,
    marginRight: 12,
}));

// Componente de búsqueda con fondo gris neutro
const SymbolSearchContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4a4a4a", // Gris neutro oscuro
    borderRadius: 32,
    height: 48,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: "#3a3a3a", // Gris un poco más claro al hover
    },
}));

const SymbolInput = styled(InputBase)(({ theme }) => ({
    padding: "0 8px",
    fontSize: "15px",
    fontWeight: 500,
    color: theme.palette.common.white,
    whiteSpace: "nowrap",
    "& .MuiInputBase-input": {
        padding: "12px 0",
        whiteSpace: "nowrap",
        overflow: "visible",
        textOverflow: "clip",
        width: "auto",
        "&::placeholder": {
            color: alpha(theme.palette.common.white, 0.6),
            opacity: 1,
        },
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    marginLeft: 8,
    borderRadius: "50%",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    color: theme.palette.common.white,
    fontSize: 18,
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: "50%",
    color: alpha(theme.palette.common.white, 0.7),
}));

// Botones de intervalo mejorados
const IntervalButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
    minWidth: 56,
    padding: "0 20px",
    height: 40,
    borderRadius: 8,
    color: active ? theme.palette.common.white : alpha(theme.palette.common.white, 0.7),
    textTransform: "uppercase",
    fontSize: "18px",
    fontWeight: active ? 700 : 500,
    letterSpacing: "0.3px",
    backgroundColor: active ? alpha(theme.palette.common.white, 0.2) : "transparent",
    transition: "all 0.2s ease",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        color: theme.palette.common.white,
    },
}));

const UserButton = styled(IconButton)(({ theme }) => ({
    padding: 4,
    marginLeft: 8,
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
}));

const StyledAvatar = styled(Avatar)({
    width: 44,
    height: 44,
});

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 4,
        minWidth: 200,
        marginTop: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: "14px",
    padding: "10px 20px",
    gap: 8,
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
}));

const AppUpperNav = ({
    auth,
    selectedTicker,
    clearAuthSagaRequest,
    onChangeShowSelectTicker,
    appLeftNavWidth,
    negotiableInstruments,
    onChangeInterval,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        clearAuthSagaRequest();
        webAuth0.logout();
    };
    const [selectedInterval, setSelectedInterval] = useState("D");

    const handleIntervalClick = (interval) => {
        setSelectedInterval(interval);

        if (onChangeInterval) {
            onChangeInterval({ interval });
        }
    };

    const picture = auth?.idTokenPayload?.picture;
    const userName = auth?.idTokenPayload?.name || auth?.idTokenPayload?.email;
    const negotiableInstrument = negotiableInstruments.find(
        (elem) => elem.ticker === selectedTicker.code
    );

    const intervals = [
        { value: "D", label: "D", tooltip: "Day" },
        { value: "W", label: "W", tooltip: "Week" },
        { value: "M", label: "M", tooltip: "Month" },
    ];

    const symbolName = negotiableInstrument?.name || "Select Symbol";
    const symbolIcon = tickerIcons[negotiableInstrument?.icon];

    return (
        <StyledAppBar position="fixed" appLeftNavWidth={appLeftNavWidth}>
            <StyledToolbar>
                <ToolbarGroup>
                    <MenuIconButton edge="start" aria-label="Menu">
                        <MenuIcon sx={{ fontSize: 28 }} />
                    </MenuIconButton>

                    <LogoText variant="h6">Trader Charts</LogoText>

                    <Separator />

                    <Tooltip title="Search Symbol" arrow placement="bottom">
                        <SymbolSearchContainer onClick={() => onChangeShowSelectTicker(true)}>
                            {symbolIcon && (
                                <IconWrapper>
                                    <Box component="span" sx={{ display: "flex", fontSize: 18 }}>
                                        {symbolIcon}
                                    </Box>
                                </IconWrapper>
                            )}
                            <SymbolInput
                                value={symbolName}
                                placeholder="Select Symbol"
                                readOnly
                                inputProps={{
                                    readOnly: true,
                                    style: {
                                        width: "auto",
                                        minWidth: symbolName.length > 30 ? "400px" : "auto",
                                    },
                                }}
                                sx={{
                                    flex: symbolName.length > 30 ? "0 0 auto" : 1,
                                }}
                            />
                            <SearchIconWrapper>
                                <SearchIcon sx={{ fontSize: 18 }} />
                            </SearchIconWrapper>
                        </SymbolSearchContainer>
                    </Tooltip>

                    <Separator />

                    {intervals.map((interval) => (
                        <Tooltip
                            key={interval.value}
                            title={`1 ${interval.tooltip}`}
                            arrow
                            placement="bottom"
                        >
                            <IntervalButton
                                active={selectedInterval === interval.value}
                                onClick={() => handleIntervalClick(interval.value)}
                            >
                                {interval.label}
                            </IntervalButton>
                        </Tooltip>
                    ))}
                </ToolbarGroup>

                <ToolbarGroup>
                    <Tooltip title={userName || "Account"} arrow placement="bottom">
                        <UserButton onClick={handleMenu}>
                            {picture ? (
                                <StyledAvatar src={picture} />
                            ) : (
                                <AccountCircle sx={{ fontSize: 44 }} />
                            )}
                        </UserButton>
                    </Tooltip>

                    <StyledMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        {userName && (
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Signed in as
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    noWrap
                                    sx={{ mt: 0.5 }}
                                >
                                    {userName}
                                </Typography>
                            </Box>
                        )}
                        <Divider />
                        <StyledMenuItem
                            onClick={() => {
                                handleClose();
                                navigate("profile");
                            }}
                        >
                            Profile
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}>Show Message</StyledMenuItem>
                        <Divider />
                        <StyledMenuItem onClick={handleLogout}>Log Out</StyledMenuItem>
                    </StyledMenu>
                </ToolbarGroup>
            </StyledToolbar>
        </StyledAppBar>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
    user: state.authentication.user,
    selectedTicker: state.containers.selectedTicker,
    negotiableInstruments: state.byma.negotiableInstruments,
});

const mapActionsToProps = (dispatch) => ({
    clearAuthSagaRequest: () => dispatch(clearAuthSagaRequest()),
    onChangeShowSelectTicker: (value) => dispatch(changeShowSelectTicker(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(AppUpperNav);
