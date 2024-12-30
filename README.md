# instantWeather

## Description
instantWeather is a weather dashboard that gives you the current report and a 5-day forecast for the cities that you choose. It will provide you the temperature in Fahrenheit, wind in miles-per-hour, and humidity as a percent rounded to the nearest whole number. The app come preloaded with cities around the United States for you to choose from. If you add a city of your own, it will save that city to the search history.

This app is great for the frequent traveler that had a desire to keep track of weather across the United States to plan out adventures that avoid inclement weather.

### Limitations 
- This app only searches by City name. Since there are multiple cities around the world that have the same name; this app pulls only the top-most city from [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api) for the United States (US).
- The app will add the city each time you click Search or on a city in the history. A workaround is to delete any duplicate cities using the trash can.
- The app isn't aware of what timezone each city is in, therefore it will parse the date and show you in your local browser's time. Example: you're in Los Angeles at 10PM and look up weather in New York. It will show the current date of Los Angeles and not the tomorrow date where the weather is forecasted for.

 ## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Credits](#credits)
 - [License](#license)
 - [Badges](#badges)
 - [Tests](#tests)
 - [Questions](#questions)
  

  ## [Installation](#installation)
  Clone this repo locally and then install dependencies by running the script `npm run install` in your terminal from the root. To start up your server and client run `npm run start:dev`. This will use dev dependencies to compile and run the program and open your web browers to `localhost:PORT`.

  ## [Usage](#usage)
  Use this to store cities for instant viewing of weather. A live version of the deployed webapp is available at [instantWeather](https://instantweather.onrender.com).
  
  > 1. Navigate to app locally or at the link above;
  > 2. Either select existing city or search for new one;
  > 3. Review the forecast and move onto your next city;
  > 4. Click the trash can to the right of the city to remove;
  > 5. Come back and try again before your next adventure!

  ### Application Screenshot
  ![Weather Dashboard Screenshot](.//Assets/iweather_screenshot.png)

  ## [Credits](#credits)
  This project is hosted on [Render](https://render.com/about) and uses 
  - [bootstrap](https://getbootstrap.com/)
  - [capitalize](https://www.npmjs.com/package/capitalize)
  - [dayjs](https://www.npmjs.com/package/dayjs)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express](https://expressjs.com/)
  - [fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
  - [Inquirer.js](https://www.npmjs.com/package/inquirer)
  - [TypeScript](https://www.typescriptlang.org/)
  - [uuid](https://www.npmjs.com/package/uuid)
  - In Dev
    - [concurrently](https://www.npmjs.com/package/concurrently)
    - [nodemon](https://www.npmjs.com/package/nodemon)
    - [vite](https://www.npmjs.com/package/vite)
    - [wait-on](https://www.npmjs.com/package/wait-on)
  
  ## [License](#license)
  This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details.

  ## [Badges](#badges)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## [Tests](#tests)
  Run `npm run install` followed by `npm run start:dev` and validate dist files output, server starts, web browser opens and application functions. Logs are available on server side and on client side to validate where any errors may be occurring.
  
  ## [Questions](#questions)
  If you have any questions, please feel free to reach out to me at musserdn@gmail.com or visit my [GitHub Profile](https://github.com/musserdn/).