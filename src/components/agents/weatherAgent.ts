const weatherApi: string = "https://api.openweathermap.org/data/2.5/weather"
const locationApi: string = "http://api.openweathermap.org/geo/1.0/direct"

export interface LocationData {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

export interface Weather {
    description: string;
    icon: string;
    main: string;
}

export interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    }
    weather: Array<Weather>;
    wind: {
        speed: number;
    }
}

export const fetchLocation = async (city: string, apiKey: string) => {
    try {
        const response = await fetch(`${locationApi}?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: LocationData[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching location:', error);
        throw error;
    }
};

export const fetchWeather = async (lat: number, lon: number, apiKey: string) => {
    try {
        const response = await fetch(`${weatherApi}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching weather:', error);
        throw error;
    }
};