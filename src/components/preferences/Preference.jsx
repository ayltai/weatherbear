import { ListItem, ListItemSecondaryAction, ListItemText, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

export const Preference = props => {
    const { t, } = useTranslation();

    return (
        <ListItem
            button
            onClick={() => {
                if (props.onClick) props.onClick();
            }}>
            <ListItemText
                primary={t(props.title)}
                secondary={t(props.description)} />
            {props.secondaryAction && (
                <ListItemSecondaryAction>
                    {props.secondaryAction}
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

Preference.propTypes = {
    title           : PropTypes.string.isRequired,
    description     : PropTypes.string,
    secondaryAction : PropTypes.node,
    onClick         : PropTypes.func,
};
