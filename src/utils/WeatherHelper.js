import moment from 'moment';

import { Preferences, } from '../models/Preferences';
import { Conversions } from '../utils/Conversions';
import { Configurations, } from '../Configurations';
import { Dates, } from './Dates';

export const WeatherHelper = {};

WeatherHelper.TYPE_DARK_SKY     = 0;
WeatherHelper.TYPE_ACCU_WEATHER = 1;
WeatherHelper.TYPE_WEATHER_BIT  = 2;

WeatherHelper.getIcon = (label, type = WeatherHelper.TYPE_DARK_SKY) => {
    const isDay = Dates.isDay();

    const icons = [
        {
            'clear-day'           : 'wi-day-sunny',
            'clear-night'         : 'wi-night-clear',
            'rain'                : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            'snow'                : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            'sleet'               : isDay ? 'wi-day-sleet'        : 'wi-night-alt-sleet',
            'wind'                : isDay ? 'wi-day-windy'        : 'wi-night-alt-cloudy-windy',
            'fog'                 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            'cloudy'              : 'wi-cloudy',
            'partly-cloudy-day'   : 'wi-day-cloudy',
            'partly-cloudy-night' : 'wi-night-alt-cloudy',
            'hail'                : isDay ? 'wi-day-hail'         : 'wi-night-alt-hail',
            'thunderstorm'        : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            'tornado'             : 'wi-tornado',
        },
        {
            1  : 'wi-day-sunny',
            2  : 'wi-day-sunny',
            3  : 'wi-day-cloudy',
            4  : 'wi-day-cloudy',
            5  : 'wi-day-fog',
            6  : 'wi-cloudy',
            7  : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            8  : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            11 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            12 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            13 : 'wi-day-rain',
            14 : 'wi-day-rain',
            15 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            16 : 'wi-day-thunderstorm',
            17 : 'wi-day-thunderstorm',
            18 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            19 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            20 : 'wi-day-cloudy',
            21 : 'wi-day-cloudy',
            22 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            23 : 'wi-day-snow',
            24 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            25 : isDay ? 'wi-day-sleet'        : 'wi-night-alt-sleet',
            26 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            29 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            30 : isDay ? 'wi-day-sunny'        : 'wi-night-clear',
            31 : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            32 : isDay ? 'wi-day-windy'        : 'wi-night-alt-cloudy-windy',
            33 : 'wi-night-clear',
            34 : 'wi-night-clear',
            35 : 'wi-night-alt-cloudy',
            36 : 'wi-night-alt-cloudy',
            37 : 'wi-night-fog',
            38 : 'wi-night-alt-cloudy',
            39 : 'wi-night-alt-rain',
            40 : 'wi-night-alt-rain',
            41 : 'wi-night-alt-thunderstorm',
            42 : 'wi-night-alt-thunderstorm',
            43 : 'wi-night-alt-rain',
            44 : 'wi-night-alt-snow',
        },
        {
            200 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            201 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            202 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            230 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            231 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            232 : isDay ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
            300 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            301 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            302 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            500 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            501 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            502 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            511 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            520 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            521 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            522 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
            600 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            601 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            602 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            610 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            611 : isDay ? 'wi-day-sleet'        : 'wi-night-alt-sleet',
            612 : isDay ? 'wi-day-sleet'        : 'wi-night-alt-sleet',
            621 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            622 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            623 : isDay ? 'wi-day-snow'         : 'wi-night-alt-snow',
            700 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            711 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            721 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            731 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            741 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            751 : isDay ? 'wi-day-fog'          : 'wi-night-fog',
            800 : isDay ? 'wi-day-sunny'        : 'wi-night-clear',
            801 : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            802 : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            803 : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            804 : isDay ? 'wi-day-cloudy'       : 'wi-night-alt-cloudy',
            900 : isDay ? 'wi-day-rain'         : 'wi-night-alt-rain',
        }
    ];

    const icon = icons[type][label];
    if (icon) return icon;

    return 'wi-na';
};

WeatherHelper.updateChartData = (chartData, weather, isDarkMode) => {
    const preferences = Preferences.load();

    chartData.datasets[3].hidden = preferences.forecast !== 'humidity';
    chartData.datasets[4].hidden = preferences.forecast !== 'wind';
    chartData.datasets[5].hidden = preferences.forecast !== 'uv';

    for (let i = 0; i < Configurations.FORECAST_HOURS; i++) {
        chartData.labels.push(moment(weather[i].time).format(preferences.militaryTime ? 'HH' : 'ha'));
        chartData.datasets[0].data.push(Conversions.getTemperature(weather[i].temperature));
        chartData.datasets[1].data.push(Math.round(100 * weather[i].precipProbability));
        chartData.datasets[2].data.push(weather[i].precipIntensity);
        chartData.datasets[3].data.push(Math.round(100 * weather[i].humidity));
        chartData.datasets[4].data.push(Conversions.getSpeed(weather[i].windSpeed));
        chartData.datasets[5].data.push(weather[i].uvIndex);

        const icon = new Image(32, 32);
        icon.src = `img/${isDarkMode ? 'dark' : 'light'}/${WeatherHelper.getIcon(weather[i].icon, preferences.weatherSource)}.svg`;

        chartData.datasets[0].pointStyle.push(icon);
    }
};
