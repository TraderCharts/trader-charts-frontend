import React from "react";
import Charts from "../../components/AppLeftNav/Charts";
import Alerts from "../../components/AppLeftNav/Alerts";
import TrendingNews from "../../components/AppLeftNav/TrendingNews";
import KairosAI from "../../components/AppLeftNav/KairosAI";

const NavigationSection = ({
    enableChart,
    enableAlarms,
    selectedOption,
    onSelectChart,
    onSelectAlerts,
    onSelectTrendingNews,
    onSelectKairosAI,
}) => {
    return (
        <>
            <Charts onClick={onSelectChart} selected={enableChart} />
            <Alerts onClick={onSelectAlerts} selected={enableAlarms} />
            <TrendingNews
                onClick={onSelectTrendingNews}
                selected={selectedOption === "trendingNews"}
            />
            <KairosAI onClick={onSelectKairosAI} selected={selectedOption === "KairosAI"} />
        </>
    );
};

export default NavigationSection;
