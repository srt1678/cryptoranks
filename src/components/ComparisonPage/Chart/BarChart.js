import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { color } from "./ChartOverview";

const BarChart = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    let tempData = [];

    const tempSetPriceHistory = () => {
        props.chartDataPriceHistory
            .map((entry, index) => {
                tempData.push({
                    label:
                        props.displayCoinChartList[index].name +
                        ` Price in USD`,
                    data: entry
                        .slice()
                        .reverse()
                        .map((data, index) => {
                            if (index % 10 === 0) {
                                return data.price;
                            } else {
                                return null;
                            }
                        }),
                    backgroundColor: color[index],
                    xAxisID: "x1",
                    yAxisID: "y1",
                });
            });
        setIsLoading(false);
    };
    const chartDataOverview = {
        labels: props.chartDataPriceHistory[0]
            ?.slice()
            .reverse()
            .map((data, index) => {
                if (index % 10 === 0) {
                    let date = new Date(data.timestamp * 1000);
                    let resultFormat =
                        date.toISOString().split("T")[0] +
                        " " +
                        date.toISOString().split("T")[1].substring(0, 5);
                    return resultFormat;
                }
            }),
        datasets: tempData,
    };

    const [coinChartData, setCoinChartData] = useState(chartDataOverview);
    useEffect(() => {
        tempSetPriceHistory();
        setCoinChartData(chartDataOverview);
        console.log('displayCoinChartList ', props.displayCoinChartList)
        console.log('chartDataPriceHistory ', props.chartDataPriceHistory)
    }, [props.chartDataPriceHistory]);

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
            <div className="cryptoDetailChartContainer mt-3 mb-5">
                <Bar
                    className=""
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
                                },
                            },
                        },
                        clip: false,
                        scales: {
                            x1: {
                                ticks: {
                                    color: "white",
                                },
                            },
                            y1: {
                                ticks: {
                                    color: "white",
                                    padding: 9,
                                    crossAlign: "start",
                                },
                                grid: {
                                    color: "rgba(98, 98, 98, 0.8)",
                                }
                            },
                        },
                        layout: {
                            padding: {
                                right: 15,
                                
                            },
                        },
                    }}
                ></Bar>
            </div>
        </>
    );
};

export default BarChart;
