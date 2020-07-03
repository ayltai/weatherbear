import { Constants } from '../Constants';
import { AccuWeatherApiClient, } from './AccuWeatherApiClient';
import { DarkSkyApiClient, } from './DarkSkyApiClient';
import { WeatherbitApiClient, } from './WeatherbitApiClient';

export const WeatherApiClient = {};

WeatherApiClient.getWeather = (latitude, longitude, source = Constants.TYPE_DARK_SKY, apiKey = process.env.REACT_APP_DARK_SKY_API_KEY, hours = 8, days = 4, locale = 'en-US') => {
    if (source === Constants.TYPE_ACCU_WEATHER) return AccuWeatherApiClient.getWeather(latitude, longitude, apiKey, hours, days, locale);
    if (source === Constants.TYPE_DARK_SKY)     return DarkSkyApiClient.getWeather(latitude, longitude, apiKey, hours, days, locale);
    if (source === Constants.TYPE_WEATHER_BIT)  return WeatherbitApiClient.getWeather(latitude, longitude, apiKey, hours, days, locale);

    throw new Error(`Unknown weather source type ${source}`);
};
