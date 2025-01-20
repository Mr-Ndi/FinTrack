import { useEffect, useState } from "react";
import axios from "../api/axios";
import './Dashboard.css'

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
        const response = await axios.get("/fintracker/accounts", {
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

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard!</h2>

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

      {/* Visualization Section */}
      <section className="visualization">
        <h3>Visualization</h3>
        <button onClick={() => console.log("Generate Summary Charts")}>
          Generate Summary Charts
        </button>
      </section>

      {/* Management Links */}
      <section className="management-links">
        <h3>Manage</h3>
        <ul>
          <li><a href="/accounts">Accounts</a></li>
          <li><a href="/transactions">Transactions</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/budgets">Budgets</a></li>
          <li><a href="/categories">Categories</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
