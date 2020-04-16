import PropTypes from 'prop-types';
import React from 'react';

import { Preferences, } from '../../models/Preferences';
import { Conversions, } from '../../utils/Conversions';
import { Numbers, } from '../../utils/Numbers';
import { ShadowedText, } from './ShadowedText';

export const Temperature = props => {
    const value       = Conversions.getTemperature(Number(props.children) || 0);
    const preferences = Preferences.load();

    return (
        <ShadowedText
            tooltip={props.showTip ? `${Numbers.format(value)}${preferences.temperatureUnitSymbol}` : ''}
            {...props}>
            {`${props.prefix || ''}${Math.round(value)}${preferences.temperatureUnitSymbol}`}
        </ShadowedText>
    );
};

Temperature.propTypes = {
    prefix  : PropTypes.string,
    showTip : PropTypes.bool,
    ...Text.propTypes,
};
