
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
    sys: {
        country: string
    }
    name: string;
}

const backendApi = process.env.REACT_APP_BACKEND_API_URL;

export const fetchWeather = async (city: string) => {
    try {
        const response = await fetch(`${backendApi}/weather?city=${city}`);
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
