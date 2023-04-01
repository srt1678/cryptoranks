import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Dropdown from "react-bootstrap/Dropdown";
import CoinChartSearchBar from "./CoinChartSearchBar";
import CoinChartAlert from "./CoinChartAlert";
import { apiKey, singleCoinUrl } from "../../Api";
import {LineChart, PieChart, BarChart, DoughnutChart, PolarAreaChart, RadarChart} from './Chart/ChartOverview'

export const Comparison = () => {
    const [selectChartType, setSelectChartType] = useState("Line");
    const {
        displayCoinChartList,
        setDisplayCoinChartList,
        coinChartAlert,
        setCoinChartAlert,
        chartData,
        setChartData
    } = useContext(AppContext);
    const chartType = ["Line", "Pie", "Bar", "Doughnut", "Polar Area", "Radar"];

    const options = {
        headers: {
            "x-access-token": `${apiKey}`,
        },
    };

    let tempCoinsArray = [];
    const fetchChartData = async () => {
        await Promise.all(
            displayCoinChartList?.map(async(coinUuid) => {
                const response = await fetch(singleCoinUrl + coinUuid, options);
                const result = await response.json();
                tempCoinsArray.push(result.data.coin);
            })
        );
        setChartData(tempCoinsArray);
    }
    const chartToRender = () => {
        switch(selectChartType){
            case 'Line':
                return <LineChart/>;
            case 'Pie':
                return <PieChart/>;
            case 'Bar':
                return <BarChart/>;
            case 'Doughnut':
                return <DoughnutChart/>;
            case 'Polar Area':
                return <PolarAreaChart/>;
            case 'Radar':
                return <RadarChart/>;
            default:
                return (<div>Error</div>);
        }
    }

    useEffect(() => {
        fetchChartData();
    }, [displayCoinChartList])

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
                                onClick={() => setSelectChartType(singleChart)}
                            >
                                {singleChart}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
            {chartToRender()}
        </>
    );
};
