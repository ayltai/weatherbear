import { mount, } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { Constants, } from '../../Constants';
import { WeatherCurrently, } from './WeatherCurrently';

const width            = 200;
const height           = 100;
const location         = 'Los Angeles';
const summaryCurrently = 'Partly Cloudy';
const summaryToday     = 'No precipitation throughout the week';
const iconId           = 'partly-cloudy-night';
const iconType         = Constants.TYPE_DARK_SKY;
const temperature      = 28.3;
const temperatureHigh  = 29.7;
const temperatureLow   = 22.4;
const humidity         = 0.77;
const windSpeed        = 7;
const uvIndex          = 4;
const unit             = Constants.UNIT_SI;

const component = (
    <WeatherCurrently
        width={width}
        height={height}
        location={location}
        summaryCurrently={summaryCurrently}
        summaryToday={summaryToday}
        iconId={iconId}
        iconType={iconType}
        temperature={temperature}
        temperatureHigh={temperatureHigh}
        temperatureLow={temperatureLow}
        humidity={humidity}
        windSpeed={windSpeed}
        uvIndex={uvIndex}
        unit={unit} />
);

describe('<WeatherCurrently />', () => {
    it('renders correctly', () => {
        expect(renderer.create(component).toJSON()).toMatchSnapshot();
    });

    it('mounts without error', () => {
        mount(component);
    });
});
