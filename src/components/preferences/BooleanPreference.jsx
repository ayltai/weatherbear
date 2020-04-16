import { Switch, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { Preference, } from './Preference';

export const BooleanPreference = props => (
    <Preference
        {...props}
        secondaryAction={
            <Switch
                checked={props.checked}
                onChange={event => {
                    if (props.onChange) props.onChange(event.target.checked);
                }} />
        } />
);

BooleanPreference.propTypes = {
    ...Preference.propTypes,
    checked  : PropTypes.bool,
    onChange : PropTypes.func,
};
