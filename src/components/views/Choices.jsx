import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, } from '@material-ui/core';
import { Delete, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Button, } from './Button';

export const Choices = props => {
    const { t, } = useTranslation();

    return (
        <List>
            {props.values.map((value, index) => (
                <ListItem
                    key={index}
                    button
                    onClick={() => {
                        if (props.onSelect) props.onSelect(value, index);
                    }}>
                    {props.value === value && (
                        <ListItemIcon>{props.icon}</ListItemIcon>
                    )}
                    <ListItemText
                        inset={props.value !== value}
                        primary={t(value)} />
                    <ListItemSecondaryAction>
                        <Button
                            tooltip='Delete'
                            edge='end'
                            icon={<Delete />}
                            onClick={() => {
                                if (props.onDelete) props.onDelete(value, index);
                            }} />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

Choices.propTypes = {
    className : PropTypes.string,
    icon      : PropTypes.node,
    value     : PropTypes.string,
    values    : PropTypes.arrayOf(PropTypes.string),
    onSelect  : PropTypes.func,
    onDelete  : PropTypes.func,
};
