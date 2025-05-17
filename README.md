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

│ │ ├── pages/ # Dashboard UI (Dashboard.js)

│ │ ├── components/ # Login UI (Login.js)

│ │ ├── App.js

│ │ └── index.js

│ └── public/

│

├── README.md

└── package.json # Separate for frontend and backend
---

## 🚀 Installation & Setup

### 🔹 Clone the Repository

```bash
git clone https://github.com/yourusername/task-dashboard-mern.git
cd task-dashboard-mern

🔹 Backend Setup
bash
Copy
Edit
cd backend
npm install
🔐 Create .env File
Create a file named .env inside the /backend folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
💡 JWT_SECRET is used for signing authentication tokens (future login support).

Then run the backend:

bash
Copy
Edit
npm start
🔹 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
The frontend runs at http://localhost:3000 and connects to the backend at http://localhost:5000.
