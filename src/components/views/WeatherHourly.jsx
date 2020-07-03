import { useTheme, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { IconHelper, } from '../../utils/IconHelper';
import { MeasurementHelper, } from '../../utils/MeasurementHelper';
import { NumberFormatHelper, } from '../../utils/NumberFormatHelper';
import { Constants, } from '../../Constants';
import { ChartWrapper, } from './ChartWrapper';

export const WeatherHourly = props => {
    const theme      = useTheme();
    const isDarkMode = theme.palette.type;
    const unit       = props.unit || Constants.UNIT_SI;

    const createData = () => ({
        labels   : [],
        datasets : [
            {
                label           : props.chartLabel || 'Hourly forecast',
                yAxisID         : 'temp',
                order           : 2,
                data            : [],
                pointStyle      : [],
                pointHitRadius  : 10,
                fill            : false,
                backgroundColor : isDarkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
                borderColor     : isDarkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
                borderWidth     : 2,
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
                borderWidth     : 2,
            },
            {
                label : '',
                order : 4,
                data  : [],
            },
            {
                label           : '',
                yAxisID         : 'humidity',
                order           : props.additionalForecast === 'humidity' ? 5 : 0,
                data            : [],
                pointRadius     : 0,
                pointHitRadius  : 10,
                fill            : false,
                backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderWidth     : 2,
            },
            {
                label           : '',
                yAxisID         : 'wind',
                order           : props.additionalForecast === 'wind' ? 5 : 0,
                data            : [],
                pointRadius     : 0,
                pointHitRadius  : 10,
                fill            : false,
                backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderWidth     : 2,
            },
            {
                label           : '',
                yAxisID         : 'uv',
                order           : props.additionalForecast === 'uv' ? 5 : 0,
                data            : [],
                pointRadius     : 0,
                pointHitRadius  : 10,
                fill            : false,
                backgroundColor : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
                borderWidth     : 2,
            },
        ],
    });

    const updateData = (data, hourly) => {
        data.datasets[3].hidden = props.additionalForecast !== 'humidity';
        data.datasets[4].hidden = props.additionalForecast !== 'windSpeed';
        data.datasets[5].hidden = props.additionalForecast !== 'uvIndex';

        for (let i = 0; i < hourly.length; i++) {
            data.labels.push(moment(hourly[i].time).format(props.timeFormat || 'ha'));
            data.datasets[0].data.push(MeasurementHelper.toTemperature(hourly[i].temperature, unit, 1, false));
            data.datasets[1].data.push(NumberFormatHelper.toFixed(100 * hourly[i].precipProbability, 0));
            data.datasets[2].data.push(hourly[i].precipIntensity);
            data.datasets[3].data.push(NumberFormatHelper.toFixed(100 * hourly[i].humidity, 0));
            data.datasets[4].data.push(NumberFormatHelper.toFixed(hourly[i].windSpeed));
            data.datasets[5].data.push(hourly[i].uvIndex);

            const icon = new Image(32, 32);
            icon.src = `img/${isDarkMode ? 'dark' : 'light'}/${IconHelper.toIcon(hourly[i].icon, props.iconType || Constants.TYPE_DARK_SKY)}.svg`;

            data.datasets[0].pointStyle.push(icon);
        }
    };

    const chartData = createData();
    updateData(chartData, props.hourly);

    const min = Math.floor(Math.min.apply(Math, chartData.datasets[0].data));
    const max = Math.ceil(Math.max.apply(Math, chartData.datasets[0].data));

    const createScales = () => ({
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
                    callback : value => MeasurementHelper.toTemperature(value, unit, 0),
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
                display   : props.additionalForecast === 'humidity',
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
                display   : props.additionalForecast === 'windSpeed',
                position  : 'right',
                gridLines : {
                    drawOnChartArea : false,
                    color           : theme.palette.text.primary,
                    zeroLineColor   : theme.palette.text.primary,
                },
                ticks     : {
                    min      : 0,
                    max      : props.unit === 'si' ? 200 : 120,
                    stepSize : props.unit === 'si' ? 50 : 30,
                    callback : value => `${MeasurementHelper.toSpeed(value, unit, 0)}${props.windSpeedSuffix || 'km/h'}`,
                },
            },
            {
                id        : 'uv',
                display   : props.additionalForecast === 'uvIndex',
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
                },
            },
        ],
    });

    const createTooltips = () => ({
        displayColors : false,
        callbacks     : {
            label : (tooltipItem, data) => [
                `${props.temperatureLabel || '🌡'} ${MeasurementHelper.toTemperature(data.datasets[0].data[tooltipItem.index], unit)}`,
                `${props.precipitationLabel || '🌧'} ${NumberFormatHelper.toFixed(data.datasets[1].data[tooltipItem.index])}% ${NumberFormatHelper.toFixed(data.datasets[2].data[tooltipItem.index])}mm`,
                data.datasets[3].data[tooltipItem.index] || data.datasets[3].data[tooltipItem.index] === 0 ? `${props.humidityLabel || '💧'} ${NumberFormatHelper.toFixed(data.datasets[3].data[tooltipItem.index], 0)}%` : '',
                `${props.windSpeedLabel || '🌬'} ${NumberFormatHelper.toFixed(data.datasets[4].data[tooltipItem.index], 0)}${props.windSpeedSuffix || ''}`,
                `${props.uvIndexLabel || '🌞'} ${NumberFormatHelper.toFixed(data.datasets[5].data[tooltipItem.index], 0)}`,
            ],
        },
    });

    return (
        <ChartWrapper
            className={props.className}
            width={props.width}
            height={props.height}
            data={chartData}
            options={{
                scales   : createScales(),
                tooltips : createTooltips(),
            }} />
    );
};

WeatherHourly.propTypes = {
    className          : PropTypes.string,
    width              : PropTypes.number.isRequired,
    height             : PropTypes.number.isRequired,
    hourly             : PropTypes.arrayOf(PropTypes.object),
    chartLabel         : PropTypes.string,
    iconType           : PropTypes.oneOf([
        Constants.TYPE_ACCU_WEATHER,
        Constants.TYPE_DARK_SKY,
        Constants.TYPE_WEATHER_BIT,
    ]),
    temperatureLabel   : PropTypes.string,
    precipitationLabel : PropTypes.string,
    humidityLabel      : PropTypes.string,
    windSpeedLabel     : PropTypes.string,
    windSpeedSuffix    : PropTypes.string,
    uvIndexLabel       : PropTypes.string,
    additionalForecast : PropTypes.oneOf([
        'humidity',
        'windSpeed',
        'uvIndex',
    ]),
    unit               : PropTypes.oneOf([
        Constants.UNIT_SI,
        Constants.UNIT_IMPERIAL,
    ]),
    timeFormat         : PropTypes.oneOf([
        'HH',
        'ha',
    ]),
};
