const axios = require('axios');
const Weather = require('../models/weatherModel');
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

// Function to get latitude and longitude for a given pincode
const getLatLon = async (pincode, day, month, year) => {
  const existingData = await Weather.findOne({ pincode, day, month, year });

  if (existingData) {
    return existingData; // Return early if data exists
  }

  // If not found, proceed to fetch from the API
  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(geoUrl);
    const data = response.data;
    const latitude = data.lat;
    const longitude = data.lon;

    // Fetch and store historical weather data
    return await getHistoricalWeather(latitude, longitude, day, month, year, pincode);
  } catch (error) {
    console.error(`Error fetching location data for pincode ${pincode}:`, error.message);
    throw new Error("Error fetching location data.");
  }
};
// Function to generate timestamps for a 24-hour period
const generateDayTimestamps = (day, month, year) => {
  const startTimestamp = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).getTime() / 1000;
  const endTimestamp = new Date(Date.UTC(year, month - 1, day, 23, 59, 59)).getTime() / 1000;
  return { startTimestamp, endTimestamp };
};

// Function to get historical weather data for a specific day
const getHistoricalWeather = async (latitude, longitude, day, month, year, pincode) => {
  const { startTimestamp, endTimestamp } = generateDayTimestamps(day, month, year);
  const weatherUrl = `https://history.openweathermap.org/data/2.5/history/city?lat=${latitude}&lon=${longitude}&type=hour&start=${startTimestamp}&end=${endTimestamp}&appid=${API_KEY}`;

  try {
    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    if (weatherData && weatherData.list && weatherData.list.length > 0) {
      const weatherRecords = weatherData.list.map((weather) => ({
        pincode,
        day,
        month,
        year,
        date: new Date(weather.dt * 1000).toLocaleString(),
        temperature: `${(weather.main.temp - 273.15).toFixed(2)} °C`,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        windGust: weather.wind.gust,
        windDegree: weather.wind.deg,
        cloudCoverage: weather.clouds.all,
        weatherDescription: weather.weather[0].description,
      }));

      // Check if the data already exists in the database before inserting
      const existingData = await Weather.findOne({ pincode, day, month, year });
      if (!existingData) {
        await Weather.create(weatherRecords);
      }

      return weatherRecords;
    } else {
      throw new Error("No historical weather data found for this time.");
    }
  } catch (error) {
    console.error("Error fetching historical weather data:", error.message);
    throw new Error("Error fetching historical weather data.");
  }
};

module.exports = { getLatLon };