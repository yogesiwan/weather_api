# Weather Data API

This API fetches and stores historical weather data for a specific location based on a pincode. It uses the OpenWeather API to retrieve historical weather information for a given date range, which is then stored in a MongoDB database to avoid redundant API requests.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Database Structure](#database-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## Features

- Fetches historical weather data for a given location and date
- Caches weather data in MongoDB to prevent duplicate requests
- Uses a unique index to ensure only one entry per pincode and date-time combination
- Retrieves data from the database if already available, reducing API calls and response time

## Technologies

- **Node.js**: JavaScript runtime for building scalable applications
- **Express**: Web framework for handling routes and middleware
- **MongoDB**: NoSQL database for storing weather data
- **Mongoose**: ODM for MongoDB, simplifying data modeling and validation
- **OpenWeather API**: Provides historical weather data based on latitude and longitude

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-data-api.git
   cd weather-data-api

	2.	Install dependencies

npm install


	3.	Set up MongoDB: Ensure MongoDB is running locally, or use a cloud MongoDB service (e.g., MongoDB Atlas).
	4.	Create an OpenWeather API Key: Sign up at OpenWeather and generate an API key.
	5.	Configure Environment Variables:
	•	Create a .env file in the project root and add your environment variables as follows:

PORT=3000
MONGODB_URI=<your_mongo_db_connection_uri>
API_KEY=<your_openweather_api_key>


	6.	Run the application

npm start

The server will start on http://localhost:3000 by default.

Environment Variables

	•	PORT: The port on which the server will run (default: 3000).
	•	MONGODB_URI: MongoDB connection URI for the database.
	•	API_KEY: Your OpenWeather API key.

API Endpoints

Fetch Historical Weather Data

GET /api/weather/:pincode/:day/:month/:year

Description: Fetches historical weather data for the specified pincode and date. If data exists in the database, it will be returned directly. If not, data will be fetched from the OpenWeather API, stored in the database, and returned.

Parameters:
	•	pincode (string): Location pincode
	•	day (integer): Day of the month (1-31)
	•	month (integer): Month of the year (1-12)
	•	year (integer): Four-digit year (e.g., 2024)

Response:
	•	Returns an array of weather records for each hour of the specified day, including:
	•	Temperature
	•	Pressure
	•	Humidity
	•	Wind speed, gust, and degree
	•	Cloud coverage
	•	Weather description

Example Request:

GET /api/weather/110043/5/10/2024

Sample Response:

[
  {
    "pincode": "110043",
    "day": "5",
    "month": "10",
    "year": "2024",
    "date": "10/5/2024, 5:30:00 AM",
    "temperature": "27.09 °C",
    "pressure": 1006,
    "humidity": 83,
    "windSpeed": 2.57,
    "windGust": null,
    "windDegree": 220,
    "cloudCoverage": 20,
    "weatherDescription": "mist"
  }
]

Error Handling

Errors are returned with appropriate HTTP status codes:
	•	400 Bad Request: For invalid input or missing parameters.
	•	404 Not Found: When no weather data is found for the given date.
	•	500 Internal Server Error: For server-side issues.

Database Structure

The MongoDB collection stores weather data with fields such as pincode, date, temperature, pressure, humidity, windSpeed, windGust, windDegree, cloudCoverage, and weatherDescription.

Future Improvements

	•	Implement data aggregation for longer date ranges.
	•	Add user authentication to restrict API access.
	•	Implement rate limiting to prevent abuse.
	•	Support more weather parameters and analysis.

Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.
