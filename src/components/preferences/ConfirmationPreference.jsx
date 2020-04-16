import PropTypes from 'prop-types';
import React from 'react';

import { Confirmation, } from '../views/Confirmation';
import { Preference, } from './Preference';

export const ConfirmationPreference = props => {
    const [ open, setOpen, ] = React.useState(false);

    return (
        <>
            <Preference
                {...props}
                onClick={() => setOpen(true)} />
            <Confirmation
                show={open}
                title={props.title}
                message={props.message}
                onClose={() => setOpen(false)}
                onResponse={props.onResponse} />
        </>
    );
};

ConfirmationPreference.propTypes = {
    ...Preference.propTypes,
    message        : PropTypes.string.isRequired,
    positiveButton : PropTypes.string,
    negativeButton : PropTypes.string,
    onResponse     : PropTypes.func,
};
