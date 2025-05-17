const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const Task = require('../models/Task');

const isValidPhone = (phone) => /^\+[1-9]\d{1,14}$/.test(phone); // E.164 format

// POST /agents — Add agent
router.post('/agents', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const count = await Agent.countDocuments();
  if (count >= 5) {
    return res.status(400).json({ message: 'Only 5 agents are allowed.' });
  }

  if (!isValidPhone(mobile)) {
    return res.status(400).json({ message: 'Invalid mobile number. Use international format (e.g., +123456789).' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  try {
    const exists = await Agent.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Agent with this email already exists.' });
    }

    const agent = new Agent({ name, email, mobile, password });
    await agent.save();

    // ✅ After adding agent, redistribute ALL tasks across all agents
    const allAgents = await Agent.find();
    const tasks = await Task.find();

    if (allAgents.length > 0 && tasks.length > 0) {
      const redistributed = tasks.map((task, i) => ({
        agentId: allAgents[i % allAgents.length]._id,
        firstName: task.firstName,
        phone: task.phone,
        notes: task.notes,
      }));

      await Task.deleteMany();
      await Task.insertMany(redistributed);
    }

    res.status(201).json(agent);
  } catch (err) {
    console.error('Agent creation error:', err);
    res.status(500).json({ message: 'Error adding agent.' });
  }
});

// GET /agents — Fetch all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error('Fetch agents error:', err);
    res.status(500).json({ message: 'Error fetching agents.' });
  }
});

// DELETE /agents/:id — Delete agent and redistribute their tasks
router.delete('/agents/:id', async (req, res) => {
  try {
    const agentId = req.params.id;

    // Delete the agent
    await Agent.findByIdAndDelete(agentId);

    // Fetch remaining agents
    const agents = await Agent.find();

    // Get tasks that were assigned to the deleted agent
    const orphanTasks = await Task.find({ agentId });

    // Delete only the deleted agent’s tasks
    await Task.deleteMany({ agentId });

    // ✅ Redistribute the orphaned tasks to remaining agents
    if (agents.length > 0 && orphanTasks.length > 0) {
      const redistributed = orphanTasks.map((task, i) => ({
        agentId: agents[i % agents.length]._id,
        firstName: task.firstName,
        phone: task.phone,
        notes: task.notes,
      }));

      await Task.insertMany(redistributed);
    }

    res.json({ message: 'Agent deleted. Tasks redistributed among remaining agents.' });
  } catch (err) {
    console.error('Delete agent error:', err);
    res.status(500).json({ message: 'Error deleting agent.' });
  }
});

module.exports = router;
