const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/volunteer-registration');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
  res.json({ 
    message: 'Volunteer Registration API is running!',
    endpoints: {
      'GET /': 'API status',
      'GET /api/applicants': 'Get all applications',
      'POST /api/applicants': 'Create new application',
      'POST /api/admin/login': 'Admin login'
    }
  });
});


app.use('/api/applicants', require('./routes/applicants'));


app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, message: 'Admin authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
