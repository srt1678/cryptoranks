import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Dropdown from "react-bootstrap/Dropdown";
import CoinChartSearchBar from "./CoinChartSearchBar";
import CoinChartAlert from "./CoinChartAlert";
import { apiKey, singleCoinUrl } from "../../Api";
import {
    LineChart,
    PieChart,
    BarChart,
    DoughnutChart,
    PolarAreaChart,
    RadarChart,
} from "./Chart/ChartOverview";

export const Comparison = () => {
    const [selectChartType, setSelectChartType] = useState("Line");
    const [isLoading, setIsLoading] = useState(true);
    const {
        coinChartAlert,
        displayCoinChartList,
        chartDataPriceHistory,
        setChartDataPriceHistory,
    } = useContext(AppContext);
    const chartType = ["Line", "Pie", "Bar", "Doughnut", "Polar Area", "Radar"];
    console.log("displayCoinChartList: ", displayCoinChartList);
    const options = {
        headers: {
            "x-access-token": apiKey,
        },
    };

    let tempPriceHistory = [];
    const fetchPriceHistoryData = async () => {
        await Promise.all(
            displayCoinChartList?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid + "/history",
                    options
                );
                const result = await response.json();
                tempPriceHistory.push(result.data.history);
            })
        );
        setChartDataPriceHistory(tempPriceHistory);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchPriceHistoryData();
        console.log("chartDataPriceHistory: ", chartDataPriceHistory);
    }, [displayCoinChartList]);

    const chartToRender = () => {
        switch (selectChartType) {
            case "Line":
                return (
                    <LineChart
                        displayCoinChartList={displayCoinChartList}
                        chartDataPriceHistory={chartDataPriceHistory}
                    />
                );
            case "Pie":
                return <PieChart />;
            case "Bar":
                return <BarChart />;
            case "Doughnut":
                return <DoughnutChart />;
            case "Polar Area":
                return <PolarAreaChart />;
            case "Radar":
                return <RadarChart />;
            default:
                return <div>Error</div>;
        }
    };
    if (isLoading) {
        return (
            <div
                style={{ display: "flex", justifyContent: "center" }}
                className="my-5"
            >
                <h1>Now Loading...</h1>
            </div>
        );
    }
    return (
        <>
            {coinChartAlert ? <CoinChartAlert /> : null}
            <CoinChartSearchBar />
            <Dropdown style={{ marginLeft: "11rem" }}>
                        <Dropdown.Toggle
                            id="dropdown-button-dark-example1"
                            variant="secondary"
                        >
                            Chart Type: {selectChartType}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            {chartType.map((singleChart) => {
                                return (
                                    <Dropdown.Item
                                        disabled={
                                            singleChart === selectChartType
                                                ? true
                                                : false
                                        }
                                        key={singleChart}
                                        onClick={() =>
                                            setSelectChartType(singleChart)
                                        }
                                    >
                                        {singleChart}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
            {displayCoinChartList.length === 0 ? (
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="my-5"
                >
                    <h1>Please search and add coins to display chart</h1>
                </div>
            ) : (
                <>
                {/*
                    <Dropdown style={{ marginLeft: "11rem" }}>
                        <Dropdown.Toggle
                            id="dropdown-button-dark-example1"
                            variant="secondary"
                        >
                            Chart Type: {selectChartType}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            {chartType.map((singleChart) => {
                                return (
                                    <Dropdown.Item
                                        disabled={
                                            singleChart === selectChartType
                                                ? true
                                                : false
                                        }
                                        key={singleChart}
                                        onClick={() =>
                                            setSelectChartType(singleChart)
                                        }
                                    >
                                        {singleChart}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                */}
                    {chartToRender()}
                </>
            )}
        </>
    );
};
