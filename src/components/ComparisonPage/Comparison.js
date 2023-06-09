import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Dropdown from "react-bootstrap/Dropdown";
import CoinChartSearchBar from "./CoinChartSearchBar";
import CoinChartAlert from "./CoinChartAlert";
import { singleCoinUrl, options } from "../../Api";
import {
    LineChart,
    PieChart,
    BarChart,
    DoughnutChart,
    PolarAreaChart,
} from "./Chart/ChartOverview";
import { Button } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Comparison = () => {
    const [selectChartType, setSelectChartType] = useState("Line");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const {
        coinChartAlert,
        displayCoinChartList,
        setDisplayCoinChartList,
        chartDataPriceHistory,
        setChartDataPriceHistory,
        chartData,
        setChartData,
    } = useContext(AppContext);
    const chartType = ["Line", "Pie", "Bar", "Doughnut", "Polar Area"];

    let priceHistoryMap = new Map();
    let tempPriceHistory = [];
    let coinOverallMap = new Map();
    let tempCoinOverall = [];
    const fetchPriceHistoryData = async () => {
        await Promise.all(
            displayCoinChartList?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid + "/history",
                    options
                );
                const result = await response.json();
                priceHistoryMap.set(singleCoin.uuid, result.data.history);
            })
        );
        displayCoinChartList.map((singleCoin) => {
            tempPriceHistory.push(priceHistoryMap.get(singleCoin.uuid));
        })
        setChartDataPriceHistory(tempPriceHistory);
        setIsLoading(false);
    };
    const fetchCoinOverallData = async () => {
        await Promise.all(
            displayCoinChartList?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid,
                    options
                );
                const result = await response.json();
                coinOverallMap.set(singleCoin.uuid, result.data.coin);
            })
        );
        displayCoinChartList.map((singleCoin) => {
            tempCoinOverall.push(coinOverallMap.get(singleCoin.uuid));
        })
        setChartData(tempCoinOverall);
        setIsLoading2(false);
    };
    useEffect(() => {
        fetchPriceHistoryData();
        fetchCoinOverallData();
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
                return (
                    <PieChart
                        displayCoinChartList={displayCoinChartList}
                        chartData={chartData}
                    />
                );
            case "Bar":
                return (
                    <BarChart
                        displayCoinChartList={displayCoinChartList}
                        chartDataPriceHistory={chartDataPriceHistory}
                    />
                );
            case "Doughnut":
                return (
                    <DoughnutChart
                        displayCoinChartList={displayCoinChartList}
                        chartData={chartData}
                    />
                );
            case "Polar Area":
                return (
                    <PolarAreaChart
                        displayCoinChartList={displayCoinChartList}
                        chartData={chartData}
                    />
                );
            default:
                return <div>Error</div>;
        }
    };

    const removeCoin = (uuid) => {
        const updateCoinList = displayCoinChartList.filter(
            (singleCoin) => singleCoin.uuid !== uuid
        );
        setDisplayCoinChartList(updateCoinList);
    };

    if (isLoading || isLoading2) {
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
            {displayCoinChartList.length === 0 ? (
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="my-5 ms-5"
                >
                    <h1>Please search and add coins to display chart</h1>
                </div>
            ) : (
                <>
                    <Container>
                        <Row>
                            <Col xl={2} className='mb-2'>
                                <Dropdown>
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
                                                        singleChart ===
                                                        selectChartType
                                                            ? true
                                                            : false
                                                    }
                                                    key={singleChart}
                                                    onClick={() =>
                                                        setSelectChartType(
                                                            singleChart
                                                        )
                                                    }
                                                >
                                                    {singleChart}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xl={10} className='mb-2'>
                                <div style={{ display: "inline-block" }}>
                                    {displayCoinChartList.map((singleCoin) => {
                                        return (
                                            <Button
                                                className='mb-2'
                                                variant="secondary"
                                                key={singleCoin.name}
                                                style={{ marginRight: "2rem" }}
                                                onClick={() =>
                                                    removeCoin(singleCoin.uuid)
                                                }
                                            >
                                                <XCircleFill
                                                    className="me-2 mb-1"
                                                    size={20}
                                                />
                                                {singleCoin.name}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {chartToRender()}
                </>
            )}
        </>
    );
};
