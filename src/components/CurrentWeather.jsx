import { Grid, makeStyles, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Preferences, } from '../models/Preferences';
import { WeatherHelper, } from '../utils/WeatherHelper';
import { ShadowedText, } from './views/ShadowedText';
import { Temperature, } from './views/Temperature';

export const CurrentWeather = props => {
    const classes = makeStyles(theme => ({
        background : {
            backgroundImage : `url(${props.background})`,
            backgroundSize  : 'cover',
            padding         : theme.spacing(0.5),
            height          : window.innerWidth / 2 + theme.spacing(1),
        },
        padding    : {
            paddingTop : theme.spacing(1),
        },
    }))();

    const { t, } = useTranslation();

    return (
        <div className={classes.background}>
            <ShadowedText
                variant='body2'
                tooltip={props.location}
                align='center'
                noWrap>
                {props.location}
            </ShadowedText>
            <ShadowedText
                variant='body2'
                tooltip={props.summaryCurrent}
                align='center'
                noWrap>
                {props.summaryCurrent}
            </ShadowedText>
            <Grid
                container
                alignItems='center'
                justify='space-around'>
                <Grid
                    item
                    xs={4}>
                    <Temperature
                        variant='h4'
                        align='center'
                        showTip
                        noWrap>
                        {props.temperature}
                    </Temperature>
                    <ShadowedText
                        tooltip={`${t('Humidity')}: ${Math.round(props.humidity * 100)}%`}
                        variant='body2'
                        align='center'
                        noWrap>
                        {`${Math.round(props.humidity * 100)}%`}
                    </ShadowedText>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <ShadowedText
                        tooltip={`${t('Wind')}: ${props.windSpeed}, ${t('UV')}: ${props.uvIndex}`}
                        variant='h2'
                        align='center'>
                        <i className={`wi ${WeatherHelper.getIcon(props.icon, Preferences.load().weatherSource)}`}></i>
                    </ShadowedText>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <Temperature
                        variant='body2'
                        align='center'
                        prefix='🔥 '
                        showTip
                        noWrap>
                        {props.temperatureHigh}
                    </Temperature>
                    <Temperature
                        variant='body2'
                        align='center'
                        prefix='❄️ '
                        showTip
                        noWrap>
                        {props.temperatureLow}
                    </Temperature>
                </Grid>
            </Grid>
            <ShadowedText
                variant='caption'
                tooltip={props.summaryToday}
                align='center'
                noWrap>
                {props.summaryToday}
            </ShadowedText>
        </div>
    );
};

CurrentWeather.propTypes = {
    background      : PropTypes.string,
    location        : PropTypes.string,
    summaryCurrent  : PropTypes.string,
    summaryToday    : PropTypes.string,
    icon            : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    temperature     : PropTypes.number,
    temperatureHigh : PropTypes.number,
    temperatureLow  : PropTypes.number,
    humidity        : PropTypes.number,
    windSpeed       : PropTypes.number,
    uvIndex         : PropTypes.number,
};
