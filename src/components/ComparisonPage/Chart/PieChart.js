import React, { useState, useEffect} from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { color} from "./ChartOverview";

//get Coin
const PieChart = (props) => {
    const chartDataOverview = {
        labels: props.chartData.map((data) => data.name + `Price in USD`),
        datasets: [
            {
                label: props.chartData.name + `Price in USD`,
                data: props.chartData.map((data) => data.price),
                backgroundColor: color,
                borderColor: ["white"],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };
    const [coinChartData, setCoinChartData] = useState(chartDataOverview);
    useEffect(() => {
        setCoinChartData(chartDataOverview);
    }, [props.chartData]);
    return (
        <>
            <div className='pieChartContainer mx-5 mb-5 mt-3'>
                <Pie
                    data={coinChartData}
                    radius={50}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white',
                                    font: {
                                        size: 18
                                    }
                                }
                            }
                        }
                    }}
                ></Pie>
            </div>
        </>
    );
};

export default PieChart;
