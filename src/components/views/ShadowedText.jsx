import { makeStyles, Tooltip, Typography, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

export const ShadowedText = props => {
    const classes = makeStyles(theme => ({
        text : {
            padding    : theme.spacing(0.5),
            textShadow : theme.palette.type === 'dark' ? '0 0 7px rgba(0, 0, 0, 0.6)' : '0 0 7px rgba(255, 255, 255, 0.6)',
        },
    }))();

    const { t, } = useTranslation();

    return (
        <Tooltip
            className={props.className}
            title={t(props.tooltip || '')}>
            <Typography
                className={classes.text}
                component='p'
                align={props.align}
                color={props.color}
                noWrap={props.noWrap}
                variant={props.variant}>
                {props.children}
            </Typography>
        </Tooltip>
    );
};

ShadowedText.propTypes = {
    className : PropTypes.string,
    tooltip   : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    children  : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    align     : PropTypes.oneOf([
        'inherit',
        'left',
        'center',
        'right',
        'justify',
    ]),
    color     : PropTypes.oneOf([
        'initial',
        'inherit',
        'primary',
        'secondary',
        'textPrimary',
        'textSecondary',
        'error',
    ]),
    noWrap    : PropTypes.bool,
    variant   : PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ]),
};
