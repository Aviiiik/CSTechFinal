const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');
const Agent = require('../models/Agent');

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== '.csv') {
      return cb(new Error('Only CSV files are allowed.'));
    }
    cb(null, true);
  },
});

const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
const isValidString = (str) => typeof str === 'string' && str.trim().length > 0;

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file required.' });
  }

  const filePath = req.file.path;
  const entries = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if (isValidString(row.FirstName) && isValidPhone(row.Phone)) {
            entries.push({
              FirstName: row.FirstName.trim(),
              Phone: row.Phone.trim(),
              Notes: row.Notes?.trim() || '',
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    if (entries.length === 0) {
      return res.status(400).json({ message: 'No valid entries in CSV.' });
    }

    const agents = await Agent.find();
    if (agents.length !== 5) {
      return res.status(400).json({ message: 'Exactly 5 agents are required.' });
    }

    const tasks = [];
    entries.forEach((row, index) => {
      const agent = agents[index % 5]; // distribute round-robin
      tasks.push({
        agentId: agent._id,
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      });
    });

    await Task.insertMany(tasks);
    res.json({ message: 'Tasks distributed successfully.' });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Failed to process file.' });
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('agentId');
    const grouped = {};

    tasks.forEach(task => {
      const agentName = task.agentId?.name || 'Unknown';
      if (!grouped[agentName]) grouped[agentName] = [];
      grouped[agentName].push({
        firstName: task.firstName,
        phone: task.phone,
        notes: task.notes,
      });
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: 'Error loading tasks.' });
  }
});

module.exports = router;
