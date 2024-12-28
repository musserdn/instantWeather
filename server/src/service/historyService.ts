import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const searchHistory = path.join(__dirname, '../../db/searchHistory.json');

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(
    name: string,
  ) {
    this.name = name;
    this.id = uuidv4();
  }
}


// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try{
    return await readFile(searchHistory, { flag: 'a+', encoding: 'utf8' });
    
    } catch (error) {
      console.log('Cannot read city history', error);
      throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    //the '\t' argument specifies that the output JSON string should be formatted with tab-indented whitespace for readability. 
    return writeFile(searchHistory, JSON.stringify(cities, null, '\t'));
  };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    let parsedCities: City[];
    // If cities isn't an array or can't be turned into one, send back a new empty array
    try {
      parsedCities = [].concat(JSON.parse(cities));
    } catch (error) {
      parsedCities = [];
      console.error('Cannot fetch city history', error);
    }
    return parsedCities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    if (!cityName) {
      throw new Error('City cannot be blank');
    }

    // Add a unique id to the city using uuid package
    const newCity = new City(cityName);
    const cities = await this.getCities();
    const updatedCities = [...cities, newCity];
    await this.write(updatedCities);
    return newCity;

    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    // async removeCity(id: string) {


    // }
  }
}


export default new HistoryService;
