import { ApiClientHelper, } from '../utils/ApiClientHelper';
import { Configurations, } from '../Configurations';

const toCurrentWeather = response => {
    const weather = {};

    weather.summary         = response[0].WeatherText;
    weather.icon            = response[0].WeatherIcon;
    weather.temperature     = response[0].Temperature.Metric.Value;
    weather.humidity        = response[0].RelativeHumidity / 100;
    weather.precipIntensity = response[0].PrecipitationSummary.Precipitation.Metric.Value;
    weather.windSpeed       = response[0].Wind.Speed.Metric.Value;
    weather.uvIndex         = response[0].UVIndex;

    return weather;
};

const toHourlyWeathers = response => {
    const weathers = [];

    for (let i = 0; i < Configurations.FORECAST_HOURS; i++) {
        const weather = {};

        weather.time              = response[i].EpochDateTime * 1000;
        weather.icon              = response[i].WeatherIcon;
        weather.temperature       = response[i].Temperature.Value;
        weather.humidity          = response[i].RelativeHumidity / 100;
        weather.precipProbability = response[i].PrecipitationProbability / 100;
        weather.precipIntensity   = response[i].TotalLiquid.Value;
        weather.windSpeed         = response[i].Wind.Speed.Value;
        weather.uvIndex           = response[i].UVIndex;

        weathers.push(weather);
    }

    return weathers;
};

const toDailyWeathers = response => {
    const weathers = [];

    for (let i = 1; i < Configurations.FORECAST_DAYS + 1; i++) {
        const weather = {};

        weather.time              = response.DailyForecasts[i].EpochDateTime * 1000;
        weather.summary           = response.DailyForecasts[i].Day.LongPhrase;
        weather.icon              = response.DailyForecasts[i].Day.Icon;
        weather.temperatureHigh   = response.DailyForecasts[i].Temperature.Maximum.Value;
        weather.temperatureLow    = response.DailyForecasts[i].Temperature.Minimum.Value;
        weather.precipProbability = response.DailyForecasts[i].Day.PrecipitationProbability / 100;
        weather.precipIntensity   = response.DailyForecasts[i].Day.TotalLiquid.Value;
        weather.windSpeed         = response.DailyForecasts[i].Day.Wind.Speed.Value;

        const forecast = response.DailyForecasts[i].AirAndPollen.filter(entry => entry.Name === 'UVIndex')[0];
        if (forecast) weather.uvIndex = forecast.Value;

        weathers.push(weather);
    }

    return weathers;
};

const getLocationKey = (latitude, longitude) => ApiClientHelper.request(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&q=${latitude}%2C${longitude}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => body.Key
);

const getCurrentWeather = (locationKey, locale) => ApiClientHelper.request(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&details=true&language=${locale}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toCurrentWeather(body)
);

const getHourlyWeather = (locationKey, locale) => ApiClientHelper.request(
    `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&details=true&metric=true&language=${locale}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toHourlyWeathers(body)
);

const getDailyWeather = (locationKey, locale) => ApiClientHelper.request(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&details=true&metric=true&language=${locale}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toDailyWeathers(body)
);

export const AccuWeatherApiClient = {};

AccuWeatherApiClient.getWeather = (latitude, longitude, locale) => {
    return new Promise((resolve, reject) => getLocationKey(latitude, longitude)
        .then(locationKey => Promise.all([
            getCurrentWeather(locationKey, locale),
            getHourlyWeather(locationKey, locale),
            getDailyWeather(locationKey, locale),
        ]).then(results => resolve({
            current : results[0],
            hourly  : results[1],
            daily   : results[2],
        }))).catch(error => reject(error)));
};
