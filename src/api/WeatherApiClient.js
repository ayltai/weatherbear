import { AccuWeatherApiClient, } from '../api/AccuWeatherApiClient';
import { DarkSkyApiClient, } from '../api/DarkSkyApiClient';
import { WeatherbitApiClient, } from '../api/WeatherbitApiClient';
import { WeatherHelper, } from '../utils/WeatherHelper';

export const WeatherApiClient = {};

WeatherApiClient.getWeather = (source, latitude, longitude, locale) => {
    if (source === WeatherHelper.TYPE_ACCU_WEATHER) return AccuWeatherApiClient.getWeather(latitude, longitude, locale);
    if (source === WeatherHelper.TYPE_DARK_SKY)     return DarkSkyApiClient.getWeather(latitude, longitude, locale);
    if (source === WeatherHelper.TYPE_WEATHER_BIT)  return WeatherbitApiClient.getWeather(latitude, longitude, locale);

    throw new Error(`Unknown weather source type ${source}`);
};
