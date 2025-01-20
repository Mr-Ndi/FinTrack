import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import './Account.css';

interface Account {
  id: string;
  name: string;
  balance: number;
}

const Account: React.FC = () => {
  const [newAccount, setNewAccount] = useState<Account>({ id: "", name: "", balance: 0 });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");


  const validateToken = (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please log in.");
      return false;
    }
    return true;
  };


  useEffect(() => {
    if (!validateToken()) {
      setLoading(false);
    } else {
      fetchAccounts();
    }
  }, []);


  const fetchAccounts = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccounts(response.data.account || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
      } else {
        setError("Failed to load accounts");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleCreateAccount = async () => {
    setError("");
    try {
      if (!newAccount.name.trim()) {
        setError("Account type is required");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axiosInstance.post(
        "/account",
        { accountType: newAccount.name, balance: newAccount.balance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAccounts((prev) => [...prev, response.data.account]);
      setNewAccount({ id: "", name: "", balance: 0 });
      alert(response.data.message || "Account created successfully!");
    } catch (err) {
      console.error("Error creating account:", err);
      setError("Failed to create account");
    }
  };


  const handleDeleteAccount = async (accountId: string) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      await axiosInstance.delete(`/accounts/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccounts((prev) => prev.filter((account) => account.id !== accountId));
      alert("Account deleted successfully!");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account");
    }
  };

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div className="account-container">
      <h2 className="account-heading">Manage Accounts</h2>

      {/* Account Creation Form */}
      <div className="account-form">
        <h3 className="account-subheading">Create New Account</h3>
        <div>
          <input
            type="text"
            placeholder="Account Type"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            className="account-input"
          />
          <input
            type="number"
            placeholder="Initial Balance"
            value={newAccount.balance}
            onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })}
            className="account-input"
          />
          <button onClick={handleCreateAccount} className="account-button">
            Create Account
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Accounts List */}
      <div className="accounts-list">
        <h3 className="account-subheading">Your Accounts</h3>
        {accounts.length === 0 ? (
          <p className="text-gray-400">No accounts found</p>
        ) : (
          <ul>
            {accounts.map((account) => (
              <li key={account.id} className="accounts-list-item">
                <div>
                  <span>{account.name}</span>
                  <span>${account.balance}</span>
                </div>
                <button
                  onClick={() => handleDeleteAccount(account.id)}
                  className="delete-button account-button"
                >
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

export default Account;
