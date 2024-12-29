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
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number; // Unit imperial:Fahrenheit
  windSpeed: number; // Unit imperial:mph
  humidity: number; // Unit imperial:percentage
  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  city: string;
  constructor(
    baseURL: string = process.env.API_BASE_URL || 'https://api.openweathermap.org',
    APIkey: string = process.env.API_KEY || '{API key}',
    city: string = 'Denver'
  ) {
    this.baseURL = baseURL;
    this.APIkey = APIkey;
    this.city = city;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      return await fetch(query);
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
    return `${this.baseURL}/geo/1.0/direct?q=${this.city},,US&limit=1&appid=${this.APIkey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?units=imperial&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geoquery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geoquery);
    const parsedLocation = await locationData.json();
    console.log('City data was retrived as:', parsedLocation[0].name); //name is the city 
    if (parsedLocation[0].name.length === 0) { throw new Error('Invalid city'); } //name is the city 
    return this.destructureLocationData(parsedLocation[0]);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const Wxquery = this.buildWeatherQuery(coordinates);
    try {
      const weather = await fetch(Wxquery);
      console.log(`fetchWeatherData:${weather.status} code: ${weather.statusText}`);
      return weather.json();
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const parsedDate = dayjs(response.dt_txt).format('MM/DD/YYYY h:mm a Z');
     return new Weather(
      this.city,
      parsedDate || 'Today',
      response.weather[0].icon || '01d',
      response.weather[0].description || 'Clear sky',
      response.main.temp || 0,
      response.wind.speed || 0,
      response.main.humidity || 0,
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const fiveDayForecast = weatherData.filter((data) => {
      return data.dt_txt.includes('18:00:00');
    });
    const forecastArray: Weather[] = [];
    for (let i = 0; i < fiveDayForecast.length; i++) {
      forecastArray.push(this.parseCurrentWeather(fiveDayForecast[i]));
    }
    return [currentWeather, ...forecastArray];
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      this.city = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      console.log('Location data coordinates were retrived as:', coordinates);
      const weatherData = await this.fetchWeatherData(coordinates);
      console.log(`Weather data received status code ${weatherData.cod} and count ${weatherData.cnt} which should be 40`);
      const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
      console.log(`current weather: ${currentWeather.iconDescription}`)
      const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
      return forecastArray
    } catch (error) {
      console.log('Error fetching weather data:', error);
      throw error;
    }
  }
};

export default new WeatherService();
