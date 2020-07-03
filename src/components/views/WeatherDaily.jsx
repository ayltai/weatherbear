import { Grid, Tooltip, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, } from 'react';

import { IconHelper, } from '../../utils/IconHelper';
import { MeasurementHelper, } from '../../utils/MeasurementHelper';
import { NumberFormatHelper, } from '../../utils/NumberFormatHelper';
import { Constants, } from '../../Constants';
import { ShadowedText, } from './ShadowedText';
import { Temperature, } from './Temperature';

export const WeatherDaily = props => {
    let i = 0;

    const date = (
        <ShadowedText
            key={i++}
            variant='body2'
            align='center'
            noShadow={props.noShadow}
            noWrap>
            {moment(props.date || new Date()).format('ddd')}
        </ShadowedText>
    );

    const icon = (
        <ShadowedText
            key={i++}
            variant='h4'
            align='center'
            noShadow={props.noShadow}
            noWrap>
            <i className={`wi ${IconHelper.toIcon(props.iconId, props.iconType || Constants.TYPE_DARK_SKY)}`}></i>
        </ShadowedText>
    );

    const temperatureHigh = (
        <Temperature
            key={i++}
            variant='body2'
            align='center'
            prefix={`${props.temperatureHighLabel || '🔥'} `}
            unit={props.unit}
            noShadow={props.noShadow}
            noWrap>
            {props.temperatureHigh}
        </Temperature>
    );

    const temperatureLow = (
        <Temperature
            key={i++}
            variant='body2'
            align='center'
            prefix={`${props.temperatureLowLabel || '❄'} `}
            unit={props.unit}
            noShadow={props.noShadow}
            noWrap>
            {props.temperatureLow}
        </Temperature>
    );

    const precip = (
        <ShadowedText
            key={i++}
            variant='caption'
            align='center'
            noShadow={props.noShadow}
            noWrap>
            {`${props.precipLabel || '🌧'}${Math.round(props.precipProbability * 100)}%`}
        </ShadowedText>
    );

    const blocks = [];

    if (props.orientation === 'vertical') {
        blocks.push(date);
        blocks.push(icon);
        blocks.push(temperatureHigh);
        blocks.push(temperatureLow);
        blocks.push(precip);
    } else {
        blocks.push(
            <Grid
                key={i++}
                item
                xs={2}>
                {date}
                {precip}
            </Grid>
        );

        blocks.push(
            <Grid
                key={i++}
                item
                xs={2}>
                {icon}
            </Grid>
        );

        blocks.push(
            <Grid
                key={i++}
                item
                xs={6}>
                <ShadowedText
                    variant='caption'
                    align='left'
                    noShadow={props.noShadow}
                    noWrap>
                    {props.summary}
                </ShadowedText>
            </Grid>
        );

        blocks.push(
            <Grid
                key={i}
                item
                xs={2}>
                {temperatureHigh}
                {temperatureLow}
            </Grid>
        );
    }

    return (
        <Tooltip title={
            <Fragment>
                {moment(props.date).format('LL')}<br />
                {props.summary}<br />
                {`${props.temperatureLabel || '🌡'} ${MeasurementHelper.toTemperature(props.temperatureLow, props.unit)} - ${MeasurementHelper.toTemperature(props.temperatureHigh, props.unit)}`}<br />
                {`${props.precipLabel || '🌧'} ${NumberFormatHelper.toFixed(100 * props.precipProbability, 0)}% ${NumberFormatHelper.toFixed(props.precipIntensity)}mm`}<br />
                {props.humidity ? (
                    <>
                        {`${props.humidityLabel || '🌢'} ${NumberFormatHelper.toFixed(100 * props.humidity, 0)}`}<br />
                    </>
                ) : null}
                {`${props.windSpeedLabel || '💨'} ${NumberFormatHelper.toFixed(MeasurementHelper.toSpeed(props.windSpeed, props.unit), 0)}${props.windSpeedSuffix}`}<br />
                {`${props.uvIndexLabel || '☀'} ${props.uvIndex}`}
            </Fragment>
        }>
            <Grid
                container
                direction={props.orientation === 'vertical' ? 'column' : 'row'}
                alignItems='center'
                justify='space-evenly'>
                {blocks}
            </Grid>
        </Tooltip>
    );
};

WeatherDaily.propTypes = {
    orientation          : PropTypes.oneOf([
        'horizontal',
        'vertical',
    ]),
    date                 : PropTypes.object,
    summary              : PropTypes.string,
    iconId               : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    iconType             : PropTypes.oneOf([
        Constants.TYPE_ACCU_WEATHER,
        Constants.TYPE_DARK_SKY,
        Constants.TYPE_WEATHER_BIT,
    ]),
    temperatureLabel     : PropTypes.string,
    temperatureHigh      : PropTypes.number,
    temperatureHighLabel : PropTypes.string,
    temperatureLow       : PropTypes.number,
    temperatureLowLabel  : PropTypes.string,
    humidity             : PropTypes.number,
    humidityLabel        : PropTypes.string,
    precipProbability    : PropTypes.number,
    precipIntensity      : PropTypes.number,
    precipLabel          : PropTypes.string,
    windSpeed            : PropTypes.number,
    windSpeedLabel       : PropTypes.string,
    windSpeedSuffix      : PropTypes.string,
    uvIndex              : PropTypes.number,
    uvIndexLabel         : PropTypes.string,
    unit                 : PropTypes.oneOf([
        Constants.UNIT_SI,
        Constants.UNIT_IMPERIAL,
    ]),
    noShadow             : PropTypes.bool,
};
