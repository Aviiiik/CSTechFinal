✅ GitHub-Formatted README.md
markdown
Copy
Edit
# 🧠 Task Distribution Dashboard — MERN Stack

A full-stack web application for managing agents and automatically distributing tasks among them. Built using the **MERN stack** (MongoDB, Express, React, Node.js), the system supports:

- Adding/removing agents
- Uploading tasks via CSV
- Automatic round-robin task distribution
- JWT-based authentication-ready backend
- Responsive dashboard frontend

---

## 📁 Project Structure

project-root/
├── backend/ # Node.js + Express API
│ ├── models/ # Mongoose models
│ ├── routes/ # Express route handlers
│ ├── server.js # Entry point
│ └── .env # Contains JWT_SECRET, DB URI
│
├── frontend/ # React dashboard UI
│ ├── src/
│ │ ├── components/ # Dashboard.js
│ │ ├── App.js
│ │ └── index.js
│ └── public/
│
├── README.md
└── package.json (in both frontend and backend)

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-dashboard-mern.git
cd task-dashboard-mern
You said:
no add everything to the markdown ,im going to copy paste it directly
ChatGPT said:
Here is your complete README.md, fully formatted for GitHub — you can copy-paste this directly into your project.

markdown
Copy
Edit
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

yaml
Copy
Edit

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

📂 CSV Upload Format
Your CSV file must follow this format:

csv
Copy
Edit
FirstName,Phone,Notes
Alice,1234567890,Follows up next week
Bob,9876543210,Interested in product A
✅ The system validates mobile numbers and trims empty rows.
✅ Tasks are evenly distributed among agents in round-robin order.

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/agents	Fetch all agents
POST	/api/agents	Add a new agent
DELETE	/api/agents/:id	Delete an agent & redistribute
POST	/api/upload	Upload CSV tasks
GET	/api/tasks	Fetch all distributed tasks

🧰 Tech Stack
Layer	Technology
Frontend	React.js
Backend	Node.js, Express.js
Database	MongoDB with Mongoose
CSV Parsing	csv-parser
File Upload	Multer
Auth Ready	JWT (JSON Web Token)

✨ Features
✅ Add/Delete agents (max 5 agents enforced)

✅ Upload .csv file of tasks

✅ Automatic task redistribution on agent changes

✅ Dynamic and responsive layout

✅ Backend ready for authentication

✅ Styled with pure CSS and clean layout

📸 UI Highlights
Mobile-friendly design

Agents and tasks displayed in card layout

Task info formatted in grid rows: First Name | Phone | Notes

❗ Notes
Ensure MongoDB is running (locally or via MongoDB Atlas).

Passwords are currently stored in plain text — hash using bcrypt for production use.

JWT logic is scaffolded; you can plug in login/signup easily later.

Task distribution works for unlimited task entries.
