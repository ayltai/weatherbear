import { Constants, } from '../Constants';
import { NumberFormatHelper, } from './NumberFormatHelper';

export const MeasurementHelper = {};

MeasurementHelper.toTemperature = (temperature, unit = Constants.UNIT_SI, digits = 1, withUnit = true) => unit === Constants.UNIT_SI ? `${NumberFormatHelper.toFixed(temperature, digits)}${withUnit ? '°C' : ''}` : `${NumberFormatHelper.toFixed(temperature * 1.8 + 32, 1)}${withUnit ? '°F' : ''}`;

MeasurementHelper.toSpeed = (speed, unit = Constants.UNIT_SI, digits = 1) => unit === Constants.UNIT_SI ? NumberFormatHelper.toFixed(speed, digits) : NumberFormatHelper.toFixed(speed / 1.60934, digits);
