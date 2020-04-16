import { LocationOn, } from '@material-ui/icons';
import React from 'react';

import { Preferences, } from '../../models/Preferences';
import { Page, } from '../layouts/Page';
import { Choices, } from '../views/Choices';

export const Locations = () => {
    const preferences = Preferences.load();

    const [ locations,        setLocations,        ] = React.useState(preferences.locations.map(location => location.displayName));
    const [ selectedLocation, setSelectedLocation, ] = React.useState(preferences.favoriteLocation.displayName);

    return (
        <Page title='Locations'>
            <Choices
                icon={<LocationOn />}
                value={selectedLocation}
                values={locations}
                onSelect={(selected, index) => {
                    preferences.lastRefreshTime       = 0;
                    preferences.favoriteLocationIndex = index;
                    preferences.save();

                    setSelectedLocation(preferences.favoriteLocation.displayName);
                }}
                onDelete={deletedLocation => {
                    preferences.locations = preferences.locations.filter(location => location.displayName !== deletedLocation);
                    preferences.save();

                    setLocations(preferences.locations.map(location => location.displayName));
                }} />
        </Page>
    );
};
