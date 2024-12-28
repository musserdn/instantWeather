import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const searchHistory = path.join(__dirname, '../../db/searchHistory.json');

// TODO: Define a City class with name and id properties
class City {
  cityName: string;
  cityID: string;

  constructor(
    cityName: string,
    cityID: string
  ) {
    this.cityName = cityName;
    this.cityID = cityID;
  }
}


// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await readFile(searchHistory, { flag: 'a+', encoding: 'utf8', });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    //the '\t' argument specifies that the output JSON string should be formatted with tab-indented whitespace for readability. 
    return await writeFile(searchHistory, JSON.stringify(cities, null, '\t'));
  };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      // If cities isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (error) {
        parsedCities = [];
        throw new Error('Cannot fetch city history');
      }
      return parsedCities;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    if (!cityName) {
      throw new Error('City cannot be blank');
    }

    // Add a unique id to the city using uuid package
    const newCity: City = {
      cityName: cityName,
      cityID: uuidv4(),
    };
    // Get all cities, add the new city, write all the updated cities, return the newCities
    return await this.getCities()
      .then((cities) => {
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }



  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {


  // }
}



export default new HistoryService();
