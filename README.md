# FinTrack

## Description
FinTrack is a web-based financial management application designed to help users track their income and expenses, set budgets, and visualize their financial data. With features like transaction management, budget alerts, and an analytics dashboard, FinTrack empowers users to take control of their finances and make informed decisions.

## Project Structure
This repository contains both backend and frontend code organized into separate directories:

- **/backend**: Contains the server-side code, including APIs and database management. **Prisma ORM** is used for seamless database interaction.
- **/fancy-fintracker**: Contains the client-side code, including user interfaces and interactions.

## Features

### 1. Transaction Management
- Track all incoming and outgoing transactions from multiple accounts.
- Categorize transactions for better organization.

### 2. Budgeting Tools
- Set monthly budgets for different categories.
- Receive notifications when spending exceeds budget limits.

### 3. Analytics Dashboard
- Visualize financial data with interactive charts and graphs.
- Gain insights into spending habits and overall financial health.

### 4. Debt and Investment Tracking
- Monitor debts and investments in one place.
- Make informed financial decisions based on real-time data.

## Hosted Services
- **Backend**:
  - **Database**: PostgreSQL, hosted on [Neon](https://neon.tech/), with **Prisma ORM** for database management.
  - **API Server**: Hosted on [Render](https://render.com/)
- **Frontend**:
  - Client application hosted on [Vercel](https://vercel.com/)

## Installation

### Prerequisites
- Node.js installed on your system.
- A valid PostgreSQL database connection for backend functionality.

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/Mr-Ndi/FinTrack.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FinTrack
   ```

3. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

4. **Frontend Setup**:
   - Navigate back to the main directory:
     ```bash
     cd ../fancy-fintracker
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```

5. Simply visit the hosted application:
   [https://fintracker.mrndi.tech/](https://fintracker.mrndi.tech/)

## Usage
1. After installation, create an account.
2. Link your financial accounts (bank, mobile money, cash, etc.).
3. Track transactions, set budgets, and generate reports.
4. Visualize your financial data for better decision-making.

### Example Use Case
Eric, an employee of Code of Africa GmbH, struggles to manage income and expenses across various accounts such as bank accounts, mobile money, and cash. Using FinTrack, he can:
- Track all incoming and outgoing transactions for each account.
- Generate financial reports for specific time periods.
- Set a budget and receive notifications when exceeding it.
- Categorize expenses into categories and subcategories for better organization.
- Link expenses to relevant categories and subcategories.
- Access a summary of transactions with visualized data.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For further inquiries or collaboration opportunities, feel free to contact me at **ndiramiyeninshut1@gmail.com.** <br>
Additionally, you can explore my portfolio and learn more about my skills at:
**https://mr-ndi.github.io/Port_web/#/**
