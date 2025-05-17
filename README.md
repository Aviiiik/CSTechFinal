# 🧠 Task Distribution Dashboard — MERN Stack

A full-stack web application for managing agents and automatically distributing tasks among them. Built using the **MERN stack** (MongoDB, Express, React, Node.js), this dashboard supports:

- ✅ Add/delete agents
- ✅ Upload CSV files with tasks
- ✅ Automatic task distribution (round-robin)
- ✅ Redistribute tasks dynamically when agents change
- ✅ Responsive dashboard UI
- ✅ Ready for JWT-based authentication

---

## 📁 Folder Structure

project-root/
├── backend/ # Node.js + Express API

│ ├── models/ # Mongoose schemas (Agent, Task)

│ ├── routes/ # Express route handlers
│ ├── server.js # Entry point for backend server
│ └── .env # Environment variables (JWT secret, DB URI)
│
├── frontend/ # React.js dashboard interface
│ ├── src/
│ │ ├── components/ # Dashboard UI (Dashboard.js)
│ │ ├── App.js
│ │ └── index.js
│ └── public/
│
├── README.md
└── package.json # Separate for frontend and backend
