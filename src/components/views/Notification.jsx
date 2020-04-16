import { Snackbar, } from '@material-ui/core';
import { Alert, } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

export const Notification = props => {
    const [ open, setOpen, ] = React.useState(props.show);

    const { t, } = useTranslation();

    const closeable = typeof props.closeable === 'undefined' || props.closeable === null || props.closeable;

    const handleClose = () => {
        if (closeable) {
            if (props.onClose) props.onClose();

            setOpen(false);
        }
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={props.autoClose ? 3000 : null}
            onClose={() => handleClose}>
            <Alert
                severity={props.type}
                onClose={() => handleClose}>
                {t(props.message)}
            </Alert>
        </Snackbar>
    );
};

Notification.propTypes = {
    show      : PropTypes.bool,
    type      : PropTypes.oneOf([
        'info',
        'warning',
        'error',
        'success',
    ]),
    message   : PropTypes.string,
    autoClose : PropTypes.bool,
    closeable : PropTypes.bool,
    onClose   : PropTypes.func,
};
