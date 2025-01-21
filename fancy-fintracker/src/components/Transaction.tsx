import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import './Transaction.css';

interface Transaction {
  id: string;
  accountType: string;
  amount: number;
  date: string;
}

const Transaction: React.FC = () => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({ id: "", accountType: "", amount: 0, date: "" });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setError("");
    try {
      const response = await axiosInstance.get("/transactions");
      setTransactions(response.data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransaction = async () => {
    setError("");
    try {
      if (!newTransaction.accountType || newTransaction.amount <= 0 || !newTransaction.date) {
        setError("All fields are required.");
        return;
      }

      const response = await axiosInstance.post("/transact", newTransaction);
      alert(response.data.message || "Transaction created successfully!");
      fetchTransactions(); // Refresh the transaction list
      setNewTransaction({ id: "", accountType: "", amount: 0, date: "" }); // Reset form
    } catch (err) {
      console.error("Error creating transaction:", err);
      setError("Failed to create transaction");
    }
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="transaction-container">
      <h2 className="transaction-heading">Manage Transactions</h2>

      {/* Transaction Creation Form */}
      <div className="transaction-form">
        <h3 className="transaction-subheading">Create New Transaction</h3>
        <div>
          <input
            type="text"
            placeholder="Account Type"
            value={newTransaction.accountType}
            onChange={(e) => setNewTransaction({ ...newTransaction, accountType: e.target.value })}
            className="transaction-input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
            className="transaction-input"
          />
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            className="transaction-input"
          />
          <button onClick={handleCreateTransaction} className="transaction-button">
            Create Transaction
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        <h3 className="transaction-subheading">Your Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className="transactions-list-item">
                <div>
                  <span>{transaction.accountType}</span>
                  <span>${transaction.amount}</span>
                  <span>{transaction.date}</span>
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
