💰 AI-Powered Expense Tracker

A full-stack MERN application for tracking personal expenses, with AI-based automatic categorization and a visual spending dashboard.

🚀 Features
🔐 User authentication (signup/login) with JWT and bcrypt password hashing
💸 Add, edit, and delete expenses
🤖 AI auto-categorization — expenses are automatically classified into categories (Food, Travel, Bills, Shopping, Entertainment, Health, Other) based on their description
✏️ Manual category override, with source tracking (AI vs manual)
📊 Dashboard with charts showing spending by category and over time
📱 Responsive UI built with Tailwind CSS

👩‍💻 Tech Stack

Frontend: React.js, Tailwind CSS, Axios, Chart.js / Recharts
Backend: Node.js, Express.js 
Database: MongoDB with Mongoose
Auth: JWT (jsonwebtoken), bcrypt 
AI: Groq API for expense categorization


📂 Project Structure
expense-tracker/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── .env                      # not committed — see setup below
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/               # auth context
│   │   ├── api/                   # axios instance
│   │   └── App.jsx
│
├── .gitignore
└── README.md

📊 How It Works

Signup / login
JWT issued to use
      |
Add expense
description, amount, date
      |
AI categorization
description send to ai api
      |
 Expense saved     ------- Manual override
categorySource: AI         user edits category
      |                         |
  Dashboard           __________|
GET summary → chart


🔮Future Enhancements

📊 Advanced expense analytics
🔁 Recurring expenses (subscriptions, rent, etc.)
💰 Monthly budgets with over-budget alerts
📤 Export reports as PDF/CSV
🌙 Dark mode
📱 Progressive Web App, mobile application
🔔 Email/notification summaries of weekly or monthly spending
