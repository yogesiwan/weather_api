require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const weatherController = require('./src/controllers/weatherController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB 
const db = require('./src/database/mongoDB-connection');

// Define routes
app.get('/weather/:pincode/:day/:month/:year', weatherController.getWeatherData);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});