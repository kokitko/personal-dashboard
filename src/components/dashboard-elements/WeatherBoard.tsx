import React, { useEffect, useState } from 'react';
import './elements.css'

import { LocationData, WeatherData, fetchLocation, fetchWeather } from '../agents/weatherAgent';

const WeatherBoard = () => {

    const [city, setCity] = useState<string>("Tokyo");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [cityData, setCityData] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const locations: LocationData[] = await fetchLocation(city);

            if (locations && locations.length > 0) {
                const location: LocationData = locations[0];

                setCityData(location);

                const weather: WeatherData = await fetchWeather(location.lat, location.lon);
                setWeatherData(weather);
            } else {
                setError("City not found");
            }
        } catch (err) {
            setError("Failed to fetch weather data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSubmit(new Event('submit') as any);
    }, []);

    return (<div className="weather-board">
        <div className="weather-main">
            <form className="weather-search" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="weather-search-input" />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="weather-search-btn">
                    {loading ? "Loading..." : "Search"}
                </button>
            </form>
             
            {weatherData && cityData && (error === "" || error === undefined) ? (
                <div className="weather-info">
                    <div className="weather-info-header">
                        <h2 className="weather-info-city">{cityData.name}, {cityData.country}</h2>
                        <div className="weather-info-img-container">
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                className="weather-info-img" 
                                alt="weather icon" />
                        </div>
                    </div>
                    <div className="stat-weather-container">
                        <span className="weather-temp">Temperature: {weatherData.main.temp} °C</span>
                        <span className="weather-feels-like">Feels like: {weatherData.main.feels_like} °C</span>
                        <span className="weather-humidity">Humidity: {weatherData.main.humidity}% </span>
                        <span className="pressure">Pressure: {weatherData.main.pressure}</span>
                    </div>
                    <div className="main-weather-container">
                        <span className="weather-main">Condition: {weatherData.weather[0].main} ({weatherData.weather[0].description})</span>
                        <span className="weather-wind-speed">Wind Speed: {weatherData.wind.speed} m/s</span>
                    </div>
                </div>
            ) : <p className="weather-error">{error}</p>}
        </div>
    </div>);
}

export default WeatherBoard;