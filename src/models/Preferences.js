import { Configurations, } from '../Configurations';
import { Constants, } from '../Constants';
import { Location, } from './Location';

const KEY = 'preferences';

export class Preferences {
    locations             = [ Configurations.LOCATION, ];
    favoriteLocationIndex = 0;
    refreshInterval       = Configurations.REFRESH_INTERVALS[1].value;
    lastRefreshTime       = Date.now();
    isAutoLaunch          = Configurations.IS_AUTO_LAUNCH;
    units                 = Configurations.UNITS[0].value;
    forecast              = Configurations.FORECAST[0].value;
    locale                = Configurations.LOCALES[0].value;
    isDarkMode            = window.require('electron').remote.getGlobal('IS_DARK_MODE');
    isMilitaryTime        = Configurations.IS_MILITARY_TIME;
    weatherSource         = Configurations.WEATHER_SOURCES[0].value;
    weather;
    backgroundBlurred;
    backgroundDarken      = true;
    backgroundImageUrl;
    backgroundImageAuthor;
    backgroundImageAuthorProfileUrl;

    get favoriteLocation() {
        return this.locations.length ? this.favoriteLocationIndex > this.locations.length - 1 ? this.locations[0] : this.locations[this.favoriteLocationIndex] : Configurations.LOCATION;
    }

    get temperatureUnitSymbol() {
        return this.units === Constants.UNIT_SI ? '°C' : '°F';
    }

    get speedUnitSymbol() {
        return this.units === Constants.UNIT_SI ? 'km/h' : 'mi/h';
    }

    save = () => window.localStorage.setItem(KEY, JSON.stringify(this));
}

Preferences.load = () => {
    if (KEY in window.localStorage) {
        const preferences = Object.assign(new Preferences(), JSON.parse(window.localStorage.getItem(KEY)));
        preferences.locations = preferences.locations.map(location => Object.assign(new Location(location.latitude, location.longitude, location.name), location));

        return preferences;
    }

    return new Preferences();
};
