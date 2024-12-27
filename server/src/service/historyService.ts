import { writeFile } from "node:fs";
import path from "node:path";

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(
    name: string,
    id: string
  ) {
    this.name = name;
    this.id = id;
  }
}


// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): cities[]: string {
  const history = await readFile(path.join(__dirname, '../../db/searchHistory.json'), 'utf8');
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
private async write(cities: City[]) {
const city = req.body.cityName;
try { 
 const historydb = await readFile(path.join(__dirname, '../../db/searchHistory.json'), 'utf8');
 const updatedDb = JSON.parse(historydb);
 updatedDb.push(city);
 await writeFile(path.join(__dirname, '../../db/searchHistory.json'), JSON.stringify(updatedDb));
 res.json({ message: 'Success: added city to search history' });


} catch (error) {
  res.status(500).json({ message: 'Cannot fetch city history', error});
}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {


  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {

  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
async removeCity(id: string) {


}

}}

export default new HistoryService();
