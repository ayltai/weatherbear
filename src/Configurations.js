import { Location, } from './models/Location';
import { Conversions, } from './utils/Conversions';
import { Numbers, } from './utils/Numbers';
import { WeatherHelper, } from './utils/WeatherHelper';

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
        value : WeatherHelper.TYPE_DARK_SKY,
    },
    {
        label : 'AccuWeather',
        value : WeatherHelper.TYPE_ACCU_WEATHER,
    },
    {
        label : 'Weatherbit',
        value : WeatherHelper.TYPE_WEATHER_BIT,
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
        value : 'si',
    },
    {
        label : 'Imperial (°F, mile)',
        value : 'imperial',
    },
];

Configurations.FORECAST = [
    {
        label : 'Temperature, precipitation, humidity',
        value : 'humidity',
    },
    {
        label : 'Temperature, precipitation, wind speed',
        value : 'wind',
    },
    {
        label : 'Temperature, precipitation, UV index',
        value : 'uv',
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

Configurations.createChartData = (theme, isDarkMode, forecast, t) => ({
    labels   : [],
    datasets : [
        {
            label           : t('8-hour forecast'),
            yAxisID         : 'temp',
            order           : 2,
            data            : [],
            pointStyle      : [],
            pointHitRadius  : 10,
            fill            : false,
            backgroundColor : isDarkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
            borderColor     : isDarkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
        },
        {
            label           : '',
            yAxisID         : 'precip',
            order           : 3,
            data            : [],
            pointRadius     : 0,
            pointHitRadius  : 10,
            fill            : true,
            backgroundColor : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
            borderColor     : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
        },
        {
            label : '',
            order : 4,
            data  : [],
        },
        {
            label           : '',
            //yAxisID         : forecast === 'humidity' ? 'humidity' : null,
            yAxisID         : 'humidity',
            order           : forecast === 'humidity' ? 5 : 0,
            data            : [],
            pointRadius     : 0,
            pointHitRadius  : 10,
            fill            : false,
            backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
            borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
        },
        {
            label           : '',
            //yAxisID         : forecast === 'wind' ? 'wind' : null,
            yAxisID         : 'wind',
            order           : forecast === 'wind' ? 5 : 0,
            data            : [],
            pointRadius     : 0,
            pointHitRadius  : 10,
            fill            : false,
            backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
            borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
        },
        {
            label           : '',
            //yAxisID         : forecast === 'uv' ? 'uv' : null,
            yAxisID         : 'uv',
            order           : forecast === 'uv' ? 5 : 0,
            data            : [],
            pointRadius     : 0,
            pointHitRadius  : 10,
            fill            : false,
            backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
            borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
        },
    ],
});

Configurations.createChartScales = (theme, preferences, min, max) => ({
    xAxes : [
        {
            gridLines : {
                drawOnChartArea : false,
                color           : theme.palette.text.primary,
                zeroLineColor   : theme.palette.text.primary,
            },
        },
        {
            display : false,
        },
    ],
    yAxes : [
        {
            id        : 'temp',
            position  : 'left',
            gridLines : {
                drawOnChartArea : false,
                color           : theme.palette.text.primary,
                zeroLineColor   : theme.palette.text.primary,
            },
            ticks     : {
                min      : min,
                max      : max,
                stepSize : max,
                callback : label => `${label}${preferences.temperatureUnitSymbol}`,
            },
        },
        {
            id      : 'precip',
            display : false,
            ticks   : {
                min      : 0,
                max      : 100,
                stepSize : 50,
            },
        },
        {
            id        : 'humidity',
            display   : preferences.forecast === 'humidity',
            position  : 'right',
            gridLines : {
                drawOnChartArea : false,
                color           : theme.palette.text.primary,
                zeroLineColor   : theme.palette.text.primary,
            },
            ticks     : {
                min      : 0,
                max      : 100,
                stepSize : 50,
                callback : label => `${label}%`,
            },
        },
        {
            id        : 'wind',
            display   : preferences.forecast === 'wind',
            position  : 'right',
            gridLines : {
                drawOnChartArea : false,
                color           : theme.palette.text.primary,
                zeroLineColor   : theme.palette.text.primary,
            },
            ticks     : {
                min      : 0,
                max      : preferences.units === 'si' ? 200 : 120,
                stepSize : preferences.units === 'si' ? 50 : 30,
                callback : label => `${label}${preferences.speedUnitSymbol}`,
            },
        },
        {
            id        : 'uv',
            display   : preferences.forecast === 'uv',
            position  : 'right',
            gridLines : {
                drawOnChartArea : false,
                color           : theme.palette.text.primary,
                zeroLineColor   : theme.palette.text.primary,
            },
            ticks     : {
                min      : 0,
                max      : 12,
                stepSize : 2,
                callback : label => `${label}`,
            },
        },
    ],
});

Configurations.createChartTooltips = (preferences, t) => ({
    displayColors : false,
    callbacks     : {
        label : (tooltipItem, data) => [
            `${t('Temperature')}: ${Numbers.format(Conversions.getTemperature(data.datasets[0].data[tooltipItem.index]))}${preferences.temperatureUnitSymbol}`,
            `${t('Precipitation')}: ${Math.round(data.datasets[1].data[tooltipItem.index])}% ${Numbers.format(data.datasets[2].data[tooltipItem.index])}mm`,
            data.datasets[3].data[tooltipItem.index] || data.datasets[3].data[tooltipItem.index] === 0 ? `${t('Humidity')}: ${Math.round(data.datasets[3].data[tooltipItem.index])}%` : '',
            `${t('Wind')}: ${Numbers.format(Conversions.getSpeed(data.datasets[4].data[tooltipItem.index]))}${preferences.speedUnitSymbol}`,
            `${t('UV')}: ${data.datasets[5].data[tooltipItem.index]}`,
        ],
    },
});
