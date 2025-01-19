import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const data = {
    labels: ["Groceries", "Utilities", "Car", "Payments", "iTunes", "House", "Wardrobe", "Food"],
    datasets: [
      {
        data: [29, 16, 14, 12, 10, 8, 6, 5],
        backgroundColor: ["#f39c12", "#3498db", "#1abc9c", "#9b59b6", "#e74c3c", "#27ae60", "#f1c40f", "#95a5a6"],
        hoverBackgroundColor: ["#f1c40f", "#5dade2", "#48c9b0", "#af7ac5", "#ec7063", "#2ecc71", "#f7dc6f", "#bdc3c7"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div style={{ width: "50%", maxWidth: "400px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
