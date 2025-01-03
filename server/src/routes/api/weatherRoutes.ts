import { Router, type Request, type Response } from 'express';
import capitalize from 'capitalize';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
  // TODO: GET weather data from city name
  const cityName = capitalize.words(req.body.cityName);
  const weather = await WeatherService.getWeatherForCity(cityName);
  
    // TODO: save city to search history
    await HistoryService.addCity(cityName);
    res.json(weather);    
  } catch (error) {
    res.status(500).json({ message: 'Cannot fetch weather data', error});
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => { 
try {
const history = await HistoryService.getCities();
res.json(history);
} catch (error) {
  res.status(500).json({ message: 'Cannot fetch city history', error});
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { 
  try {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.json({ message: `City ID ${id} removed from history`});
  } catch (error) {
    res.status(500).json({ message: 'Cannot remove city ID', error})
  }
  });
  
export default router;