import { Dialog, DialogContent, DialogTitle, List, } from '@material-ui/core';
import { Add, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

import { Preferences, } from '../../models/Preferences';
import { AppHelper, } from '../../utils/AppHelper';
import { Configurations, } from '../../Configurations';
import { Page, } from '../layouts/Page';
import { BooleanPreference, } from '../preferences/BooleanPreference';
import { ChoicePreference, } from '../preferences/ChoicePreference';
import { ConfirmationPreference, } from '../preferences/ConfirmationPreference';
import { Preference, } from '../preferences/Preference';
import { PreferenceTitle, } from '../preferences/PreferenceTitle';
import { Button, } from '../views/Button';
import { Confirmation, } from '../views/Confirmation';
import { Notification, } from '../views/Notification';
import { SearchLocation, } from '../views/SearchLocation';

const Component = ({ history, }) => {
    const preferences = Preferences.load();
    const { t, }      = useTranslation();

    const [ open,                setOpen,                ] = React.useState(false);
    const [ notification,        setNotification,        ] = React.useState(false);
    const [ notificationMessage, setNotificationMessage, ] = React.useState('');
    const [ confirmation,        setConfirmation,        ] = React.useState(false);
    const [ confirmationMessage, setConfirmationMessage, ] = React.useState('');
    const [ updateUrl,           setUpdateUrl,           ] = React.useState('');

    const [ state, setState, ] = React.useState({
        weatherSource     : preferences.weatherSource,
        refreshInterval   : preferences.refreshInterval,
        autoLaunch        : preferences.isAutoLaunch,
        units             : preferences.units,
        forecast          : preferences.forecast,
        backgroundBlurred : preferences.backgroundBlurred,
        backgroundDarken  : preferences.backgroundDarken,
        locale            : preferences.locale,
        isDarkMode        : preferences.isDarkMode,
        militaryTime      : preferences.isMilitaryTime,
    });

    return (
        <Page title='Settings'>
            <Dialog
                fullWidth
                maxWidth='xl'
                open={open}
                onBackdropClick={() => setOpen(false)}>
                <DialogTitle>Add Location</DialogTitle>
                <DialogContent>
                    <SearchLocation onSelect={location => {
                        if (!preferences.locations.map(loc => loc.name).includes(location.name)) {
                            preferences.locations.push(location);
                            preferences.save();

                            setOpen(false);
                        }
                    }} />
                </DialogContent>
            </Dialog>
            <List>
                <PreferenceTitle title='General' />
                <Preference
                    title='Locations'
                    description={`${preferences.locations.length} ${t(`location${preferences.locations.length > 1 ? 's' : ''}`)}`}
                    secondaryAction={
                        <Button
                            tooltip='Add location'
                            icon={<Add />}
                            onClick={() => setOpen(true)} />
                    }
                    onClick={() => history.push('/settings/locations')} />
                <ChoicePreference
                    title='Refresh interval'
                    description={`${Math.round(preferences.refreshInterval / 1000 / 60)} minutes`}
                    value={state.refreshInterval}
                    values={Configurations.REFRESH_INTERVALS}
                    onChange={value => {
                        preferences.refreshInterval = value;
                        preferences.save();

                        setState({
                            ...state,
                            refreshInterval : value,
                        });
                    }} />
                <ChoicePreference
                    title='Weather source'
                    description={Configurations.WEATHER_SOURCES[state.weatherSource].label}
                    value={state.weatherSource}
                    values={Configurations.WEATHER_SOURCES}
                    onChange={value => {
                        preferences.weatherSource   = value;
                        preferences.weather         = null;
                        preferences.lastRefreshTime = 0;
                        preferences.save();

                        setState({
                            ...state,
                            weatherSource : value,
                        });
                    }} />
                <BooleanPreference
                    title='Auto launch'
                    description='Run on startup'
                    checked={state.autoLaunch}
                    onChange={checked => {
                        preferences.isAutoLaunch = checked;
                        preferences.save();

                        AppHelper.setAutoLaunch(checked);

                        setState({
                            ...state,
                            autoLaunch : checked,
                        });
                    }} />
                <PreferenceTitle
                    divider
                    title='Display' />
                <ChoicePreference
                    title='Units'
                    description={state.units === 'si' ? 'SI (°C, km)' : 'Imperial (°F, mile)'}
                    value={state.units}
                    values={Configurations.UNITS}
                    onChange={value => {
                        preferences.units = value;
                        preferences.save();

                        setState({
                            ...state,
                            units : value,
                        });
                    }} />
                <ChoicePreference
                    title='Forecast'
                    description={state.forecast === 'humidity' ? 'Temperature, precipitation, humidity' : state.forecast === 'wind' ? 'Temperature, precipitation, wind speed' : 'Temperature, precipitation, UV index'}
                    value={state.forecast}
                    values={Configurations.FORECAST}
                    onChange={value => {
                        preferences.forecast = value;
                        preferences.save();

                        setState({
                            ...state,
                            forecast : value,
                        });
                    }} />
                <BooleanPreference
                    title='Blur background'
                    checked={state.backgroundBlurred}
                    onChange={checked => {
                        preferences.backgroundBlurred = checked;
                        preferences.save();

                        setState({
                            ...state,
                            backgroundBlurred : checked,
                        });
                    }} />
                <BooleanPreference
                    title='Dim background'
                    checked={state.backgroundDarken}
                    onChange={checked => {
                        preferences.backgroundDarken = checked;
                        preferences.save();

                        setState({
                            ...state,
                            backgroundDarken : checked,
                        });
                    }} />
                <ChoicePreference
                    title='Language'
                    description={Configurations.LOCALES.filter(locale => locale.value === state.locale)[0].label}
                    value={state.locale}
                    values={Configurations.LOCALES}
                    onChange={value => {
                        preferences.locale          = value;
                        preferences.lastRefreshTime = 0;
                        preferences.weather         = null;
                        preferences.save();

                        AppHelper.changeLocale(value);

                        setState({
                            ...state,
                            locale : value,
                        });
                    }} />
                <BooleanPreference
                    title='Dark mode'
                    checked={state.isDarkMode}
                    onChange={checked => {
                        preferences.isDarkMode = checked;
                        preferences.save();

                        setState({
                            ...state,
                            isDarkMode : checked,
                        });

                        window.require('electron').remote.getCurrentWindow().reload();
                    }} />
                <BooleanPreference
                    title='24-hour clock'
                    checked={state.militaryTime}
                    onChange={checked => {
                        preferences.isMilitaryTime = checked;
                        preferences.save();

                        setState({
                            ...state,
                            militaryTime : checked,
                        });
                    }} />
                <PreferenceTitle
                    divider
                    title='Help' />
                <Preference
                    title='About'
                    onClick={() => history.push('/about')} />
                <Preference
                    title='Check for updates'
                    onClick={() => {
                        const [ hasUpdates, url, ] = AppHelper.checkForUpdates();

                        if (hasUpdates) {
                            setUpdateUrl(url);
                            setConfirmation(true);
                            setConfirmationMessage('An update is available. Do you want to download it now?');
                        }
                    }} />
                {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && (
                    <Preference
                        title='Toggle Developer Tools'
                        onClick={() => window.require('electron').remote.getCurrentWindow().webContents.toggleDevTools()} />
                )}
                <ConfirmationPreference
                    title='Reset settings'
                    message='Are you sure to reset all settings to default values?'
                    onResponse={response => {
                        if (response) {
                            window.localStorage.clear();

                            setNotificationMessage('Settings are reset to default values');
                            setNotification(true);
                        }
                    }} />
                <Preference
                    title='Documentation'
                    onClick={() => window.require('electron').remote.shell.openExternal(Configurations.DOCUMENTATION_URL)} />
                <Preference
                    title='View License'
                    onClick={() => window.require('electron').remote.shell.openExternal(Configurations.LICENSE_URL)} />
                <Preference
                    title='Report Issues'
                    onClick={() => window.require('electron').remote.shell.openExternal(Configurations.ISSUES_URL)} />
                <ConfirmationPreference
                    title='Exit'
                    message='Are you sure you want to exit?'
                    onResponse={response => {
                        if (response) window.require('electron').remote.app.quit();
                    }} />
            </List>
            {notification ? (
                <Notification
                    type='info'
                    message={notificationMessage}
                    autoClose
                    onClose={() => setNotification(false)} />
            ) : <span />}
            {confirmation ? (
                <Confirmation
                    title={t('Confirmation')}
                    message={confirmationMessage}
                    show={confirmation}
                    onClose={() => setConfirmation(false)}
                    onResponse={response => {
                        if (response) window.require('electron').remote.shell.openExternal(updateUrl);
                    }} />
            ) : <span />}
        </Page>
    );
};

Component.propTypes = {
    history : PropTypes.object.isRequired,
};

export const Settings = withRouter(Component);
