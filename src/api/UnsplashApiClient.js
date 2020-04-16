import Unsplash, { toJson } from 'unsplash-js';

export const UnsplashApiClient = {};

UnsplashApiClient.getRandomPhoto = (query, width, height) => new Promise((resolve, reject) => new Unsplash({
    apiUrl : process.env.REACT_APP_UNSPLASH_API_ENDPOINT,
}).photos.getRandomPhoto({
    query,
}).then(toJson).then(response => {
    response.urls.regular = response.urls.regular.replace('w=1080', `w=${width}&h=${height}`);

    resolve(response);
}).catch(error => reject(error)));
