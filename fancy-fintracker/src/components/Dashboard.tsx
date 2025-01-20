import { useEffect, useState } from "react";
import axios from "../api/axios";
import './Dashboard.css';

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState({ transactions: true, accounts: true });
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", balance: 0 });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
        setLoading((prev) => ({ ...prev, transactions: false }));
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
    };

    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
        setLoading((prev) => ({ ...prev, accounts: false }));
      } catch (err) {
        console.error("Error fetching accounts", err);
      }
    };

    fetchTransactions();
    fetchAccounts();
  }, []);

  const handleCreateAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/accounts",
        { accountType: newAccount.name, balance: newAccount.balance },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts((prev) => [...prev, response.data.account]);
      setNewAccount({ name: "", balance: 0 });
      alert("Account created successfully!");
    } catch (err) {
      console.error("Error creating account", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Left Panel */}
        <div className="dashboard-left">
          <h2>Welcome to your Dashboard/ Aho bibera!</h2>

          {/* Accounts Section */}
          <section className="accounts">
            <h3>Your Accounts</h3>
            {loading.accounts ? (
              <p>Loading accounts...</p>
            ) : (
              <ul>
                {accounts.map((account) => (
                  <li key={account.id}>
                    <span>{account.name}</span> - <span>${account.balance}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Transactions Section */}
          <section className="transactions">
            <h3>Recent Transactions</h3>
            {loading.transactions ? (
              <p>Loading transactions...</p>
            ) : (
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <span>{transaction.date}</span>
                    <span>{transaction.category}</span>
                    <span>{transaction.type === "income" ? "+" : "-"}${transaction.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Management Links */}
          <section className="management-links">
            <h3>Manage</h3>
            <ul>
              <li><a href="/accounts">Account</a></li>
              <li><a href="/transactions">Transactions</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/budgets">Budgets</a></li>
              <li><a href="/categories">Categories</a></li>
            </ul>
          </section>
        </div>

        {/* Right Panel */}
        {showAccountOptions && (
          <div className="dashboard-right">
            <h3>Create a New Account</h3>
            <div className="account-creation-form">
              <input
                type="text"
                placeholder="Account Name"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Initial Balance"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })}
              />
              <button onClick={handleCreateAccount}>Create Account</button>
              <button onClick={() => setShowAccountOptions(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
