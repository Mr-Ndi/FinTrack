import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import './Budget.css';

interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  accountId: string;
  accountType: string;
}

const Budget: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState<Budget>({ id: "", categoryId: "", amount: 0, accountId: "", accountType: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    setError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Token is missing");

      const response = await axiosInstance.get("/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBudgets(response.data.budgets || []);
    } catch (err) {
      console.error("Error fetching budgets:", err);
      setError("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBudget = async () => {
    setError("");
    try {
      if (!newBudget.categoryId || newBudget.amount <= 0 || !newBudget.accountId || !newBudget.accountType) {
        setError("All fields are required.");
        return;
      }

      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.post("/budgets", newBudget, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message || "Budget created successfully!");
      fetchBudgets(); // Refresh the budget list
      setNewBudget({ id: "", categoryId: "", amount: 0, accountId: "", accountType: "" }); // Reset form
    } catch (err) {
      console.error("Error creating budget:", err);
      setError("Failed to create budget");
    }
  };

  const handleDeleteBudget = async (budgetId: string) => {
    setError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      await axiosInstance.delete(`/budgets/${budgetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Budget deleted successfully!");
      fetchBudgets(); // Refresh the budget list
    } catch (err) {
      console.error("Error deleting budget:", err);
      setError("Failed to delete budget");
    }
  };

  if (loading) {
    return <div>Loading budgets...</div>;
  }

  return (
    <div className="budget-container">
      <h2 className="budget-heading">Manage Budgets</h2>

      {/* Budget Creation Form */}
      <div className="budget-form">
        <h3 className="budget-subheading">Create New Budget</h3>
        <div>
          <input
            type="text"
            placeholder="Category ID"
            value={newBudget.categoryId}
            onChange={(e) => setNewBudget({ ...newBudget, categoryId: e.target.value })}
            className="budget-input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
            className="budget-input"
          />
          <input
            type="text"
            placeholder="Account ID"
            value={newBudget.accountId}
            onChange={(e) => setNewBudget({ ...newBudget, accountId: e.target.value })}
            className="budget-input"
          />
          <input
            type="text"
            placeholder="Account Type"
            value={newBudget.accountType}
            onChange={(e) => setNewBudget({ ...newBudget, accountType: e.target.value })}
            className="budget-input"
          />
          <button onClick={handleCreateBudget} className="budget-button">
            Create Budget
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Budgets List */}
      <div className="budgets-list">
        <h3 className="budget-subheading">Your Budgets</h3>
        {budgets.length === 0 ? (
          <p>No budgets found</p>
        ) : (
          <ul>
            {budgets.map((budget) => (
              <li key={budget.id} className="budgets-list-item">
                <div>
                  <span>Category ID: {budget.categoryId}</span>
                  <span>Amount: ${budget.amount}</span>
                  <span>Account ID: {budget.accountId}</span>
                  <span>Account Type: {budget.accountType}</span>
                </div>
                <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button budget-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Budget;
