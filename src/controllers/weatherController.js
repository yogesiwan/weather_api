const { getLatLon } = require('../services/weatherService');

const getWeatherData = async (req, res) => {
  const { pincode, day, month, year } = req.params;

  try {
    const weatherData = await getLatLon(pincode, day, month, year);
    if (!weatherData) {
      throw new Error("No weather data found.");
    }
    res.json({ success: true, weatherData });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getWeatherData };