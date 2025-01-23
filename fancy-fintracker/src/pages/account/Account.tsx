import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import axios from "axios";
import "./Account.css";

interface Account {
  id: string;
  accountType: string; 
  balance: number;
}

const Account: React.FC = () => {
  const [newAccount, setNewAccount] = useState<Account>({ id: "", accountType: "", balance: 0 });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const validateToken = (): boolean => {
    const token = sessionStorage.getItem("authToken");
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
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      // console.log("Fetching accounts...");
      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log("Full Accounts API response:", response.data);
    
      const accountData = Array.isArray(response.data.account) ? response.data.account : [];
      // console.log("Parsed account data:", accountData);
      setAccounts(accountData);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.message);
      
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          sessionStorage.removeItem("authToken");
        } else if (err.response) {
          setError(`Failed to load accounts: ${err.response.data?.message || "Unknown error"}`);
        } else {
          setError("Failed to load accounts: Network error");
        }
      } else {
        console.error("Unexpected error:", err);
        setError("Failed to load accounts");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    try {
      if (!newAccount.accountType.trim()) {
        setError("Account type is required");
        return;
      }

      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axiosInstance.post(
        "/accounts",
        { accountType: newAccount.accountType, balance: newAccount.balance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAccounts((prev) => [...prev, response.data.account]);
      setNewAccount({ id: "", accountType: "", balance: 0 });
      alert(response.data.message || "Account created successfully!");
    } catch (err) {
      console.error("Error creating account:", err);
      setError("Failed to create account");
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    setError("");

    // console.log("Deleting account with ID:", accountId);

    if (!accountId) {
      console.error("Error: accountId is undefined");
      setError("Invalid account ID");
      return;
    }

    try {
      const token = sessionStorage.getItem("authToken");
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
      <div className="account-form">
        <h3 className="account-subheading">Create New Account</h3>
        <div>
          <input
            type="text"
            placeholder="Account Type"
            value={newAccount.accountType}
            onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
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
      <div className="accounts-list">
        <h3 className="account-subheading">Your Accounts</h3>
        {accounts.length === 0 ? (
          <p className="text-gray-400">No accounts found</p>
        ) : (
          <ul>
            {accounts.map((account) => (
              <li key={account.id} className="accounts-list-item">
                <div>
                  <span>{account.accountType}</span> . <span>${account.balance}</span> {/* Update to accountType */}
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
