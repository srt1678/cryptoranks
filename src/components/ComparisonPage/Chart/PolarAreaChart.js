import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { color2 } from "./ChartOverview";

//get Coin
const PolarAreaChart = (props) => {
    const chartDataOverview = {
        labels: props.chartData.map((data) => data.name + ` Price in USD`),
        datasets: [
            {
                label: props.chartData.name + `Price in USD`,
                data: props.chartData.map((data) => data.price),
                backgroundColor: color2,
                borderColor: ["white"],
                borderWidth: 2,
                hoverOffset: 4,
                rAxisID: 'r'
            },
        ],
    };
    const [coinChartData, setCoinChartData] = useState(chartDataOverview);
    useEffect(() => {
        setCoinChartData(chartDataOverview);
    }, [props.chartData]);
    return (
        <>
            <div className="pieChartContainer mx-5 mb-5 mt-3">
                <PolarArea
                    data={coinChartData}
                    radius={50}
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
                        scales:{
                            r:{
                                ticks:{
                                    color: 'white',
                                    font:{
                                        size: 18
                                    },
                                    backdropColor: 'rgb(19, 27, 34)'
                                },
                                grid:{
                                    color: 'rgb(168, 164, 164)'
                                }
                            }
                        }
                    }}
                ></PolarArea>
            </div>
        </>
    );
};

export default PolarAreaChart;
