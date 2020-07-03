import { Grid, makeStyles, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { Preferences, } from '../../models/Preferences';
import { IconHelper, } from '../../utils/IconHelper';
import { NumberFormatHelper, } from '../../utils/NumberFormatHelper';
import { Constants, } from '../../Constants';
import { ShadowedText, } from './ShadowedText';
import { Temperature, } from './Temperature';

export const WeatherCurrently = props => {
    const classes = makeStyles(() => ({
        canvas : {
            position : 'absolute',
            zIndex   : -1,
            left     : 0,
            top      : 0,
        },
    }))();

    const humidity = NumberFormatHelper.toFixed(props.humidity * 100, 0);

    const image = React.useMemo(() => new window.Image(), []);

    image.src    = props.backgroundImageUrl;
    image.onload = () => {
        const context     = document.getElementById('canvas').getContext('2d');
        const ratio       = Math.max(props.width / image.width, props.height / image.height);
        const preferences = Preferences.load();

        context.filter = `${preferences.backgroundBlurred ? 'blur(2px)' : ''} ${preferences.backgroundDarken ? 'brightness(80%)' : ''}`;
        context.drawImage(image, 0, 0, image.width, image.height, (props.width - image.width * ratio) / 2, (props.height - image.height * ratio) / 2, image.width * ratio, image.height * ratio);
    };

    return (
        <div>
            <canvas
                className={classes.canvas}
                id='canvas'
                width={props.width}
                height={props.height} />
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
