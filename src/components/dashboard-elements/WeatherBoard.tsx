import React, { useEffect, useState } from 'react';
import './elements.css'

import { LocationData, WeatherData, fetchLocation, fetchWeather } from '../agents/weatherAgent';
                    
const apiKey: string = "placeholder for apikey";

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
            const locations: LocationData[] = await fetchLocation(city, apiKey);

            if (locations && locations.length > 0) {
                const location: LocationData = locations[0];

                setCityData(location);

                const weather: WeatherData = await fetchWeather(location.lat, location.lon, apiKey);
                console.log(weather);
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
            {error && <p className="error">{error}</p>}
             
            {weatherData && cityData && (
                <div className="weather-info">
                </div>
            )}
        </div>
    </div>);
}

export default WeatherBoard;