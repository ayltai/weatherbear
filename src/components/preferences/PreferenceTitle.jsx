import { Divider, ListSubheader, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

export const PreferenceTitle = props => {
    const { t, } = useTranslation();

    return (
        <>
            {props.divider && <Divider />}
            <ListSubheader disableSticky>{t(props.title)}</ListSubheader>
        </>
    );
};

PreferenceTitle.propTypes = {
    title   : PropTypes.string.isRequired,
    divider : PropTypes.bool,
};
