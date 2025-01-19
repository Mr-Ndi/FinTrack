import { useEffect, useState } from "react";
import axios from "../api/axios";

interface Transaction {
    id: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
}

const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/transactions", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching transactions", err);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="dashboard">
            <h2>Welcome to your Dashboard!</h2>
            {loading ? (
                <p>Loading transactions...</p>
            ) : (
                <ul className="transactions">
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <span>{transaction.date}</span>
                            <span>{transaction.category}</span>
                            <span>{transaction.type === "income" ? "+" : "-"}${transaction.amount}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
