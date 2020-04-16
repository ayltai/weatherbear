import { IconButton, makeStyles, Tooltip, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

export const Button = props => {
    const classes = makeStyles(theme => ({
        container : {
            padding : theme.spacing(1),
        },
    }))();

    const { t, } = useTranslation();

    return (
        <Tooltip title={t(props.tooltip)}>
            <IconButton
                className={classes.container}
                edg={props.edge}
                size={props.size}
                onClick={() => {
                    if (props.onClick) props.onClick();
                }}>
                {props.icon}
            </IconButton>
        </Tooltip>
    );
};

Button.propTypes = {
    className : PropTypes.string,
    tooltip   : PropTypes.string,
    icon      : PropTypes.node,
    edge      : PropTypes.oneOf([
        'end',
        'start',
    ]),
    size      : PropTypes.oneOf([
        'small',
        'medium',
    ]),
    onClick   : PropTypes.func,
};
