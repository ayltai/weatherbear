import { mount, } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { Constants, } from '../../Constants';
import { WeatherDaily, } from './WeatherDaily';

const date              = 1587628337;
const summary           = 'Partly Cloudy';
const iconId            = 'partly-cloudy-night';
const iconType          = Constants.TYPE_DARK_SKY;
const temperatureHigh   = 29.7;
const temperatureLow    = 22.4;
const humidity          = 0.77;
const precipProbability = 0.48;
const precipIntensity   = 0.2;
const windSpeed         = 7;
const uvIndex           = 4;
const unit              = Constants.UNIT_SI;

const componentHorizontal = (
    <WeatherDaily
        orientation='horizontal'
        date={date}
        summary={summary}
        iconId={iconId}
        iconType={iconType}
        temperatureHigh={temperatureHigh}
        temperatureLow={temperatureLow}
        humidity={humidity}
        precipProbability={precipProbability}
        precipIntensity={precipIntensity}
        windSpeed={windSpeed}
        windSpeedSuffix='km/h'
        uvIndex={uvIndex}
        unit={unit} />
);

const componentVertical = (
    <WeatherDaily
        orientation='vertical'
        date={date}
        summary={summary}
        iconId={iconId}
        iconType={iconType}
        temperatureHigh={temperatureHigh}
        temperatureLow={temperatureLow}
        humidity={humidity}
        precipProbability={precipProbability}
        precipIntensity={precipIntensity}
        windSpeed={windSpeed}
        windSpeedSuffix='km/h'
        uvIndex={uvIndex}
        unit={unit} />
);

describe('<WeatherDaily />', () => {
    it('renders correctly', () => {
        expect(renderer.create(componentHorizontal).toJSON()).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(renderer.create(componentVertical).toJSON()).toMatchSnapshot();
    });

    it('mounts without error', () => {
        mount(componentHorizontal);
    });

    it('mounts without error', () => {
        mount(componentVertical);
    });
});
