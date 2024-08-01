import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = '0d7dc2eab54f68ab85c854b33a2afe0d'; 
    const city = 'Karachi'; 

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Karachi,pk&APPID=0d7dc2eab54f68ab85c854b33a2afe0d
`);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching weather data');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 5000); 
        return () => clearInterval(interval); 
    }, []);

    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed(2);
    };

    return (
        <div>
        <div className="weather-container">
            <h1>Weather App</h1>
            {error ? (
                <p className="App-paragraph">{error}</p>
            ) : weather ? (
                <div>
                    <p className="App-paragraph">City: {weather.name}</p>
                    <p className="App-paragraph">Temperature: {kelvinToCelsius(weather.main.temp)}°C</p>
                </div>
            ) : (
                <p className="App-paragraph">Loading...</p>
            )}            
        </div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>
        </div>
    );
};

export default Weather;
