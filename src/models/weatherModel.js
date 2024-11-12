const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  pincode: String,
  day: Number,
  month: Number,
  year: Number,
  date: String, 
  temperature: String,
  pressure: Number,
  humidity: Number,
  windSpeed: Number,
  windGust: Number,
  windDegree: Number,
  cloudCoverage: Number,
  weatherDescription: String,
});

// Compound index to ensure unique entries per pincode, date, and time
weatherSchema.index({ pincode: 1, day: 1, month: 1, year: 1, date: 1 }, { unique: true });

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;