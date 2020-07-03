import { Location, } from './models/Location';
import { Constants } from './Constants';

export const Configurations = {};

Configurations.APP_NAME    = 'WeatherBear';
Configurations.APP_VERSION = '1.0.0';
Configurations.UPDATE_URL  = 'https://raw.githubusercontent.com/ayltai/weatherbear/master/package.json';

Configurations.TRAY_ICON_SIZE = process.platform === 'darwin' ? 22 : process.platform === 'win32' ? '16' : '24';

Configurations.FORECAST_HOURS = 8;
Configurations.FORECAST_DAYS  = 4;

Configurations.LOCATION           = new Location(22.3080, 113.9185, 'Hong Kong International Airport, Sky Plaza Road, Chek Lap Kok');
Configurations.UI_UPDATE_INTERVAL = 1000 * 20;
Configurations.REFRESH_INTERVAL   = 1000 * 60 * 30;
Configurations.IS_AUTO_LAUNCH     = process.env.NODE_ENV !== 'development';
Configurations.IS_MILITARY_TIME   = false;

Configurations.DOCUMENTATION_URL = 'https://github.com/ayltai/weatherbear/blob/master/README.md';
Configurations.LICENSE_URL       = 'https://github.com/ayltai/weatherbear/blob/master/LICENSE';
Configurations.ISSUES_URL        = 'https://github.com/ayltai/weatherbear/issues';

Configurations.WEATHER_SOURCES = [
    {
        label : 'Dark Sky',
        value : Constants.TYPE_DARK_SKY,
    },
    {
        label : 'AccuWeather',
        value : Constants.TYPE_ACCU_WEATHER,
    },
    {
        label : 'Weatherbit',
        value : Constants.TYPE_WEATHER_BIT,
    },
];

Configurations.REFRESH_INTERVALS = [
    {
        label : '10 minutes',
        value : 1000 * 60 * 10,
    },
    {
        label : '15 minutes',
        value : 1000 * 60 * 15,
    },
    {
        label : '30 minutes',
        value : 1000 * 60 * 30,
    },
    {
        label : '60 minutes',
        value : 1000 * 60 * 60,
    },
];

Configurations.UNITS = [
    {
        label : 'SI (°C, km)',
        value : Constants.UNIT_SI,
    },
    {
        label : 'Imperial (°F, mile)',
        value : Constants.UNIT_IMPERIAL,
    },
];

Configurations.FORECAST = [
    {
        label : 'Temperature, precipitation, humidity',
        value : 'humidity',
    },
    {
        label : 'Temperature, precipitation, wind speed',
        value : 'windSpeed',
    },
    {
        label : 'Temperature, precipitation, UV index',
        value : 'uvIndex',
    },
];

Configurations.LOCALES = [
    {
        label : 'English',
        value : 'en',
    },
    {
        label : '繁體中文',
        value : 'zh-tw',
    },
];

Configurations.createPalette = isDarkMode => ({
    primary   : {
        main  : '#2196f3',
        light : '#2196f3',
        dark  : '#1976d2',
    },
    secondary : {
        main  : '#ff9800',
        light : '#ff9800',
        dark  : '#f57c00',
    },
    info      : {
        main  : '#00bcd4',
        light : '#00bcd4',
        dark  : '#0097a7',
    },
    type      : isDarkMode ? 'dark' : 'light',
});
