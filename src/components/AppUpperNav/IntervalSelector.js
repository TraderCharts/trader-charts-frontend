import { Button, Tooltip } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";

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

const IntervalSelector = ({ onChangeInterval }) => {
    const [selectedInterval, setSelectedInterval] = useState("D");

    const intervals = [
        { value: "D", label: "D", tooltip: "Day" },
        { value: "W", label: "W", tooltip: "Week" },
        { value: "M", label: "M", tooltip: "Month" },
    ];

    const handleClick = (interval) => {
        setSelectedInterval(interval);

        if (onChangeInterval) {
            onChangeInterval(interval);
        }
    };

    return (
        <>
            {intervals.map((interval) => (
                <Tooltip
                    key={interval.value}
                    title={`1 ${interval.tooltip}`}
                    arrow
                    placement="bottom"
                >
                    <IntervalButton
                        active={selectedInterval === interval.value}
                        onClick={() => handleClick(interval.value)}
                    >
                        {interval.label}
                    </IntervalButton>
                </Tooltip>
            ))}
        </>
    );
};

export default IntervalSelector;
