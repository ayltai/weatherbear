import { ApiClientHelper, } from '../utils/ApiClientHelper';
import { Configurations, } from '../Configurations';

const toCurrentWeather = response => {
    const weather = {};

    weather.summary         = response.data[0].weather.description;
    weather.icon            = response.data[0].weather.code;
    weather.temperature     = response.data[0].temp;
    weather.humidity        = response.data[0].rh / 100;
    weather.precipIntensity = response.data[0].precip;
    weather.windSpeed       = Math.round(response.data[0].wind_spd * 3.6);
    weather.uvIndex         = Math.round(response.data[0].uv);

    return weather;
};

const toHourlyWeather = response => {
    const weathers = [];

    for (let i = 0; i < Configurations.FORECAST_HOURS; i++) {
        const weather = {};

        weather.time              = response.data[i].ts * 1000;
        weather.icon              = response.data[i].weather.code;
        weather.temperature       = response.data[i].temp;
        weather.humidity          = response.data[i].rh / 100;
        weather.precipProbability = response.data[i].pop / 100;
        weather.precipIntensity   = response.data[i].precip;
        weather.windSpeed         = Math.round(response.data[i].wind_spd * 3.6);
        weather.uvIndex           = Math.round(response.data[i].uv);

        weathers.push(weather);
    }

    return weathers;
};

const toDailyWeather = response => {
    const weathers = [];

    for (let i = 1; i < Configurations.FORECAST_DAYS + 1; i++) {
        const weather = {};

        weather.time              = response.data[i].ts * 1000;
        weather.summary           = response.data[i].weather.description;
        weather.icon              = response.data[i].weather.code;
        weather.temperatureHigh   = response.data[i].max_temp;
        weather.temperatureLow    = response.data[i].min_temp;
        weather.humidity          = response.data[i].rh / 100;
        weather.precipProbability = response.data[i].pop / 100;
        weather.precipIntensity   = response.data[i].precip;
        weather.windSpeed         = Math.round(response.data[i].wind_spd * 3.6);
        weather.uvIndex           = Math.round(response.data[i].uv);

        weathers.push(weather);
    }

    return weathers;
};

const getCurrentWeather = (latitude, longitude, locale) => ApiClientHelper.request(
    `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHER_BIT_API_KEY}&lat=${latitude}&lon=${longitude}&lang=${locale}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toCurrentWeather(body)
);

const getHourlyWeather = (latitude, longitude, locale) => ApiClientHelper.request(
    `https://api.weatherbit.io/v2.0/forecast/hourly?key=${process.env.REACT_APP_WEATHER_BIT_API_KEY}&lat=${latitude}&lon=${longitude}&lang=${locale}&hours=${Configurations.FORECAST_HOURS}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toHourlyWeather(body)
);

const getDailyWeather = (latitude, longitude, locale) => ApiClientHelper.request(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_BIT_API_KEY}&lat=${latitude}&lon=${longitude}&lang=${locale}&days=${Configurations.FORECAST_DAYS + 1}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toDailyWeather(body)
);

export const WeatherbitApiClient = {};

WeatherbitApiClient.getWeather = (latitude, longitude, locale) => {
    return new Promise((resolve, reject) => Promise.all([
        getCurrentWeather(latitude, longitude, locale),
        getHourlyWeather(latitude, longitude, locale),
        getDailyWeather(latitude, longitude, locale),
    ]).then(results => resolve({
        current : results[0],
        hourly  : results[1],
        daily   : results[2],
    })).catch(error => reject(error)));
};
