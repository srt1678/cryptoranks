import React from "react";
import { useEffect, useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const CryptoDetailChart = (props) => {
    const chartDataOverview = {
        labels: props.coinHistoryData.reverse().map((data) => {
            let date = new Date(data.timestamp * 1000);
            let resultFormat =
                date.toISOString().split("T")[0] +
                " " +
                date.toISOString().split("T")[1].substring(0, 5);
            return resultFormat;
        }),
        datasets: [
            {
                label: props.coinName + ` Price in USD`,
                data: props.coinHistoryData.map((data) => data.price),
                backgroundColor: ["white"],
                fill: false,
                borderColor: ["white"],
                pointHoverRadius: 7,
                pointHoverBackgroundColor: ["purple"],
                xAxisID: "x1",
                yAxisID: "y1",
            },
        ],
    };

    const [coinChartData, setCoinChartData] = useState(chartDataOverview);

    useEffect(() => {
        setCoinChartData(chartDataOverview);
    }, [props.coinHistoryData]);

    if (coinChartData.length === 0) {
        return <div>Now Loading Chart</div>;
    }
    return (
        <>
            <div className="cryptoDetailChartContainer">
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
                                },
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
                />
            </div>
        </>
    );
};

export default CryptoDetailChart;
