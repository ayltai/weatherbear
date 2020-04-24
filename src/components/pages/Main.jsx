import { useInterval, } from '@ayltai/use-interval';
import { getWeather, Weather, } from '@ayltai/react-weather';
import { Divider, Grid, useTheme, } from '@material-ui/core';
import { InfoOutlined, Refresh, Settings, } from '@material-ui/icons';
import moment from 'moment';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

import { UnsplashApiClient, } from '../../api/UnsplashApiClient';
import { Preferences, } from '../../models/Preferences';
import { Dates, } from '../../utils/Dates';
import { ViewHelper, } from '../../utils/ViewHelper';
import { WeatherHelper, } from '../../utils/WeatherHelper';
import { Button, } from '../views/Button';
import { Timestamp, } from '../views/Timestamp';
import { Configurations, } from '../../Configurations';

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
            getWeather(loc.latitude, loc.longitude, pref.weatherSource, undefined, Configurations.FORECAST_HOURS, Configurations.FORECAST_DAYS, pref.locale)
                .then(weather => {
                    UnsplashApiClient.getRandomPhoto(`${Dates.getPartOfDay()} ${weather.currently.icon}`, window.innerWidth * 2, window.innerWidth)
                        .then(response => {
                            pref.lastRefreshTime                 = Date.now();
                            pref.weather                         = weather;
                            pref.backgroundImageUrl              = response.urls.regular;
                            pref.backgroundImageAuthor           = response.user.name;
                            pref.backgroundImageAuthorProfileUrl = response.user.links.html;
                            pref.save();

                            createTrayIcon(`${Math.round(weather.currently.temperature)}${pref.temperatureUnitSymbol}`, `${WeatherHelper.getIcon(weather.currently.icon, pref.weatherSource)}.svg`);

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
            createTrayIcon(`${Math.round(pref.weather.currently.temperature)}${pref.temperatureUnitSymbol}`, `${WeatherHelper.getIcon(pref.weather.currently.icon, pref.weatherSource)}.svg`);

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
    if (state.weather.daily) for (let i = 0; i < Configurations.FORECAST_DAYS; i++) dailyWeathers.push(
        <React.Fragment key={i}>
            {i > 0 && (
                <Divider
                    orientation='vertical'
                    flexItem />
            )}
            <Grid item>
                <Weather.Daily
                    orientation='vertical'
                    date={moment().add(i, 'days')}
                    summary={state.weather.daily[i].summary}
                    iconId={state.weather.daily[i].icon}
                    iconType={preferences.weatherSource}
                    temperatureHigh={state.weather.daily[i].temperatureHigh}
                    temperatureLow={state.weather.daily[i].temperatureLow}
                    humidity={state.weather.daily[i].humidity}
                    precipProbability={state.weather.daily[i].precipProbability}
                    precipIntensity={state.weather.daily[i].precipIntensity}
                    windSpeed={state.weather.daily[i].windSpeed}
                    windSpeedSuffix={preferences.speedUnitSymbol}
                    uvIndex={state.weather.daily[i].uvIndex}
                    unit={preferences.units} />
            </Grid>
        </React.Fragment>
    );

    return (
        <>
            {state.backgroundImageUrl ? (
                <Weather.Currently
                    width={window.innerWidth}
                    height={window.innerWidth / 2}
                    backgroundImageUrl={state.backgroundImageUrl}
                    location={preferences.favoriteLocation.displayName}
                    iconId={state.weather.currently?.icon}
                    iconType={preferences.weatherSource}
                    summaryCurrently={state.weather.currently?.summary}
                    summaryToday={state.weather.daily[0]?.summary}
                    temperature={state.weather.currently?.temperature}
                    temperatureHigh={state.weather.daily[0]?.temperatureHigh}
                    temperatureLow={state.weather.daily[0]?.temperatureLow}
                    humidity={state.weather.currently?.humidity}
                    windSpeed={state.weather.currently?.windSpeed}
                    uvIndex={state.weather.currently?.uvIndex}
                    unit={preferences.units} />
            ) : ViewHelper.createDummyCurrentWeather()}
            {state.weather.hourly ? (
                <Weather.Hourly
                    width={window.innerWidth - theme.spacing(1)}
                    height={window.innerWidth / 2}
                    hourly={state.weather.hourly}
                    chartLabel={t('8-hour forecast')}
                    iconType={preferences.weatherSource}
                    windSpeedSuffix={t(preferences.speedUnitSymbol)}
                    additionalForecast={preferences.forecast}
                    unit={preferences.units}
                    timeFormat={preferences.militaryTime ? 'HH' : 'ha'} />
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
                    {state.weather.currently && <Timestamp prefix={t('Last updated ')} />}
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
