import { RequestHelper, } from '../utils/RequestHelper';

const toCurrentlyWeather = response => {
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

const toHourlyWeather = (response, hours = 8) => {
    const weathers = [];

    for (let i = 0; i < hours; i++) {
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

const toDailyWeather = (response, days = 4) => {
    const weathers = [];

    for (let i = 1; i < days + 1; i++) {
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

const formatLocale = locale => locale.toLowerCase() === 'zh-tw' ? 'zh-tw' : locale.substr(0, 2).toLowerCase();

const getCurrentlyWeather = (latitude, longitude, apiKey = process.env.REACT_APP_WEATHER_BIT_API_KEY, locale = 'en-US') => RequestHelper.request(
    `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${latitude}&lon=${longitude}&lang=${formatLocale(locale)}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toCurrentlyWeather(body)
);

const getHourlyWeather = (latitude, longitude, apiKey = process.env.REACT_APP_WEATHER_BIT_API_KEY, hours = 8, locale = 'en-US') => RequestHelper.request(
    `https://api.weatherbit.io/v2.0/forecast/hourly?key=${apiKey}&lat=${latitude}&lon=${longitude}&lang=${formatLocale(locale)}&hours=${hours}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toHourlyWeather(body, hours)
);

const getDailyWeather = (latitude, longitude, apiKey = process.env.REACT_APP_WEATHER_BIT_API_KEY, days = 4, locale = 'en-US') => RequestHelper.request(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${latitude}&lon=${longitude}&lang=${formatLocale(locale)}&days=${days + 1}`,
    () => latitude && longitude,
    `Invalid latitude ('${latitude}) or longitude ('${longitude})`,
    body => toDailyWeather(body, days)
);

export const WeatherbitApiClient = {};

WeatherbitApiClient.getWeather = (latitude, longitude, apiKey = process.env.REACT_APP_WEATHER_BIT_API_KEY, hours = 8, days = 4, locale = 'en-US') => {
    return new Promise((resolve, reject) => Promise.all([
        getCurrentlyWeather(latitude, longitude, apiKey, locale),
        getHourlyWeather(latitude, longitude, apiKey, Math.min(120, Math.max(1, hours)), locale),
        getDailyWeather(latitude, longitude, apiKey, Math.min(15, Math.max(1, days)), locale),
    ]).then(results => resolve({
        currently : results[0],
        hourly    : results[1],
        daily     : results[2],
    })).catch(error => reject(error)));
};
