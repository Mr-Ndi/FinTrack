import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Dashboard.css";
import Account from "./Account";
import Transaction from "./Transaction"; // Import Transaction component

interface TransactionData {
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
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState({ transactions: true, accounts: true });
  const [activeSection, setActiveSection] = useState<string>("");

  const mapAccountData = (data: any[]): AccountData[] => {
    return data.map((account) => ({
      id: account.id.toString(),
      name: account.accountType,
      balance: account.balance || 0,
    }));
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
    
        if (!token) {
          console.error("No token found. Redirecting to login...");
          window.location.href = "/login";
          return;
        }
    
        const response = await axios.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.status === 401) {
          console.error("Unauthorized. Token might be expired.");
          window.location.href = "/login";
          return;
        }
    
        const transactionData = response.data.datum || [];
        setTransactions(transactionData);
        setLoading((prev) => ({ ...prev, transactions: false }));
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
          window.location.href = "/login";
        } else {
          console.error("Error fetching transactions", err);
        }
        setTransactions([]);
        setLoading((prev) => ({ ...prev, transactions: false }));
      }
    };   
  
    const fetchAccounts = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Token is missing");
    
        const response = await axios.get("/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("Accounts API response:", response.data);
    
        // Parse `datum` field
        const accountData = response.data.datum || [];
        if (Array.isArray(accountData)) {
          setAccounts(mapAccountData(accountData));
        } else {
          throw new Error("Invalid data format for accounts");
        }
        setLoading((prev) => ({ ...prev, accounts: false }));
      } catch (err) {
        console.error("Error fetching accounts", err);
        setAccounts([]);
        setLoading((prev) => ({ ...prev, accounts: false }));
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
          <h2>Welcome to your Dashboard / Aho bibera!</h2>

          {/* Accounts Section */}
          <section className="accounts">
            <h3>Your Accounts</h3>
            {loading.accounts ? (
              <div className="spinner"></div>
            ) : (
              accounts.length > 0 ? (
                <ul>
                  {accounts.map((account) => (
                    <li key={account.id}>
                      <span>{account.name}</span> - <span>${account.balance}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No accounts available.</p>
              )
            )}
          </section>

          {/* Transactions Section */}
          <section className="transactions">
            <h3>Recent Transactions</h3>
            {loading.transactions ? (
              <p>Loading transactions...</p>
            ) : (
              transactions.length > 0 ? (
                <ul>
                  {transactions.map((transaction) => (
                    <li key={transaction.id}>
                      <span>{transaction.date}</span>
                      <span>{transaction.category}</span>
                      <span>{transaction.type === "income" ? "+" : "-"}${transaction.amount}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions available.</p>
              )
            )}
          </section>

          {/* Management Links */}
          <section className="management-links">
            <h3>Manage</h3>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("accounts");
                  }}
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("transactions"); // Trigger Transaction component
                  }}
                >
                  Transactions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("reports");
                  }}
                >
                  Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("budgets");
                  }}
                >
                  Budgets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("categories");
                  }}
                >
                  Categories
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Panel */}
        <div className="dashboard-right">
          {activeSection === "accounts" && <Account />}
          {activeSection === "transactions" && <Transaction />} {/* Render Transaction component */}
          {activeSection === "reports" && <h3>Reports Management Coming Soon!</h3>}
          {activeSection === "budgets" && <h3>Budgets Management Coming Soon!</h3>}
          {activeSection === "categories" && <h3>Categories Management Coming Soon!</h3>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
