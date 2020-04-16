import { ApiClientHelper, } from '../utils/ApiClientHelper';
import { Configurations, } from '../Configurations';

const toCurrentWeather = response => {
    const weather = {};

    weather.summary         = response.currently.summary;
    weather.icon            = response.currently.icon;
    weather.temperature     = response.currently.temperature;
    weather.humidity        = response.currently.humidity;
    weather.precipIntensity = response.currently.precipIntensity;
    weather.windSpeed       = response.currently.windSpeed;
    weather.uvIndex         = response.currently.uvIndex;

    return weather;
};

const toHourlyWeathers = response => {
    const weathers = [];

    for (let i = 0; i < Configurations.FORECAST_HOURS; i++) {
        const weather = {};

        weather.time              = response.hourly.data[i].time * 1000;
        weather.icon              = response.hourly.data[i].icon;
        weather.temperature       = response.hourly.data[i].temperature;
        weather.humidity          = response.hourly.data[i].humidity;
        weather.precipProbability = response.hourly.data[i].precipProbability;
        weather.precipIntensity   = response.hourly.data[i].precipIntensity;
        weather.windSpeed         = response.hourly.data[i].windSpeed;
        weather.uvIndex           = response.hourly.data[i].uvIndex;

        weathers.push(weather);
    }

    return weathers;
};

const toDailyWeathers = response => {
    const weathers = [];

    for (let i = 1; i < Configurations.FORECAST_DAYS + 1; i++) {
        const weather = {};

        weather.time              = response.daily.data[i].time * 1000;
        weather.summary           = response.daily.data[i].summary;
        weather.icon              = response.daily.data[i].icon;
        weather.temperatureHigh   = response.daily.data[i].temperatureHigh;
        weather.temperatureLow    = response.daily.data[i].temperatureLow;
        weather.humidity          = response.daily.data[i].humidity;
        weather.precipProbability = response.daily.data[i].precipProbability;
        weather.precipIntensity   = response.daily.data[i].precipIntensity;
        weather.windSpeed         = response.daily.data[i].windSpeed;
        weather.uvIndex           = response.daily.data[i].uvIndex;

        weathers.push(weather);
    }

    return weathers;
};

export const DarkSkyApiClient = {};

DarkSkyApiClient.getWeather = (latitude, longitude, locale) => ApiClientHelper.request(
    `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${latitude},${longitude}?exclude=minutely,alerts,flags&extend=hourly&units=si&lang=${locale}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}') or longitude ('${longitude}')`,
    body => ({
        current : toCurrentWeather(body),
        hourly  : toHourlyWeathers(body),
        daily   : toDailyWeathers(body),
    })
);
