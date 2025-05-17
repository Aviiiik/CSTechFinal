import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [agentForm, setAgentForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAgents();
    fetchTasks();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/agents');
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error('Failed to fetch agents:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleAgentChange = (e) => {
    setAgentForm({ ...agentForm, [e.target.name]: e.target.value });
  };

  const handleAddAgent = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentForm),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Agent added!');
        setAgentForm({ name: '', email: '', mobile: '', password: '' });
        await fetchAgents();
        await fetchTasks();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Add agent error:', err);
      setMessage('❌ Error adding agent.');
    }
  };

  const handleDeleteAgent = async (id) => {
    if (!window.confirm('Are you sure you want to remove this agent?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/agents/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setMessage('🗑️ Agent removed.');
        await fetchAgents();
        await fetchTasks();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Delete agent error:', err);
      setMessage('❌ Error deleting agent.');
    }
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) return alert('Please select a CSV file.');

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('✅ CSV uploaded and tasks distributed!');
        await fetchTasks();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('❌ Error uploading CSV.');
    }
  };

  // Capitalize first letter of agent name (optional)
  const formatName = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
  };

  return (
    <div className="dashboard">
      <h2>Agent Dashboard</h2>

      {/* Agent List */}
      <div className="agent-list">
        <h3>Current Agents</h3>
        {agents.length === 0 && <p>No agents added yet.</p>}
        <ul>
          {agents.map(agent => (
            <li key={agent._id}>
              <strong>{agent.name}</strong> ({agent.email}) — {agent.mobile}
              <button className="delete-btn" onClick={() => handleDeleteAgent(agent._id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Agent Form */}
      <h3>Add Agent</h3>
      <div className="agent-form">
        <input name="name" placeholder="Name" value={agentForm.name} onChange={handleAgentChange} />
        <input name="email" placeholder="Email" value={agentForm.email} onChange={handleAgentChange} />
        <input name="mobile" placeholder="Mobile (+123...)" value={agentForm.mobile} onChange={handleAgentChange} />
        <input name="password" type="password" placeholder="Password" value={agentForm.password} onChange={handleAgentChange} />
        <button onClick={handleAddAgent}>Add Agent</button>
      </div>

      {/* Upload CSV */}
      <h3>Upload Task CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Distribute</button>

      {/* Message */}
      {message && <p className="message">{message}</p>}

      {/* Distributed Tasks */}
      <h3>Distributed Tasks</h3>
      {Object.keys(tasks).length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        Object.entries(tasks).map(([agentName, taskList], idx) => (
          <div key={idx} className="task-block">
            <h4>{formatName(agentName)}</h4>
            <ul>
              {taskList.map((task, i) => (
                <li key={i} className="task-row">
                  <span className="task-name">{task.firstName}</span>
                  <span className="task-phone">{task.phone}</span>
                  <span className="task-notes">{task.notes}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
