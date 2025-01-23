import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import './Budget.css';

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

interface Account {
  id: string;
  accountType: string;
  maxAmount: number;
}

const Budget: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState<Budget>({ id: "", categoryId: "", amount: 0, accountId: "", accountType: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
// @ts-ignore
  const [transactionError, setTransactionError] = useState<string>("");

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
    fetchAccounts();
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

  const fetchCategories = async () => {
    setTransactionError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setTransactionError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    setTransactionError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");
  
      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Full API response:", response.data);
  
    
      setAccounts(Array.isArray(response.data.account) ? response.data.account : []);
    } catch (err: any) {
      console.error("Error fetching accounts:", err.response?.data || err.message);
      setTransactionError("Failed to load accounts");
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
      fetchBudgets();
      setNewBudget({ id: "", categoryId: "", amount: 0, accountId: "", accountType: "" });
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
      fetchBudgets();
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

        {/* Category Dropdown */}
        <select
          value={newBudget.categoryId}
          onChange={(e) => setNewBudget({ ...newBudget, categoryId: e.target.value })}
          className="budget-input"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
          className="budget-input"
        />

        {/* Account Dropdown */}
        <select
          value={newBudget.accountId}
          onChange={(e) => {
            const selectedAccount = accounts.find(account => account.id === e.target.value);
            setNewBudget({
              ...newBudget,
              accountId: e.target.value,
              accountType: selectedAccount ? selectedAccount.accountType : ""
            });
          }}
          className="budget-input"
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.accountType} (Max: ${account.maxAmount})
            </option>
          ))}
        </select>

        <button onClick={handleCreateBudget} className="budget-button">
          Create Budget
        </button>

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
