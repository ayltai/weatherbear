import { Preferences, } from '../models/Preferences';

export const Conversions = {};

Conversions.getTemperature = temperature => {
    const preferences = Preferences.load();
    return preferences.units === 'si' ? temperature : temperature * 1.8 + 32;
};

Conversions.getSpeed = speed => {
    const preferences = Preferences.load();
    return preferences.units === 'si' ? speed : speed / 1.60934;
};
