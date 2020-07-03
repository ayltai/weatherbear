import PropTypes from 'prop-types';
import React from 'react';

import { MeasurementHelper, } from '../../utils/MeasurementHelper';
import { Constants } from '../../Constants';
import { ShadowedText, } from './ShadowedText';

export const Temperature = props => {
    const value = Number(props.children) || 0;
    const unit  = props.unit || Constants.UNIT_SI;

    return (
        <ShadowedText
            tooltip={props.showTip ? `${MeasurementHelper.toTemperature(value, unit)}` : ''}
            {...props}>
            {`${props.prefix || ''}${MeasurementHelper.toTemperature(value, unit, 0)}`}
        </ShadowedText>
    );
};

Temperature.propTypes = {
    prefix  : PropTypes.string,
    unit    : PropTypes.oneOf([
        Constants.UNIT_SI,
        Constants.UNIT_IMPERIAL,
    ]),
    showTip : PropTypes.bool,
    ...Text.propTypes,
};
