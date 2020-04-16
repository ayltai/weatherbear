import { Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import { Check, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Preference, } from './Preference';

export const ChoicePreference = props => {
    const [ open, setOpen, ] = React.useState(false);

    const { t, } = useTranslation();

    return (
        <>
            <Preference
                {...props}
                onClick={() => setOpen(true)} />
            <Dialog
                open={open}
                onBackdropClick={() => setOpen(false)}>
                <DialogTitle>{props.title}</DialogTitle>
                <List>
                    {props.values.map((value, index) => (
                        <ListItem
                            key={index}
                            button
                            onClick={() => {
                                setOpen(false);

                                if (props.onChange) props.onChange(value.value, index);
                            }}>
                            {props.value === value.value && (
                                <ListItemIcon>
                                    <Check />
                                </ListItemIcon>
                            )}
                            <ListItemText
                                inset={props.value !== value.value}
                                primary={t(value.label)} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </>
    );
};

ChoicePreference.propTypes = {
    ...Preference.propTypes,
    value    : PropTypes.any,
    values   : PropTypes.arrayOf(PropTypes.object),
    onChange : PropTypes.func,
};
