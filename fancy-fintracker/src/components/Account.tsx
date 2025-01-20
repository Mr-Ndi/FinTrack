import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

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

  // Fetch accounts when component mounts
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/accounts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.account) {
        setAccounts(response.data.account);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError("Failed to load accounts");
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      if (!newAccount.name.trim()) {
        setError("Account type is required");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/accounts",
        { accountType: newAccount.name, balance: newAccount.balance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAccounts(prev => [...prev, response.data.account]);
      setNewAccount({ id: "", name: "", balance: 0 });
      setError("");
      alert(response.data.message || "Account created successfully!");
    } catch (err) {
      console.error("Error creating account:", err);
      setError("Failed to create account");
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/accounts/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAccounts(prev => prev.filter(account => account.id !== accountId));
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-500">Manage Accounts</h2>

      {/* Account Creation Form */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4 text-green-400">Create New Account</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Account Type"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Initial Balance"
            value={newAccount.balance}
            onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleCreateAccount}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Create Account
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Accounts List */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-xl mb-4 text-green-400">Your Accounts</h3>
        {accounts.length === 0 ? (
          <p className="text-gray-400">No accounts found</p>
        ) : (
          <ul className="space-y-3">
            {accounts.map((account) => (
              <li 
                key={account.id}
                className="flex justify-between items-center p-3 bg-gray-700 rounded"
              >
                <div>
                  <span className="text-white">{account.name}</span>
                  <span className="ml-4 text-green-400">${account.balance}</span>
                </div>
                <button
                  onClick={() => handleDeleteAccount(account.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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