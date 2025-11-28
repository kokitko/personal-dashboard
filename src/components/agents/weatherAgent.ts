const weatherApi: string = "https://api.openweathermap.org/data/3.0/onecall"
const locationApi: string = "http://api.openweathermap.org/geo/1.0/direct"

interface LocationData {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

interface WeatherData {
    current: {
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        wind_speed: number;
        weather: {
            main: string;
            description: string;
            icon: string;
        }
    }
}