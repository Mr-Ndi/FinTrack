import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import './BudgetGraph.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetData {
  category: string;
  amount: number;
}

const BudgetGraph: React.FC = () => {
  const [budgetData, setBudgetData] = useState<BudgetData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      setError("");
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Token is missing");

    
      const budgetsResponse = await axiosInstance.get("/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });

    
      const categoriesResponse = await axiosInstance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

    
      const budgets = budgetsResponse.data.budgets || [];
      const categories = categoriesResponse.data.categories || [];

      const combinedData = budgets.map((budget: any) => {
        const category = categories.find(
          (cat: any) => cat.id === budget.categoryId
        );
        return {
          category: category ? category.name : "Unknown Category",
          amount: budget.amount,
        };
      });

      setBudgetData(combinedData);
    } catch (err) {
      console.error("Error fetching budget or category data:", err);
      setError("Failed to load budget or category data");
    }
  };


  const data = {
    labels: budgetData.map((item) => item.category),
    datasets: [
      {
        data: budgetData.map((item) => item.amount),
        backgroundColor: [
          "#f39c12",
          "#3498db",
          "#1abc9c",
          "#9b59b6",
          "#e74c3c",
          "#27ae60",
          "#f1c40f",
          "#95a5a6",
        ],
        hoverBackgroundColor: [
          "#f1c40f",
          "#5dade2",
          "#48c9b0",
          "#af7ac5",
          "#ec7063",
          "#2ecc71",
          "#f7dc6f",
          "#bdc3c7",
        ],
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
    <div className="budget-graph-container">
      <h2 className="graph-heading">Overall Budget Breakdown</h2>
      {error && <p className="error-message">{error}</p>}
      {budgetData.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p>No budget data available</p>
      )}
    </div>
  );
};

export default BudgetGraph;
