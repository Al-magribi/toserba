import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef(null);

  const getSevenDays = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().slice(0, 10);
      dates.push(formattedDate);
    }
    return dates;
  };

  const dailyProfit = [650000, 5900000, 8000000, 81000, 56000, 550000, 4000000];

  const profits = dailyProfit.map((profit) => parseFloat(profit));

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    let chartInstance = null;

    if (chartRef.current && chartRef.current.chart) {
      // Destroy previous chart instance if exists
      chartRef.current.chart.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: getSevenDays(),
        datasets: [
          {
            label: "Laporan Pendapatan Mingguan",
            data: profits,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });

    // Store the chart instance in the ref
    chartRef.current.chart = chartInstance;
  }, []);

  return <canvas ref={chartRef} style={{ width: "100px", height: "90px" }} />;
};

export default LineChart;
