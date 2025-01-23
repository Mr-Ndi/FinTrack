import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../api/axios";
import "./Graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Account {
  id: string;
  accountType: string;
  maxAmount: number;
}

interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  accountId: string;
  accountType: string;
}

interface Category {
  id: string;
  name: string;
}

const BudgetGraph: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const [accountsRes, budgetsRes, categoriesRes] = await Promise.all([
        axiosInstance.get("/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/budgets", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAccounts(accountsRes.data.account || []);
      setBudgets(budgetsRes.data.budgets || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };


  const budgetByAccount = budgets.reduce((acc: Record<string, number>, budget) => {
    const accountId = budget.accountId;
    acc[accountId] = (acc[accountId] || 0) + budget.amount;
    return acc;
  }, {});


  const spendingByCategory = categories.reduce((acc: Record<string, number>, category) => {
    acc[category.name] = Math.random() * 1000;
    return acc;
  }, {});


  const labels = accounts.map((account) => account.accountType);
  const data = {
    labels,
    datasets: [
      {
        label: "Account Balance",
        data: accounts.map((account) => account.maxAmount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Budget Allocated",
        data: accounts.map((account) => budgetByAccount[account.id] || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Spending by Category (Sample)",
        data: Object.values(spendingByCategory),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Budget and Spending Overview",
      },
    },
  };

  if (loading) return <div>Loading Budget Graph...</div>;

  return (
    <div className="graph-container">
      <h2>Budget and Spending Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetGraph;
