// src/Weather.js
import React, { useState } from 'react';
import './Weather.css'; // Assuming you have a CSS file for styling

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '296ccc625edc465ebeb111247243108'; // Replace with your actual API key

  const handleSearch = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading-message">Loading data…</p>}

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <div className="weather-info">
              <div className="weather-box">
                <p className="weather-label">Temperature</p>
                <p className="weather-value">{weather.current.temp_c}°C</p>
              </div>
              <div className="weather-box">
                <p className="weather-label">Humidity</p>
                <p className="weather-value">{weather.current.humidity}%</p>
              </div>
              <div className="weather-box">
                <p className="weather-label">Condition</p>
                <p className="weather-value">{weather.current.condition.text}</p>
              </div>
              <div className="weather-box">
                <p className="weather-label">Wind Speed</p>
                <p className="weather-value">{weather.current.wind_kph} kph</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
