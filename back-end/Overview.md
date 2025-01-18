# FinTracker API Routes

## 1. Account Management
- **GET** `/fintracker/accounts`: Retrieve a list of all accounts.
- **POST** `/fintracker/accounts`: Add a new account.
- **GET** `/fintracker/accounts/{accountId}`: Get details of a specific account.
- **PUT** `/fintracker/accounts/{accountId}`: Update an existing account.
- **DELETE** `/fintracker/accounts/{accountId}`: Remove an account.

## 2. Transaction Tracking
- **GET** `/fintracker/transactions`: Retrieve all transactions.
- **POST** `/fintracker/transactions`: Add a new transaction.
- **GET** `/fintracker/transactions/{transactionId}`: Get details of a specific transaction.
- **PUT** `/fintracker/transactions/{transactionId}`: Update an existing transaction.
- **DELETE** `/fintracker/transactions/{transactionId}`: Remove a transaction.

## 3. Reporting
- **GET** `/fintracker/reports`: Generate and retrieve reports based on specified criteria (e.g., time gap).
- **GET** `/fintracker/reports/category`: Generate reports filtered by categories.

## 4. Budget Management
- **GET** `/fintracker/budgets`: Retrieve current budgets.
- **POST** `/fintracker/budgets`: Set a new budget.
- **PUT** `/fintracker/budgets/{budgetId}`: Update an existing budget.
- **DELETE** `/fintracker/budgets/{budgetId}`: Remove a budget.

## 5. Category Management
- **GET** `/fintracker/categories`: Retrieve all categories.
- **POST** `/fintracker/categories`: Add a new category.
- **GET** `/fintracker/categories/{categoryId}`: Get details of a specific category.
- **PUT** `/fintracker/categories/{categoryId}`: Update an existing category.
- **DELETE** `/fintracker/categories/{categoryId}`: Remove a category.

## 6. Visualization
- **GET** `/fintracker/summary`: Retrieve visualized summaries of transactions (e.g., charts, graphs).
