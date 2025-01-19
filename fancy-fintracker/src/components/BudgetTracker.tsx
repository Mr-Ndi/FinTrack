import { useEffect, useState } from "react";
import axios from "../api/axios";

const BudgetTracker = () => {
    const [budget] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [exceeded, setExceeded] = useState(false);

    useEffect(() => {
        const fetchTotalExpenses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/transactions", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const expenses = response.data
                    .filter((txn: any) => txn.type === "expense")
                    .reduce((sum: number, txn: any) => sum + txn.amount, 0);

                setTotalExpenses(expenses);
                setExceeded(expenses > budget);
            } catch (err) {
                console.error("Error fetching expenses", err);
            }
        };

        fetchTotalExpenses();
    }, [budget]);

    return (
        <div className="budget-tracker">
            <h3>Budget: ${budget}</h3>
            <h4>Total Expenses: ${totalExpenses}</h4>
            {exceeded && <p className="alert">⚠️ Budget exceeded!</p>}
        </div>
    );
};

export default BudgetTracker;
