let service;
let geoCoder;

export const GoogleMapApiClient = {};

GoogleMapApiClient.predict = (address, callback) => {
    if (!service) service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions({
        input : address,
    }, (results, status) => {
        if (status === 'OK') {
            callback(results.map(result => result.description));
        } else {
            console.error(`Autocomplete service failed for the following reason: ${status}`);

            callback();
        }
    });
};

GoogleMapApiClient.resolve = (address, callback) => {
    if (!geoCoder) geoCoder = new window.google.maps.Geocoder();

    geoCoder.geocode({
        address,
    }, (results, status) => {
        if (status === 'OK') {
            if (results.length > 0) {
                callback(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            } else {
                console.error('Geocoder returned empty results');

                callback();
            }
        } else {
            console.error(`Geocoder failed for the following reason: ${status}`);

            callback();
        }
    });
};
