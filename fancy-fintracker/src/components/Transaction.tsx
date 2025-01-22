import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import "./Transaction.css";

interface Category {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  description: string;
  categoryId: string;
  accountType: string;
  transactionDate: string;
}

interface Account {
  id: string;
  accountType: string;
  balance: number;
}

const Transaction: React.FC = () => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    accountId: "",
    amount: 0,
    description: "",
    categoryId: "",
    accountType: "",
    transactionDate: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionError, setTransactionError] = useState<string>("");
  const [reportError, setReportError] = useState<string>("");
  const [accountReport, setAccountReport] = useState<Transaction[]>([]);
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    fetchTransactions();
  }, []);

  const fetchAccounts = async () => {
    setTransactionError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccounts(Array.isArray(response.data.account) ? response.data.account : []);
    } catch (err: any) {
      console.error("Error fetching accounts:", err.response?.data || err.message);
      setTransactionError("Failed to load accounts");
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
      setTransactionError("Failed to load categories. Please log in.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setTransactionError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.get("/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(Array.isArray(response.data.datum) ? response.data.datum : []);
    } catch (err: any) {
      console.error("Error fetching transactions:", err.response?.data || err.message);
      setTransactionError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransaction = async () => {
    setTransactionError("");
    try {
      if (!newTransaction.accountId || newTransaction.amount <= 0 || !newTransaction.description || !newTransaction.categoryId) {
        setTransactionError("All fields are required.");
        return;
      }

      const selectedAccount = accounts.find((account) => account.id === newTransaction.accountId);
      if (!selectedAccount) {
        setTransactionError("Selected account not found.");
        return;
      }

      if (newTransaction.amount > selectedAccount.balance) {
        setTransactionError("Amount exceeds the available balance of the selected account.");
        return;
      }

      const payload = {
        accountId: selectedAccount.id,
        amount: newTransaction.amount,
        transactionDate: new Date().toISOString(),
        description: newTransaction.description,
        categoryIds: [parseInt(newTransaction.categoryId, 10)],
      };

      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.post("/transact", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === 200) {
        await fetchAccounts();
        await fetchTransactions();
        setNewTransaction({ id: "", accountId: "", amount: 0, description: "", categoryId: "", accountType: "", transactionDate: "" });
      } else {
        setTransactionError("Transaction creation failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Failed to create transaction:", err.response?.data || err.message);
      setTransactionError("Failed to create transaction");
    }
  };

  const handleAccountTypeChange = (accountType: string) => {
    const account = accounts.find((acc) => acc.accountType === accountType);
    if (account) {
      setNewTransaction({ ...newTransaction, accountId: account.id });
    } else {
      setNewTransaction({ ...newTransaction, accountId: "" });
    }
  };

  const fetchAccountReport = async () => {
    setReportError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is required");
  
      if (!selectedAccountType) {
        setReportError("Please select an account type");
        return;
      }
  
      // Use the correct route and method
      const response = await axiosInstance.get(`/transaction/${selectedAccountType}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setAccountReport(response.data.datum || []);
    } catch (err: any) {
      console.error("Error fetching account report:", err.response?.data || err.message);
      setReportError("Failed to fetch account report");
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
          <select
            value={newTransaction.accountId ? accounts.find((acc) => acc.id === newTransaction.accountId)?.accountType : ""}
            onChange={(e) => handleAccountTypeChange(e.target.value)}
            className="transaction-input"
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.accountType}>
                {account.accountType} (Balance: ${account.balance})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
            className="transaction-input"
          />

          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className="transaction-input"
          />

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
        {transactionError && <p className="error-message">{transactionError}</p>}
      </div>

      {/* Account Report Form */}
      <div className="account-report-form">
        <h3 className="transaction-subheading">Account Report</h3>
        <select
          value={selectedAccountType}
          onChange={(e) => setSelectedAccountType(e.target.value)}
          className="transaction-input"
        >
          <option value="">Select Account Type</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.accountType}>
              {account.accountType}
            </option>
          ))}
        </select>
        <button onClick={fetchAccountReport} className="transaction-button">
          Fetch Report
        </button>

        {reportError && <p className="error-message">{reportError}</p>}

        {accountReport.length === 0 ? (
          <p>No transactions found for this account type</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Account Type</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {accountReport.map((transaction) => (
                <tr key={transaction.id}>
                  <td>${transaction.amount}</td>
                  <td>{transaction.accountType}</td>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        <h3 className="transaction-subheading">Your Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Account Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.accountType}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transaction;
