import nock from 'nock';
import { UnsplashApiClient } from './UnsplashApiClient';

const query  = 'computer-desk';
const width  = 320;
const height = 822;

const response = {
    'id'                       : '3hlQ2ty9kUY',
    'created_at'               : '2018-02-12T17:02:02-05:00',
    'updated_at'               : '2020-04-07T01:17:52-04:00',
    'promoted_at'              : '2018-02-13T08:08:13-05:00',
    'width'                    : 5396,
    'height'                   : 3634,
    'color'                    : '#f9f9fa',
    'description'              : null,
    'alt_description'          : 'MacBook Pro beside silver monitor on table',
    'urls'                     : {
        'raw'     : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'full'    : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'regular' : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'small'   : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'thumb'   : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
        'custom'  : 'https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&h=822&w=320&fit=crop&ixid=eyJhcHBfaWQiOjI0NDM4fQ',
    },
    'links'                    : {
        'self'              : 'https://api.unsplash.com/photos/3hlQ2ty9kUY',
        'html'              : 'https://unsplash.com/photos/3hlQ2ty9kUY',
        'download'          : 'https://unsplash.com/photos/3hlQ2ty9kUY/download',
        'download_location' : 'https://api.unsplash.com/photos/3hlQ2ty9kUY/download',
    },
    'categories'               : [],
    'likes'                    : 230,
    'liked_by_user'            : false,
    'current_user_collections' : [],
    'user'                     : {
        'id'                 : '-ne6m-L6lDs',
        'updated_at'         : '2020-04-08T18:42:30-04:00',
        'username'           : 'karishea',
        'name'               : 'Kari Shea',
        'first_name'         : 'Kari',
        'last_name'          : 'Shea',
        'twitter_username'   : 'karishea',
        'portfolio_url'      : 'https://www.karisheacreative.com/',
        'bio'                : 'graphic designer  (full time)  \u2014  photographer  (just for fun)  \u2014  instagram: KariShea              contribute to my house plant addiction   \u2014  paypal.me/KariShea                                         ',
        'location'           : 'Grand Rapids, MI',
        'links'              : {
            'self'      : 'https://api.unsplash.com/users/karishea',
            'html'      : 'https://unsplash.com/@karishea',
            'photos'    : 'https://api.unsplash.com/users/karishea/photos',
            'likes'     : 'https://api.unsplash.com/users/karishea/likes',
            'portfolio' : 'https://api.unsplash.com/users/karishea/portfolio',
            'following' : 'https://api.unsplash.com/users/karishea/following',
            'followers' : 'https://api.unsplash.com/users/karishea/followers',
        },
        'profile_image'      : {
            'small'  : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
            'medium' : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
            'large'  : 'https://images.unsplash.com/profile-1586385748806-c32f0b9dc735image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
        },
        'instagram_username' : 'karishea',
        'total_collections'  : 49,
        'total_likes'        : 314,
        'total_photos'       : 81,
        'accepted_tos'       : true,
    },
    'exif'                     : {
        'make'          : 'Canon',
        'model'         : 'Canon EOS 6D',
        'exposure_time' : '1/400',
        'aperture'      : '1.4',
        'focal_length'  : '50.0',
        'iso'           : 200,
    },
    'location'                 : {
        'title'    : 'Treadstone Funding, Grand Rapids, United States',
        'name'     : 'Treadstone Funding, Grand Rapids, United States',
        'city'     : 'Grand Rapids',
        'country'  : 'United States',
        'position' : {
            'latitude'  : 42.962856,
            'longitude' : -85.663543,
        },
    },
    'views'                    : 6272382,
    'downloads'                : 10448,
};

nock.disableNetConnect();

nock(process.env.REACT_APP_UNSPLASH_API_ENDPOINT)
    .persist()
    .defaultReplyHeaders({
        'access-control-allow-headers'  : 'accept-version,authorization',
        'access-control-allow-origin'   : '*',
        'access-control-request-method' : '*',
    })
    .options('/photos/random')
    .query(true)
    .reply(204)
    .get('/photos/random')
    .query(true)
    .reply(200, response);

describe('UnsplashApiClient', () => {
    it('getRandomPhoto', async () => {
        const response = await UnsplashApiClient.getRandomPhoto(query, width, height);

        expect(response.urls.regular).toEqual('https://images.unsplash.com/photo-1518472803163-8d3a9e90792c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=320&h=822&fit=max&ixid=eyJhcHBfaWQiOjI0NDM4fQ');
    });
});
