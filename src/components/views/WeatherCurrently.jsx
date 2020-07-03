import { Grid, makeStyles, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { IconHelper, } from '../../utils/IconHelper';
import { NumberFormatHelper, } from '../../utils/NumberFormatHelper';
import { Constants, } from '../../Constants';
import { ShadowedText, } from './ShadowedText';
import { Temperature, } from './Temperature';

export const WeatherCurrently = props => {
    const classes = makeStyles(theme => ({
        background : {
            backgroundImage : `url(${props.backgroundImageUrl})`,
            backgroundSize  : 'cover',
            padding         : theme.spacing(0.5),
            height          : props.height + theme.spacing(1),
        },
        padding    : {
            paddingTop : theme.spacing(1),
        },
    }))();

    const humidity = NumberFormatHelper.toFixed(props.humidity * 100, 0);

    return (
        <div className={classes.background}>
            <ShadowedText
                variant='body2'
                tooltip={props.location}
                align='center'
                noShadow={props.noShadow}
                noWrap>
                {props.location}
            </ShadowedText>
            <ShadowedText
                variant='body2'
                tooltip={props.summaryCurrently}
                align='center'
                noShadow={props.noShadow}
                noWrap>
                {props.summaryCurrently}
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
                        unit={props.unit}
                        noShadow={props.noShadow}
                        showTip
                        noWrap>
                        {props.temperature}
                    </Temperature>
                    <ShadowedText
                        tooltip={`${props.humidityLabel || 'Humidity'}: ${humidity}%`}
                        variant='body2'
                        align='center'
                        noShadow={props.noShadow}
                        noWrap>
                        {`💧 ${humidity}%`}
                    </ShadowedText>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <ShadowedText
                        tooltip={`${props.windSpeedLabel || 'Wind'}: ${props.windSpeed}, ${props.uvIndexLabel || 'UV'}: ${NumberFormatHelper.toFixed(props.uvIndex, 0)}`}
                        variant='h2'
                        align='center'
                        noShadow={props.noShadow}>
                        <i className={`wi ${IconHelper.toIcon(props.iconId, props.iconType || Constants.TYPE_DARK_SKY)}`}></i>
                    </ShadowedText>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <Temperature
                        variant='body2'
                        align='center'
                        prefix={`${props.temperatureHighLabel || '🥵'} `}
                        unit={props.unit}
                        noShadow={props.noShadow}
                        showTip
                        noWrap>
                        {props.temperatureHigh}
                    </Temperature>
                    <Temperature
                        variant='body2'
                        align='center'
                        prefix={`${props.temperatureLowLabel || '🥶'} `}
                        unit={props.unit}
                        noShadow={props.noShadow}
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
                noShadow={props.noShadow}
                noWrap>
                {props.summaryToday}
            </ShadowedText>
        </div>
    );
};

WeatherCurrently.propTypes = {
    width                : PropTypes.number.isRequired,
    height               : PropTypes.number.isRequired,
    backgroundImageUrl   : PropTypes.string,
    location             : PropTypes.string,
    summaryCurrently     : PropTypes.string,
    summaryToday         : PropTypes.string,
    iconId               : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    iconType             : PropTypes.oneOf([
        Constants.TYPE_ACCU_WEATHER,
        Constants.TYPE_DARK_SKY,
        Constants.TYPE_WEATHER_BIT,
    ]),
    temperature          : PropTypes.number,
    temperatureHigh      : PropTypes.number,
    temperatureHighLabel : PropTypes.string,
    temperatureLow       : PropTypes.number,
    temperatureLowLabel  : PropTypes.string,
    humidity             : PropTypes.number,
    humidityLabel        : PropTypes.string,
    windSpeed            : PropTypes.number,
    windSpeedLabel       : PropTypes.string,
    uvIndex              : PropTypes.number,
    uvIndexLabel         : PropTypes.string,
    unit                 : PropTypes.oneOf([
        Constants.UNIT_SI,
        Constants.UNIT_IMPERIAL,
    ]),
    noShadow             : PropTypes.bool,
};
