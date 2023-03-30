import React from "react";
import { useEffect, useContext, useState } from "react";
import { Line } from "react-chartjs-2";

const CryptoDetailChart = (props) => {
    const [coinChartData, setCoinChartData] = useState({
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
    });

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
                                    color: 'rgba(98, 98, 98, 0.8)'
                                }
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

/*
    const options = {
        headers: {
            "x-access-token": apiKey,
        },
    };
    fetch(`https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history`, options)
        .then((response) => response.json())
        .then((result) => console.log("Get coin price history 24h: ", result.data));
    fetch(
        `https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history?timePeriod=1y`,
        options
    )
        .then((response) => response.json())
        .then((result) => console.log("Get coin price history 1y: ", result.data));
    */
export default CryptoDetailChart;
