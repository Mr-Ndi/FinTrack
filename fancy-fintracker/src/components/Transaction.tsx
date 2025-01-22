import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import './Transaction.css';

// Interfaces for data structures
interface Category {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  accountType: string;
  amount: number;
  description: string;
  categoryId: string;
}

interface Account {
  id: string;
  accountType: string;
  balance: number;
}

const Transaction: React.FC = () => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    accountType: "",
    amount: 0,
    description: "",
    categoryId: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch data on component mount
  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    fetchTransactions();
  }, []);

  // Fetch accounts from API
  const fetchAccounts = async () => {
    setError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      console.log("Token:", token); // Debugging log
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Accounts Response:", response.data); // Debugging log
      const accountData = Array.isArray(response.data.account) ? response.data.account : [];
      setAccounts(accountData);
    } catch (err: any) {
      console.error("Error fetching accounts:", err.response ? err.response.data : err.message);
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    setError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axiosInstance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please log in.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.get("/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Transactions Response:", response.data); // Debugging log
      const transactionsData = Array.isArray(response.data) ? response.data : [];
      setTransactions(transactionsData);
    } catch (err:any) {
      console.error("Error fetching transactions:", err.response ? err.response.data : err.message);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // Handle transaction creation
  const handleCreateTransaction = async () => {
    setError("");
    try {
      if (!newTransaction.accountType || newTransaction.amount <= 0 || !newTransaction.description || !newTransaction.categoryId) {
        setError("All fields are required.");
        return;
      }

      // Validate that the amount does not exceed the balance of the selected account
      const selectedAccount = accounts.find(account => account.accountType === newTransaction.accountType);
      if (selectedAccount && newTransaction.amount > selectedAccount.balance) {
        setError("Amount exceeds the available balance of the selected account.");
        return;
      }

      // Prepare the transaction payload
      const payload = {
        accountId: selectedAccount?.id,
        amount: newTransaction.amount,
        transactionDate: new Date().toISOString(),
        description: newTransaction.description,
        categoryIds: [newTransaction.categoryId],
      };

      // Send the POST request
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.post("/transact", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message || "Transaction created successfully!");
      
      // Refresh transactions and reset form
      fetchTransactions();
      setNewTransaction({ id: "", accountType: "", amount: 0, description: "", categoryId: "" });
    } catch (err:any) {
      console.error("Failed to create transaction:", err.response ? err.response.data : err.message);
      setError("Failed to create transaction");
    }
  };

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div className="transaction-container">
      <h2 className="transaction-heading">Manage Transactions</h2>

      {/* Transaction Creation Form */}
      <div className="transaction-form">
        <h3 className="transaction-subheading">Create New Transaction</h3>
        <div>
          {/* Account Type Dropdown */}
          <select
            value={newTransaction.accountType}
            onChange={(e) => setNewTransaction({ ...newTransaction, accountType: e.target.value })}
            className="transaction-input"
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.accountType}>
                {account.accountType} (Balance: ${account.balance})
              </option>
            ))}
          </select>

          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
            className="transaction-input"
          />

          {/* Description Input */}
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className="transaction-input"
          />

          {/* Category Selection */}
          <select
            value={newTransaction.categoryId}
            onChange={(e) => setNewTransaction({ ...newTransaction, categoryId: e.target.value })}
            className="transaction-input"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button onClick={handleCreateTransaction} className="transaction-button">
            Create Transaction
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        <h3 className="transaction-subheading">Your Transactions</h3>
        {Array.isArray(transactions) && transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <ul>
            {Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <li key={transaction.id} className="transactions-list-item">
                  <div>
                    <span>{transaction.accountType}</span>
                    <span>${transaction.amount}</span>
                    <span>{transaction.description}</span>
                    <span>{transaction.categoryId}</span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transaction;
