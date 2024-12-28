import dotenv from 'dotenv';
// import { error } from 'node:console';
dotenv.config();
import dayjs from 'dayjs';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  cityName: string;
  date: string;
  temp: number; // Unit imperial:Fahrenheit
  feelsLike: number; // Unit imperial:Fahrenheit
  tempMin: number; // Unit imperial:Fahrenheit
  tempMax: number; // Unit imperial:Fahrenheit
  pressure: number; // Unit hPa
  humidity: number; // Unit %
  icon: string;
  description: string;

  constructor(
    cityName: string,
    date: string,
    temp: number,
    feelsLike: number,
    tempMin: number,
    tempMax: number,
    pressure: number,
    humidity: number,
    icon: string,
    description: string
  ) {
    this.cityName = cityName;
    this.date = date;
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.pressure = pressure;
    this.humidity = humidity;
    this.icon = icon;
    this.description = description;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  cityName: string;
  constructor(
    baseURL: string = process.env.WEATHER_API_URL || 'https://api.openweathermap.org',
    APIkey: string = process.env.WEATHER_API_KEY || '{API key}',
    cityName: string = 'Denver'
  ) {
    this.baseURL = baseURL;
    this.APIkey = APIkey;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const geocode = await fetch(query);
      return geocode.json();
    } catch (error) {
      console.log('Error fetching location data:', error)
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    if (!locationData || typeof locationData.lat !== 'number' || typeof locationData.lon !== 'number') {
      console.log('Invalid location data:', locationData);
      throw new Error('Invalid location data');
    }

    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName},,US&limit=1&appid=${this.APIkey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geoquery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geoquery);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const Wxquery = this.buildWeatherQuery(coordinates);
    try {
      const weather = await fetch(Wxquery);
      return weather.json();
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const currentWeather = response.list[0];
    const parsedDate = dayjs(currentWeather.dt_txt).format('MM/DD/YYYY');
    return new Weather(
      this.cityName,
      parsedDate || 'Today',
      currentWeather.main.temp || 0,
      currentWeather.main.feels_like || 0,
      currentWeather.main.temp_min || 0,
      currentWeather.main.temp_max || 0,
      currentWeather.main.pressure || 0,
      currentWeather.main.humidity || 0,
      currentWeather.weather[0].icon || '01d',
      currentWeather.weather[0].description || 'Clear sky'
    )
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const fiveDayForecast = weatherData.filter((data) => {
      return data.dt_txt.includes('12:00:00');
    });
    const forecastArray: any[] = [];
    for (let i = 0; i < fiveDayForecast.length; i++) {
      forecastArray.push(this.parseCurrentWeather(fiveDayForecast[i]));
    }
    return [currentWeather, ...forecastArray];
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
try {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    return forecastArray
  } catch (error) {
    console.log('Error fetching weather data:', error);
    throw error;
  }
}
};

export default new WeatherService();
