import { useInterval, } from '@ayltai/use-interval';
import { Divider, Grid, makeStyles, Tooltip, useTheme, } from '@material-ui/core';
import { InfoOutlined, Refresh, Settings, } from '@material-ui/icons';
import moment from 'moment';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

import { WeatherApiClient, } from '../../api/WeatherApiClient';
import { UnsplashApiClient, } from '../../api/UnsplashApiClient';
import { Preferences, } from '../../models/Preferences';
import { Conversions, } from '../../utils/Conversions';
import { Dates, } from '../../utils/Dates';
import { Numbers, } from '../../utils/Numbers';
import { ViewHelper, } from '../../utils/ViewHelper';
import { WeatherHelper, } from '../../utils/WeatherHelper';
import { Button, } from '../views/Button';
import { Timestamp, } from '../views/Timestamp';
import { Configurations, } from '../../Configurations';
import { ChartWrapper, } from '../ChartWrapper';
import { CurrentWeather, } from '../CurrentWeather';
import { DailyWeather, } from '../DailyWeather';

const shouldRefresh = () => {
    const preferences = Preferences.load();
    return (Date.now() - preferences.lastRefreshTime > preferences.refreshInterval) || !preferences.weather || !preferences.backgroundImageUrl;
};

const refresh = () => {
    if (shouldRefresh()) window.require('electron').remote.getCurrentWindow().reload();
};

const Page = ({ history, }) => {
    const [ state, setState, ] = React.useState({
        weather                         : {},
        backgroundImageUrl              : '',
        backgroundImageAuthor           : '',
        backgroundImageAuthorProfileUrl : '',
    });

    const theme  = useTheme();
    const { t, } = useTranslation();

    const classes = makeStyles({
        chart : {
            width      : window.innerWidth - theme.spacing(1),
            marginLeft : theme.spacing(1),
        },
    })();

    const createTrayIcon = (temperature, icon) => {
        const scale = window.devicePixelRatio;
        const size  = Configurations.TRAY_ICON_SIZE;

        const canvas = document.createElement('canvas');
        canvas.width  = size * scale;
        canvas.height = size * scale;

        const context = canvas.getContext('2d');
        const image   = new Image(size, size);

        image.onload = () => {
            context.scale(scale, scale);
            context.drawImage(image, 0, 0, size * scale, size * scale, 0, 0, size, size);

            window.require('electron').ipcRenderer.send('refresh', {
                temperature,
                icon : canvas.toDataURL(),
            });
        };

        image.src = process.env.NODE_ENV === 'development' ? path.join(__dirname, '..', 'img', Preferences.load().isDarkMode ? 'dark' : 'light', icon) : require('url').format({
            pathname : path.join(window.require('electron').remote.getGlobal('APP_DIR'), 'build', 'img', Preferences.load().isDarkMode ? 'dark' : 'light', icon),
            protocol : 'file:',
            slashes  : true,
        });
    };

    React.useMemo(() => {
        const pref = Preferences.load();
        const loc  = pref.favoriteLocation;

        if (shouldRefresh()) {
            WeatherApiClient.getWeather(pref.weatherSource, loc.latitude, loc.longitude, pref.locale)
                .then(weather => {
                    UnsplashApiClient.getRandomPhoto(`${Dates.getPartOfDay()} ${weather.current.icon}`, window.innerWidth * 2, window.innerWidth)
                        .then(response => {
                            pref.lastRefreshTime                 = Date.now();
                            pref.weather                         = weather;
                            pref.backgroundImageUrl              = response.urls.regular;
                            pref.backgroundImageAuthor           = response.user.name;
                            pref.backgroundImageAuthorProfileUrl = response.user.links.html;
                            pref.save();

                            createTrayIcon(`${Math.round(weather.current.temperature)}${pref.temperatureUnitSymbol}`, `${WeatherHelper.getIcon(weather.current.icon, pref.weatherSource)}.svg`);

                            setState({
                                weather                         : weather,
                                backgroundImageUrl              : response.urls.regular,
                                backgroundImageAuthor           : response.user.name,
                                backgroundImageAuthorProfileUrl : response.user.links.html,
                            });
                        })
                        .catch(console.error);
                })
                .catch(console.error);
        } else {
            createTrayIcon(`${Math.round(pref.weather.current.temperature)}${pref.temperatureUnitSymbol}`, `${WeatherHelper.getIcon(pref.weather.current.icon, pref.weatherSource)}.svg`);

            setState({
                weather                         : pref.weather,
                backgroundImageUrl              : pref.backgroundImageUrl,
                backgroundImageAuthor           : pref.backgroundImageAuthor,
                backgroundImageAuthorProfileUrl : pref.backgroundImageAuthorProfileUrl,
            });
        }
    }, []);

    useInterval(refresh, Configurations.UI_UPDATE_INTERVAL);

    const preferences = Preferences.load();

    const dailyWeathers = [];
    if (state.weather.daily) for (let i = 0; i < Configurations.FORECAST_DAYS; i++) {
        const humidity = state.weather.daily[i].humidity || state.weather.daily[i].humidity === 0 ? (
            <>
                {`${t('Humidity')}: ${100 * state.weather.daily[i].humidity}%`}<br />
            </>
        ) : null;

        dailyWeathers.push(
            <React.Fragment key={i}>
                {i > 0 && (
                    <Divider
                        orientation='vertical'
                        flexItem />
                )}
                <Grid item>
                    <Tooltip title={
                        <>
                            {moment().add(i, 'days').format('LL')}<br />
                            {state.weather.daily[i].summary}<br />
                            {`${t('Temperature')}: ${Numbers.format(Conversions.getTemperature(state.weather.daily[i].temperatureHigh))}${preferences.temperatureUnitSymbol} - ${Numbers.format(Conversions.getTemperature(state.weather.daily[i].temperatureLow))}${preferences.temperatureUnitSymbol}`}<br />
                            {`${t('Precipitation')}: ${Math.round(100 * state.weather.daily[i].precipProbability)}% ${Numbers.format(state.weather.daily[i].precipIntensity)}mm`}<br />
                            {humidity}
                            {`${t('Wind')}: ${Numbers.format(Conversions.getSpeed(state.weather.daily[i].windSpeed))}${preferences.speedUnitSymbol}`}<br />
                            {`${t('UV')}: ${state.weather.daily[i].uvIndex}`}
                        </>
                    }>
                        <div>
                            <DailyWeather
                                date={moment().add(i + 1, 'days')}
                                icon={state.weather.daily[i].icon}
                                temperatureHigh={state.weather.daily[i].temperatureHigh}
                                temperatureLow={state.weather.daily[i].temperatureLow}
                                precipProbability={state.weather.daily[i].precipProbability} />
                        </div>
                    </Tooltip>
                </Grid>
            </React.Fragment>
        );
    }

    let min = 0;
    let max = 0;

    const chartData = Configurations.createChartData(theme, preferences.isDarkMode, preferences.forecast, t);

    if (state.weather.hourly) {
        WeatherHelper.updateChartData(chartData, state.weather.hourly, preferences.isDarkMode);

        min = Math.floor(Math.min.apply(Math, chartData.datasets[0].data));
        max = Math.ceil(Math.max.apply(Math, chartData.datasets[0].data));
    }

    return (
        <>
            {state.backgroundImageUrl ? (
                <CurrentWeather
                    background={state.backgroundImageUrl}
                    location={preferences.favoriteLocation.displayName}
                    icon={state.weather.current && state.weather.current.icon}
                    summaryCurrent={state.weather.current && state.weather.current.summary}
                    summaryToday={state.weather.daily && state.weather.daily[0].summary}
                    temperature={state.weather.current && state.weather.current.temperature}
                    temperatureHigh={state.weather.daily && state.weather.daily[0].temperatureHigh}
                    temperatureLow={state.weather.daily && state.weather.daily[0].temperatureLow}
                    humidity={state.weather.current && state.weather.current.humidity}
                    windSpeed={state.weather.current && state.weather.current.windSpeed}
                    uvIndex={state.weather.current && state.weather.current.uvIndex} />
            ) : ViewHelper.createDummyCurrentWeather()}
            {chartData.labels.length ? (
                <ChartWrapper
                    className={classes.chart}
                    width={window.innerWidth}
                    height={window.innerWidth / 2}
                    data={chartData}
                    options={{
                        scales   : Configurations.createChartScales(theme, preferences, min, max),
                        tooltips : Configurations.createChartTooltips(preferences, t),
                    }} />
            ) : ViewHelper.createDummyWeatherChart()}
            <Divider />
            <Grid
                container
                alignItems='center'
                justify='space-evenly'>
                {dailyWeathers.length ? dailyWeathers : ViewHelper.createDummyDailyWeathers(4)}
            </Grid>
            <Divider />
            <Grid
                container
                alignItems='center'
                justify='space-between'>
                <Grid
                    item
                    xs={7}>
                    {state.weather.current && <Timestamp prefix={t('Last updated ')} />}
                </Grid>
                <Button
                    tooltip='Settings'
                    icon={<Settings />}
                    size='small'
                    onClick={() => history.push('/settings')} />
                <Button
                    tooltip={`Photo by ${state.backgroundImageAuthor} / Unsplash`}
                    icon={<InfoOutlined />}
                    size='small'
                    onClick={() => window.require('electron').remote.shell.openExternal(state.backgroundImageAuthorProfileUrl)} />
                <Button
                    tooltip='Refresh'
                    icon={<Refresh />}
                    size='small'
                    onClick={() => refresh()} />
            </Grid>
        </>
    );
};

Page.propTypes = {
    history : PropTypes.object.isRequired,
};

export const Main = withRouter(Page);
