import { useScript, } from '@ayltai/use-script';
import { TextField, } from '@material-ui/core';
import { Autocomplete, } from '@material-ui/lab';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { GoogleMapApiClient, } from '../../api/GoogleMapApiClient';
import { Location, } from '../../models/Location';
import { Notification, } from '../../components/views/Notification';

export const SearchLocation = props => {
    const [ isLoaded, hasError, ] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`);

    const [ suggestions, setSuggestions, ] = React.useState([]);

    const { t, } = useTranslation();

    return (
        <>
            <Autocomplete
                freeSolo
                autoComplete
                clearOnEscape
                disableListWrap
                includeInputInList
                options={suggestions || []}
                renderInput={params => (
                    <TextField
                        {...params}
                        margin='dense'
                        placeholder={t('Search')}
                        onChange={event => {
                            if (event.target.value && event.target.value.length > 0) {
                                throttle(() => GoogleMapApiClient.predict(event.target.value, setSuggestions), 200)();
                            } else {
                                setSuggestions([]);
                            }
                        }} />
                )}
                onChange={(event, value, reason) => {
                    if (props.onSelect && reason === 'select-option' && value) GoogleMapApiClient.resolve(value, (latitude, longitude) => {
                        if (latitude && longitude) props.onSelect(new Location(latitude, longitude, value));
                    });
                }} />
            <Notification
                type='error'
                message={t('Failed to load Google Maps API')}
                show={hasError && !isLoaded}
                autoClose />
        </>
    );
};

SearchLocation.propTypes = {
    onSelect : PropTypes.func,
};
