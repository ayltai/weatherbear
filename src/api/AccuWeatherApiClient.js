import { RequestHelper, } from '../utils/RequestHelper';

const toCurrentlyWeather = response => {
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

const toHourlyWeathers = (response, hours = 8) => {
    const weathers = [];

    for (let i = 0; i < hours; i++) {
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

const toDailyWeathers = (response, days = 4) => {
    const weathers = [];

    for (let i = 1; i < days + 1; i++) {
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

const formatLocale = locale => locale.toLowerCase();

const getLocationKey = (latitude, longitude, apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY) => RequestHelper.request(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => body.Key
);

const getCurrentlyWeather = (locationKey, apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY, locale = 'en-US') => RequestHelper.request(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true&language=${formatLocale(locale)}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toCurrentlyWeather(body)
);

const getHourlyWeather = (locationKey, apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY, hours = 8, locale = 'en-US') => RequestHelper.request(
    `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&details=true&metric=true&language=${formatLocale(locale)}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toHourlyWeathers(body, hours)
);

const getDailyWeather = (locationKey, apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY, days = 4, locale = 'en-US') => RequestHelper.request(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true&metric=true&language=${formatLocale(locale)}`,
    () => locationKey,
    `Invalid location key ('${locationKey}')`,
    body => toDailyWeathers(body, days)
);

export const AccuWeatherApiClient = {};

AccuWeatherApiClient.getWeather = (latitude, longitude, apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY, hours = 8, days = 4, locale = 'en-US') => {
    return new Promise((resolve, reject) => getLocationKey(latitude, longitude, apiKey)
        .then(locationKey => Promise.all([
            getCurrentlyWeather(locationKey, apiKey, locale),
            getHourlyWeather(locationKey, apiKey, Math.min(12, Math.max(1, hours)), locale),
            getDailyWeather(locationKey, apiKey, Math.min(4, Math.max(1, days)), locale),
        ]).then(results => resolve({
            currently : results[0],
            hourly    : results[1],
            daily     : results[2],
        }))).catch(error => reject(error)));
};
