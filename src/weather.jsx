import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weather, setWeather] = useState({});
    const [error, setError] = useState('');
    

    const fetchWeather = async () => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Islamabad,pk&APPID=0d7dc2eab54f68ab85c854b33a2afe0d`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (error) {
            setError("Error fetching weather data");
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
        <div className="relative w-full h-screen bg-sky-100 flex items-center justify-center">
            <div className="weather-container text-cyan-700 text-center p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
                <h1 className='text-5xl font-bold mb-6'>Weather App</h1>
                {error ? (
                    <p className="text-2xl">{error}</p>
                ) : weather && weather.main ? (
                    <div>
                        <p className="text-2xl">City: {weather.name}</p>
                        <p className="text-2xl">Temperature: {kelvinToCelsius(weather.main.temp)}°C</p>
                        <p className='text-2xl'>Weather: {weather.weather[0].description}</p>
                    </div>
                ) : (
                    <p className="text-2xl">Loading</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
