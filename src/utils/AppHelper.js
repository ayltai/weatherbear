import i18next from 'i18next';
import moment from 'moment';

import { Configurations, } from '../Configurations';
import { RequestHelper, } from './RequestHelper';

export const AppHelper = {};

AppHelper.setAutoLaunch = enabled => {
    const app = window.require('electron').remote.app;

    app.setLoginItemSettings({
        openAtLogin  : enabled,
        openAsHidden : true,
        path         : app.getPath('exe'),
    });
};

AppHelper.changeLocale = locale => {
    i18next.changeLanguage(locale);
    moment.locale(locale);
};

AppHelper.checkForUpdates = () => {
    RequestHelper.request(Configurations.UPDATE_URL, () => true, '', response => {
        const extension = process.platform === 'darwin' ? 'dmg' : process.platform === 'win32' ? 'exe' : 'AppImage';
        return [ Configurations.APP_VERSION !== response.version, `https://github.com/ayltai/hknews-web/archive/release/WeatherBear-${response.version}.${process.platform}.${extension}`, ];
    });
};
