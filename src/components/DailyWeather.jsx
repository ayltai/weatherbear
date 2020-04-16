import { Grid, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { Preferences, } from '../models/Preferences';
import { WeatherHelper, } from '../utils/WeatherHelper';
import { ShadowedText, } from './views/ShadowedText';
import { Temperature, } from './views/Temperature';

export const DailyWeather = props => (
    <Grid
        container
        direction='column'
        alignItems='center'
        justify='space-evenly'>
        <ShadowedText
            variant='body2'
            align='center'
            noWrap>
            {moment(props.date || new Date()).format('ddd')}
        </ShadowedText>
        <ShadowedText
            variant='h4'
            align='center'
            noWrap>
            <i className={`wi ${WeatherHelper.getIcon(props.icon, Preferences.load().weatherSource)}`}></i>
        </ShadowedText>
        <Temperature
            variant='body2'
            align='center'
            noWrap>
            {props.temperatureHigh}
        </Temperature>
        <Temperature
            variant='body2'
            align='center'
            noWrap>
            {props.temperatureLow}
        </Temperature>
        <ShadowedText
            variant='caption'
            align='center'
            noWrap>
            {`︎🌧 ${Math.round(props.precipProbability * 100)}%`}
        </ShadowedText>
    </Grid>
);

DailyWeather.propTypes = {
    date              : PropTypes.object,
    icon              : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    temperatureHigh   : PropTypes.number,
    temperatureLow    : PropTypes.number,
    precipProbability : PropTypes.number,
};
