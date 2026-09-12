require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/auth.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err.message));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
module.exports = app;