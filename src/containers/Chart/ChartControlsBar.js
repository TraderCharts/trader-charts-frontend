import React, { useState } from "react";
import { Box, Divider, ButtonBase, Tooltip, styled, Paper, alpha, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import TimelineIcon from "@mui/icons-material/Timeline";
import FunctionsIcon from "@mui/icons-material/Functions";
import ShowChartIcon from "@mui/icons-material/ShowChart";

// Modern container with glassmorphism effect
const StyledBar = styled(Paper)(({ theme }) => ({
    height: "28px",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:
        theme.palette.mode === "dark" ? alpha(theme.palette.background.paper, 0.95) : "#ffffff",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    userSelect: "none",
    fontFamily: theme.typography.fontFamily,
    borderTop: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.appBar,
    borderRadius: 0,
    boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.05)",
    padding: "0 16px",
}));

// Modern button with enhanced hover effects
const ControlButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => prop !== "active" && prop !== "variant",
})(({ theme, active, variant }) => ({
    height: "28px",
    padding: "0 12px",
    fontSize: "12px",
    fontFamily: "inherit",
    fontWeight: 500,
    borderRadius: "6px",
    position: "relative",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

    // Active state styling
    ...(active && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    }),

    // Inactive state styling
    ...(!active && {
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: alpha(theme.palette.action.hover, 0.8),
            color: theme.palette.text.primary,
        },
    }),

    // Icon variant styling
    ...(variant === "icon" && {
        minWidth: "32px",
        padding: "0 8px",
    }),

    "&:active": {
        transform: "scale(0.98)",
    },
}));

// Section divider with gradient effect
const SectionDivider = styled(Divider)(({ theme }) => ({
    height: "20px",
    margin: "0 8px",
    borderColor: theme.palette.divider,
}));

// Modern clock component
const ModernClock = () => {
    const [time, setTime] = useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            sx={{
                px: 1.5,
                display: "flex",
                alignItems: "baseline",
                gap: 0.5,
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    color: "text.primary",
                }}
            >
                {time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    fontSize: "9px",
                    fontWeight: 400,
                    color: "text.secondary",
                    textTransform: "uppercase",
                }}
            >
                UTC
            </Typography>
        </Box>
    );
};

// Time range buttons component (expandable for future features)

const TimeRanges = ({ activeRange, onRangeChange }) => {
    const ranges = ["1M", "3M", "6M", "1Y", "5Y", "ALL"];

    return (
        <Box sx={{ display: "flex", gap: 0.5 }}>
            {ranges.map((range) => (
                <ControlButton
                    key={range}
                    active={activeRange === range}
                    onClick={() => onRangeChange(range)}
                >
                    {range}
                </ControlButton>
            ))}
        </Box>
    );
};

// Scale controls with Linear and Log options
const YScaleControls = ({ yScale, onYScaleChange }) => {
    const scales = [
        {
            id: "linear",
            label: "Linear",
            icon: ShowChartIcon,
            tooltip: "Linear scale (arithmetic)",
        },
        { id: "log", label: "Log", icon: FunctionsIcon, tooltip: "Logarithmic scale" },
    ];

    return (
        <Box sx={{ display: "flex", gap: 0.5 }}>
            {scales.map(({ id, label, icon: Icon, tooltip }) => (
                <Tooltip key={id} title={tooltip} arrow placement="top">
                    <ControlButton
                        active={yScale === id}
                        onClick={() => onYScaleChange(id)}
                        sx={{ gap: 0.5 }}
                    >
                        <Icon sx={{ fontSize: 14 }} />
                        <Typography component="span" sx={{ ml: 0.5 }}>
                            {label}
                        </Typography>
                    </ControlButton>
                </Tooltip>
            ))}
        </Box>
    );
};

const ChartControlsBar = ({ yScale, onYScaleChange, timeRange, onTimeRangeChange }) => {
    return (
        <StyledBar elevation={0}>
            {/* LEFT SECTION: Time ranges and tools */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <TimeRanges activeRange={timeRange} onRangeChange={onTimeRangeChange} />

                <SectionDivider orientation="vertical" flexItem />

                <Tooltip title="Toggle timeline" arrow placement="top">
                    <ControlButton variant="icon">
                        <TimelineIcon sx={{ fontSize: 18 }} />
                    </ControlButton>
                </Tooltip>

                <Tooltip title="Fullscreen" arrow placement="top">
                    <ControlButton variant="icon">
                        <FullscreenIcon sx={{ fontSize: 18 }} />
                    </ControlButton>
                </Tooltip>
            </Box>

            {/* RIGHT SECTION: Clock and scale controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ModernClock />

                <SectionDivider orientation="vertical" flexItem />

                <YScaleControls yScale={yScale} onYScaleChange={onYScaleChange} />

                <SectionDivider orientation="vertical" flexItem />

                <Tooltip title="Settings" arrow placement="top">
                    <ControlButton variant="icon">
                        <SettingsIcon sx={{ fontSize: 18 }} />
                    </ControlButton>
                </Tooltip>
            </Box>
        </StyledBar>
    );
};

export default ChartControlsBar;
