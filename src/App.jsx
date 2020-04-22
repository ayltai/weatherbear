import { useOnlineStatus, } from '@ayltai/use-online-status';
import { createMuiTheme, CssBaseline, ThemeProvider, } from '@material-ui/core';
import React from 'react';
import { useTranslation, withTranslation, } from 'react-i18next';
import { Route, Switch, } from 'react-router-dom';

import { About, } from './components/pages/About';
import { Locations, } from './components/pages/Locations';
import { Main, } from './components/pages/Main';
import { Settings, } from './components/pages/Settings';
import { Notification, } from './components/views/Notification';
import { Preferences, } from './models/Preferences';
import { Configurations, } from './Configurations';
import './css/weather-icons.min.css';

const Component = () => {
    const isOnline = useOnlineStatus();

    const { t, } = useTranslation();

    return (
        <ThemeProvider theme={createMuiTheme({
            palette : Configurations.createPalette(Preferences.load().isDarkMode),
        })}>
            <CssBaseline />
            <Notification
                type='error'
                message={t('You are currently offline')}
                closeable={false}
                show={!isOnline} />
            <Switch>
                <Route
                    exact
                    path='/'
                    component={Main} />
                <Route
                    exact
                    path='/settings'
                    component={Settings} />
                <Route
                    exact
                    path='/settings/locations'
                    component={Locations} />
                <Route
                    exact
                    path='/about'
                    component={About} />
            </Switch>
        </ThemeProvider>
    );
};

export const App = withTranslation()(Component);
