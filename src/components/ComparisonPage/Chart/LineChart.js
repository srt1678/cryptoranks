import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {color} from './ChartOverview'

const LineChart = (props) => {
    let tempData = [];
    props.chartDataPriceHistory?.map((entry, index) => {
        tempData.push({
            label: props.displayCoinChartList[index].name + ` Price in USD`,
            data: entry.reverse().map((data) => data.price),
            backgroundColor: color[index],
            fill: false,
            borderColor: color[index],
            pointHoverRadius: 5,
            pointHoverBackgroundColor: ["white"],
            xAxisID: "x1",
            yAxisID: "y1",
        });
    });

    const chartDataOverview = {
        labels: props.chartDataPriceHistory[0]?.map((data) => {
            let date = new Date(data.timestamp * 1000);
            let resultFormat =
                date.toISOString().split("T")[0] +
                " " +
                date.toISOString().split("T")[1].substring(0, 5);
            return resultFormat;
        }),
        datasets: tempData,
    };
    const [coinChartData, setCoinChartData] = useState(chartDataOverview);

    useEffect(() => {
        setCoinChartData(chartDataOverview);
        console.log("chartDataPriceHistory", props.chartDataPriceHistory);
    }, [props.chartDataPriceHistory]);

    return (
        <>
            <div className="cryptoDetailChartContainer mt-3 mb-5">
                <Line
                    data={coinChartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "white",
                                    font: {
                                        size: 18,
                                    },
                                }
                            },
                        },
                        scales: {
                            x1: {
                                ticks: {
                                    color: "white",
                                },
                            },
                            y1: {
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    color: "rgba(98, 98, 98, 0.8)",
                                },
                            },
                        },
                    }}
                ></Line>
            </div>
        </>
    );
};

export default LineChart;

