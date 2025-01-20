import { useEffect, useState } from "react";
import axios from "../api/axios";
import './Dashboard.css';
import Account from './Account'; // Import Account component

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface AccountData {
  id: string;
  name: string;
  balance: number;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState({ transactions: true, accounts: true });
  const [activeSection, setActiveSection] = useState<string>(""); // Track which section is active

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
              {/* Use existing buttons to toggle sections */}
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("accounts"); }}>Account</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("transactions"); }}>Transactions</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("reports"); }}>Reports</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("budgets"); }}>Budgets</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("categories"); }}>Categories</a></li>
            </ul>
          </section>
        </div>

        {/* Right Panel */}
        <div className="dashboard-right">
          {/* Conditionally render sections based on the active section */}
          {activeSection === "accounts" && (
            <>
              {/* Render Account Component */}
              <Account />
            </>
          )}
          {activeSection === "transactions" && (
            <>
              {/* Placeholder for Transactions Section */}
              <h3>Transactions Management Coming Soon!</h3>
            </>
          )}
          {activeSection === "reports" && (
            <>
              {/* Placeholder for Reports Section */}
              <h3>Reports Management Coming Soon!</h3>
            </>
          )}
          {activeSection === "budgets" && (
            <>
              {/* Placeholder for Budgets Section */}
              <h3>Budgets Management Coming Soon!</h3>
            </>
          )}
          {activeSection === "categories" && (
            <>
              {/* Placeholder for Categories Section */}
              <h3>Categories Management Coming Soon!</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
