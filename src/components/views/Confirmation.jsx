import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Confirmation = props => {
    const { t, } = useTranslation();

    return (
        <Dialog
            open={props.show}
            onBackdropClick={() => {
                if (props.onClose) props.onClose();
            }}>
            <DialogTitle>{t(props.title)}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t(props.message)}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    color='primary'
                    onClick={() => {
                        if (props.onResponse) props.onResponse(false);

                        if (props.onClose) props.onClose();
                    }}>
                    {t(props.negativeButton || 'No')}
                </Button>
                <Button
                    color='default'
                    onClick={() => {
                        if (props.onResponse) props.onResponse(true);

                        if (props.onClose) props.onClose();
                    }}>
                    {t(props.positiveButton || 'Yes')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

Confirmation.propTypes = {
    title          : PropTypes.string.isRequired,
    message        : PropTypes.string.isRequired,
    positiveButton : PropTypes.string,
    negativeButton : PropTypes.string,
    show           : PropTypes.bool,
    onClose        : PropTypes.func,
    onResponse     : PropTypes.func,
};
