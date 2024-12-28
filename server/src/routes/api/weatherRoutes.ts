import { Router, type Request, type Response } from 'express';
const router = Router();

import historyService from '../../service/historyService.js';
// import weatherService from '../../service/weatherService.js';
// import { error } from 'console';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.body.cityName;
  // await weatherService.getWeatherForCity(city).then((weather) => {
    // TODO: save city to search history
    historyService.addCity(city);
    res.send('City added to search history and weather data retrieved');
  });
// });

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => { 
try {
const history = await historyService.getCities();
res.json(history);
} catch (error) {
  res.status(500).json({ message: 'Cannot fetch city history', error});
}
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => { 
// try {



// } catch (error) {



// }
// });

export default router;