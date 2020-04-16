import nock from 'nock';

import { AccuWeatherApiClient, } from './AccuWeatherApiClient';

const latitude = 22.3080;
const longitude = 113.9185;
const locationKey = '1123411';
const locale = 'en';

const locationResponse = {
    'Version'                : 1,
    'Key'                    : '1123411',
    'Type'                   : 'City',
    'Rank'                   : 45,
    'LocalizedName'          : 'Islands District',
    'EnglishName'            : 'Islands District',
    'PrimaryPostalCode'      : '',
    'Region'                 : {
        'ID'            : 'ASI',
        'LocalizedName' : 'Asia',
        'EnglishName'   : 'Asia',
    },
    'Country'                : {
        'ID'            : 'HK',
        'LocalizedName' : 'Hong Kong',
        'EnglishName'   : 'Hong Kong',
    },
    'AdministrativeArea'     : {
        'ID'            : 'IS',
        'LocalizedName' : 'Islands',
        'EnglishName'   : 'Islands',
        'Level'         : 1,
        'LocalizedType' : 'District',
        'EnglishType'   : 'District',
        'CountryID'     : 'HK',
    },
    'TimeZone'               : {
        'Code'             : 'CST',
        'Name'             : 'Asia/Hong_Kong',
        'GmtOffset'        : 8,
        'IsDaylightSaving' : false,
        'NextOffsetChange' : null,
    },
    'GeoPosition'            : {
        'Latitude'  : 22.279,
        'Longitude' : 113.943,
        'Elevation' : {
            'Metric'   : {
                'Value'    : 42,
                'Unit'     : 'm',
                'UnitType' : 5,
            },
            'Imperial' : {
                'Value'    : 137,
                'Unit'     : 'ft',
                'UnitType' : 0,
            }
        }
    },
    'IsAlias'                : false,
    'ParentCity'             : {
        'Key'           : '2333525',
        'LocalizedName' : 'New Territories',
        'EnglishName'   : 'New Territories',
    },
    'SupplementalAdminAreas' : [
        {
            'Level'         : 0,
            'LocalizedName' : 'New Territories',
            'EnglishName'   : 'New Territories',
        }
    ],
    'DataSets'               : [
        'AirQuality',
        'AirQualityCurrentConditions',
        'AirQualityForecasts',
        'MinuteCast',
        'PremiumAirQuality',
    ],
};

const currentWeatherResponse = [
    {
        'LocalObservationDateTime'       : '2020-04-14T14:55:00+08:00',
        'EpochTime'                      : 1586847300,
        'WeatherText'                    : 'Cloudy',
        'WeatherIcon'                    : 7,
        'HasPrecipitation'               : false,
        'PrecipitationType'              : null,
        'LocalSource'                    : {
            'Id'          : 7,
            'Name'        : 'Huafeng',
            'WeatherCode' : '01',
        },
        'IsDayTime'                      : true,
        'Temperature'                    : {
            'Metric'   : {
                'Value'    : 22.2,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 72,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'RealFeelTemperature'            : {
            'Metric'   : {
                'Value'    : 23.4,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 74,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'RealFeelTemperatureShade'       : {
            'Metric'   : {
                'Value'    : 20.4,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 69,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'RelativeHumidity'               : 56,
        'DewPoint'                       : {
            'Metric'   : {
                'Value'    : 12.8,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 55,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'Wind'                           : {
            'Direction' : {
                'Degrees'   : 270,
                'Localized' : 'W',
                'English'   : 'W',
            },
            'Speed'     : {
                'Metric'   : {
                    'Value'    : 16.7,
                    'Unit'     : 'km/h',
                    'UnitType' : 7,
                },
                'Imperial' : {
                    'Value'    : 10.4,
                    'Unit'     : 'mi/h',
                    'UnitType' : 9,
                },
            },
        },
        'WindGust'                       : {
            'Speed' : {
                'Metric'   : {
                    'Value'    : 16.7,
                    'Unit'     : 'km/h',
                    'UnitType' : 7,
                },
                'Imperial' : {
                    'Value'    : 10.4,
                    'Unit'     : 'mi/h',
                    'UnitType' : 9,
                },
            },
        },
        'UVIndex'                        : 4,
        'UVIndexText'                    : 'Moderate',
        'Visibility'                     : {
            'Metric'   : {
                'Value'    : 16.1,
                'Unit'     : 'km',
                'UnitType' : 6,
            },
            'Imperial' : {
                'Value'    : 10,
                'Unit'     : 'mi',
                'UnitType' : 2,
            }
        },
        'ObstructionsToVisibility'       : '',
        'CloudCover'                     : 91,
        'Ceiling'                        : {
            'Metric'   : {
                'Value'    : 9144,
                'Unit'     : 'm',
                'UnitType' : 5,
            },
            'Imperial' : {
                'Value'    : 30000,
                'Unit'     : 'ft',
                'UnitType' : 0,
            }
        },
        'Pressure'                       : {
            'Metric'   : {
                'Value'    : 1016,
                'Unit'     : 'mb',
                'UnitType' : 14,
            },
            'Imperial' : {
                'Value'    : 30,
                'Unit'     : 'inHg',
                'UnitType' : 12,
            },
        },
        'PressureTendency'               : {
            'LocalizedText' : 'Falling',
            'Code'          : 'F'
        },
        'Past24HourTemperatureDeparture' : {
            'Metric'   : {
                'Value'    : -0.6,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : -1,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'ApparentTemperature'            : {
            'Metric'   : {
                'Value'    : 22.2,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 72,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'WindChillTemperature'           : {
            'Metric'   : {
                'Value'    : 22.2,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 72,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'WetBulbTemperature'             : {
            'Metric'   : {
                'Value'    : 16.3,
                'Unit'     : 'C',
                'UnitType' : 17,
            },
            'Imperial' : {
                'Value'    : 61,
                'Unit'     : 'F',
                'UnitType' : 18,
            },
        },
        'Precip1hr'                      : {
            'Metric'   : {
                'Value'    : 0,
                'Unit'     : 'mm',
                'UnitType' : 3,
            },
            'Imperial' : {
                'Value'    : 0,
                'Unit'     : 'in',
                'UnitType' : 1,
            },
        },
        'PrecipitationSummary'           : {
            'Precipitation' : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'PastHour'      : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past3Hours'    : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past6Hours'    : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past9Hours'    : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past12Hours'   : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past18Hours'   : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
            'Past24Hours'   : {
                'Metric'   : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Imperial' : {
                    'Value'    : 0,
                    'Unit'     : 'in',
                    'UnitType' : 1,
                },
            },
        },
        'TemperatureSummary'             : {
            'Past6HourRange'  : {
                'Minimum' : {
                    'Metric'   : {
                        'Value'    : 20.2,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 68,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
                'Maximum' : {
                    'Metric'   : {
                        'Value'    : 23.5,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 74,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
            },
            'Past12HourRange' : {
                'Minimum' : {
                    'Metric'   : {
                        'Value'    : 17.8,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 64,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
                'Maximum' : {
                    'Metric'   : {
                        'Value'    : 23.5,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 74,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
            },
            'Past24HourRange' : {
                'Minimum' : {
                    'Metric'   : {
                        'Value'    : 17.8,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 64,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
                'Maximum' : {
                    'Metric'   : {
                        'Value'    : 24,
                        'Unit'     : 'C',
                        'UnitType' : 17,
                    },
                    'Imperial' : {
                        'Value'    : 75,
                        'Unit'     : 'F',
                        'UnitType' : 18,
                    },
                },
            },
        },
        'MobileLink'                     : 'http://m.accuweather.com/en/hk/islands-district/1123411/current-weather/1123411?lang=en-us',
        'Link'                           : 'http://www.accuweather.com/en/hk/islands-district/1123411/current-weather/1123411?lang=en-us',
    },
];

const hourlyWeatherResponse = [
    {
        'DateTime'                 : '2020-04-14T16:00:00+08:00',
        'EpochDateTime'            : 1586851200,
        'WeatherIcon'              : 6,
        'IconPhrase'               : 'Mostly cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : true,
        'Temperature'              : {
            'Value'    : 22.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 22.5,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 17.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 13.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 113,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 20.4,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 57,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 2,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 89,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=16&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=16&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T17:00:00+08:00',
        'EpochDateTime'            : 1586854800,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : true,
        'Temperature'              : {
            'Value'    : 22.5,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 21.6,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 16.8,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 13.4,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 112,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 18.5,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            }
        },
        'RelativeHumidity'         : 56,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 1,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 90,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=17&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=17&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T18:00:00+08:00',
        'EpochDateTime'            : 1586858400,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : true,
        'Temperature'              : {
            'Value'    : 22.3,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 20.9,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 17.4,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 14.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 11.1,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 109,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 18.5,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 59,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 3109,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 91,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=18&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=18&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T19:00:00+08:00',
        'EpochDateTime'            : 1586862000,
        'WeatherIcon'              : 38,
        'IconPhrase'               : 'Mostly cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 22.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 20.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 17.9,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 15,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 119,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 20.4,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            }
        },
        'RelativeHumidity'         : 63,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 85,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=19&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=19&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T20:00:00+08:00',
        'EpochDateTime'            : 1586865600,
        'WeatherIcon'              : 38,
        'IconPhrase'               : 'Mostly cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 22.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 20.4,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 15.5,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 14.8,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 117,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 20.4,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            }
        },
        'RelativeHumidity'         : 66,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 81,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=20&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=20&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T21:00:00+08:00',
        'EpochDateTime'            : 1586869200,
        'WeatherIcon'              : 38,
        'IconPhrase'               : 'Mostly cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 21.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 20.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 15.9,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 14.8,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 117,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 20.4,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            }
        },
        'RelativeHumidity'         : 70,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 85,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=21&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=21&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T22:00:00+08:00',
        'EpochDateTime'            : 1586872800,
        'WeatherIcon'              : 38,
        'IconPhrase'               : 'Mostly cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 21.6,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 20.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 112,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            }
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 18.5,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 70,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 89,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=22&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=22&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-14T23:00:00+08:00',
        'EpochDateTime'            : 1586876400,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 21.3,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 19.9,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 117,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 18.5,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 72,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 92,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=23&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=1&hbhhour=23&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-15T00:00:00+08:00',
        'EpochDateTime'            : 1586880000,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 21.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 19.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 113,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 18.5,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 73,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 92,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=0&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=0&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-15T01:00:00+08:00',
        'EpochDateTime'            : 1586883600,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 20.7,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 19.6,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 18.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16.4,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 11.1,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 114,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 16.7,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            }
        },
        'RelativeHumidity'         : 76,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 92,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=1&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=1&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-15T02:00:00+08:00',
        'EpochDateTime'            : 1586887200,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 20.3,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 19.5,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 17.9,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16.3,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 7.4,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 107,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 14.8,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 77,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 92,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=2&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=2&unit=c&lang=en-us',
    },
    {
        'DateTime'                 : '2020-04-15T03:00:00+08:00',
        'EpochDateTime'            : 1586890800,
        'WeatherIcon'              : 7,
        'IconPhrase'               : 'Cloudy',
        'HasPrecipitation'         : false,
        'IsDaylight'               : false,
        'Temperature'              : {
            'Value'    : 20.1,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'RealFeelTemperature'      : {
            'Value'    : 19.4,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'WetBulbTemperature'       : {
            'Value'    : 17.8,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'DewPoint'                 : {
            'Value'    : 16.2,
            'Unit'     : 'C',
            'UnitType' : 17,
        },
        'Wind'                     : {
            'Speed'     : {
                'Value'    : 5.6,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
            'Direction' : {
                'Degrees'   : 105,
                'Localized' : 'ESE',
                'English'   : 'ESE',
            },
        },
        'WindGust'                 : {
            'Speed' : {
                'Value'    : 13,
                'Unit'     : 'km/h',
                'UnitType' : 7,
            },
        },
        'RelativeHumidity'         : 78,
        'Visibility'               : {
            'Value'    : 16.1,
            'Unit'     : 'km',
            'UnitType' : 6,
        },
        'Ceiling'                  : {
            'Value'    : 9144,
            'Unit'     : 'm',
            'UnitType' : 5,
        },
        'UVIndex'                  : 0,
        'UVIndexText'              : 'Low',
        'PrecipitationProbability' : 0,
        'RainProbability'          : 0,
        'SnowProbability'          : 0,
        'IceProbability'           : 0,
        'TotalLiquid'              : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Rain'                     : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'Snow'                     : {
            'Value'    : 0,
            'Unit'     : 'cm',
            'UnitType' : 4,
        },
        'Ice'                      : {
            'Value'    : 0,
            'Unit'     : 'mm',
            'UnitType' : 3,
        },
        'CloudCover'               : 94,
        'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=3&unit=c&lang=en-us',
        'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/hourly-weather-forecast/1123411?day=2&hbhhour=3&unit=c&lang=en-us',
    },
];

const dailyWeatherResponse = {
    'Headline'       : {
        'EffectiveDate'      : '2020-04-16T07:00:00+08:00',
        'EffectiveEpochDate' : 1586991600,
        'Severity'           : 5,
        'Text'               : 'Air quality will be unhealthy for sensitive groups late Thursday night through Saturday morning',
        'Category'           : 'rain',
        'EndDate'            : '2020-04-16T19:00:00+08:00',
        'EndEpochDate'       : 1587034800,
        'MobileLink'         : 'http://m.accuweather.com/en/hk/islands-district/1123411/extended-weather-forecast/1123411?unit=c&lang=en-us',
        'Link'               : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?unit=c&lang=en-us',
    },
    'DailyForecasts' : [
        {
            'Date'                     : '2020-04-14T07:00:00+08:00',
            'EpochDate'                : 1586818800,
            'Sun'                      : {
                'Rise'      : '2020-04-14T06:05:00+08:00',
                'EpochRise' : 1586815500,
                'Set'       : '2020-04-14T18:44:00+08:00',
                'EpochSet'  : 1586861040,
            },
            'Moon'                     : {
                'Rise'      : '2020-04-14T00:16:00+08:00',
                'EpochRise' : 1586794560,
                'Set'       : '2020-04-14T11:17:00+08:00',
                'EpochSet'  : 1586834220,
                'Phase'     : 'Last',
                'Age'       : 21,
            },
            'Temperature'              : {
                'Minimum' : {
                    'Value'    : 19.3,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 23.5,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperature'      : {
                'Minimum' : {
                    'Value'    : 18.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 26.2,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperatureShade' : {
                'Minimum' : {
                    'Value'    : 18.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 21.9,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'HoursOfSun'               : 2.8,
            'DegreeDaySummary'         : {
                'Heating' : {
                    'Value'    : 0,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Cooling' : {
                    'Value'    : 3,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'AirAndPollen'             : [
                {
                    'Name'          : 'AirQuality',
                    'Value'         : 58,
                    'Category'      : 'Moderate',
                    'CategoryValue' : 2,
                    'Type'          : 'Particle Pollution',
                },
                {
                    'Name'          : 'Grass',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Mold',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Ragweed',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Tree',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'UVIndex',
                    'Value'         : 7,
                    'Category'      : 'High',
                    'CategoryValue' : 3,
                },
            ],
            'Day'                      : {
                'Icon'                     : 7,
                'IconPhrase'               : 'Cloudy',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '02',
                },
                'ShortPhrase'              : 'Cloudy',
                'LongPhrase'               : 'Cloudy',
                'PrecipitationProbability' : 9,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 9,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 13,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 97,
                        'Localized' : 'E',
                        'English'   : 'E',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 22.2,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 108,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 89
            },
            'Night'                    : {
                'Icon'                     : 35,
                'IconPhrase'               : 'Partly cloudy',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Partly cloudy',
                'LongPhrase'               : 'Partly cloudy',
                'PrecipitationProbability' : 3,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 3,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 9.3,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 102,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 20.4,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 119,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 90,
            },
            'Sources'                  : [
                'AccuWeather',
                'Huafeng'
            ],
            'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=1&unit=c&lang=en-us',
            'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=1&unit=c&lang=en-us',
        },
        {
            'Date'                     : '2020-04-15T07:00:00+08:00',
            'EpochDate'                : 1586905200,
            'Sun'                      : {
                'Rise'      : '2020-04-15T06:04:00+08:00',
                'EpochRise' : 1586901840,
                'Set'       : '2020-04-15T18:45:00+08:00',
                'EpochSet'  : 1586947500,
            },
            'Moon'                     : {
                'Rise'      : '2020-04-15T01:10:00+08:00',
                'EpochRise' : 1586884200,
                'Set'       : '2020-04-15T12:12:00+08:00',
                'EpochSet'  : 1586923920,
                'Phase'     : 'WaningCrescent',
                'Age'       : 22,
            },
            'Temperature'              : {
                'Minimum' : {
                    'Value'    : 20.5,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 24.2,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperature'      : {
                'Minimum' : {
                    'Value'    : 20.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 28.1,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperatureShade' : {
                'Minimum' : {
                    'Value'    : 20.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 23.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'HoursOfSun'               : 2.4,
            'DegreeDaySummary'         : {
                'Heating' : {
                    'Value'    : 0,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Cooling' : {
                    'Value'    : 4,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'AirAndPollen'             : [
                {
                    'Name'          : 'AirQuality',
                    'Value'         : 64,
                    'Category'      : 'Moderate',
                    'CategoryValue' : 2,
                    'Type'          : 'Particle Pollution',
                },
                {
                    'Name'          : 'Grass',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Mold',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Ragweed',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Tree',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'UVIndex',
                    'Value'         : 7,
                    'Category'      : 'High',
                    'CategoryValue' : 3,
                },
            ],
            'Day'                      : {
                'Icon'                     : 6,
                'IconPhrase'               : 'Mostly cloudy',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Mostly cloudy',
                'LongPhrase'               : 'Mostly cloudy',
                'PrecipitationProbability' : 0,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 0,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 5.6,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 85,
                        'Localized' : 'E',
                        'English'   : 'E',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 16.7,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 152,
                        'Localized' : 'SSE',
                        'English'   : 'SSE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 92,
            },
            'Night'                    : {
                'Icon'                     : 35,
                'IconPhrase'               : 'Partly cloudy',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Partly cloudy',
                'LongPhrase'               : 'Partly cloudy',
                'PrecipitationProbability' : 0,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 0,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 7.4,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 144,
                        'Localized' : 'SE',
                        'English'   : 'SE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 16.7,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 148,
                        'Localized' : 'SSE',
                        'English'   : 'SSE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 90,
            },
            'Sources'                  : [
                'AccuWeather',
                'Huafeng',
            ],
            'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=2&unit=c&lang=en-us',
            'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=2&unit=c&lang=en-us',
        },
        {
            'Date'                     : '2020-04-16T07:00:00+08:00',
            'EpochDate'                : 1586991600,
            'Sun'                      : {
                'Rise'      : '2020-04-16T06:03:00+08:00',
                'EpochRise' : 1586988180,
                'Set'       : '2020-04-16T18:45:00+08:00',
                'EpochSet'  : 1587033900,
            },
            'Moon'                     : {
                'Rise'      : '2020-04-16T01:59:00+08:00',
                'EpochRise' : 1586973540,
                'Set'       : '2020-04-16T13:07:00+08:00',
                'EpochSet'  : 1587013620,
                'Phase'     : 'WaningCrescent',
                'Age'       : 23,
            },
            'Temperature'              : {
                'Minimum' : {
                    'Value'    : 21.5,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 25.5,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperature'      : {
                'Minimum' : {
                    'Value'    : 21.1,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 28.1,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperatureShade' : {
                'Minimum' : {
                    'Value'    : 21.1,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 24.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'HoursOfSun'               : 2.4,
            'DegreeDaySummary'         : {
                'Heating' : {
                    'Value'    : 0,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Cooling' : {
                    'Value'    : 6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'AirAndPollen'             : [
                {
                    'Name'          : 'AirQuality',
                    'Value'         : 87,
                    'Category'      : 'Moderate',
                    'CategoryValue' : 2,
                    'Type'          : 'Particle Pollution',
                },
                {
                    'Name'          : 'Grass',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Mold',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Ragweed',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Tree',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'UVIndex',
                    'Value'         : 6,
                    'Category'      : 'High',
                    'CategoryValue' : 3,
                },
            ],
            'Day'                      : {
                'Icon'                     : 12,
                'IconPhrase'               : 'Showers',
                'HasPrecipitation'         : true,
                'PrecipitationType'        : 'Rain',
                'PrecipitationIntensity'   : 'Light',
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '03',
                },
                'ShortPhrase'              : 'A shower in the a.m.; cloudy',
                'LongPhrase'               : 'A passing shower in the morning; otherwise, cloudy',
                'PrecipitationProbability' : 55,
                'ThunderstormProbability'  : 20,
                'RainProbability'          : 55,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 11.1,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 124,
                        'Localized' : 'SE',
                        'English'   : 'SE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 22.2,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 118,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0.5,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0.5,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0.5,
                'HoursOfRain'              : 0.5,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 92,
            },
            'Night'                    : {
                'Icon'                     : 36,
                'IconPhrase'               : 'Intermittent clouds',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Partly to mostly cloudy',
                'LongPhrase'               : 'Partly to mostly cloudy; air quality will be unhealthy for sensitive groups',
                'PrecipitationProbability' : 3,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 3,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 11.1,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 104,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 22.2,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 112,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 82,
            },
            'Sources'                  : [
                'AccuWeather',
                'Huafeng'
            ],
            'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=3&unit=c&lang=en-us',
            'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=3&unit=c&lang=en-us',
        },
        {
            'Date'                     : '2020-04-17T07:00:00+08:00',
            'EpochDate'                : 1587078000,
            'Sun'                      : {
                'Rise'      : '2020-04-17T06:03:00+08:00',
                'EpochRise' : 1587074580,
                'Set'       : '2020-04-17T18:45:00+08:00',
                'EpochSet'  : 1587120300,
            },
            'Moon'                     : {
                'Rise'      : '2020-04-17T02:42:00+08:00',
                'EpochRise' : 1587062520,
                'Set'       : '2020-04-17T14:00:00+08:00',
                'EpochSet'  : 1587103200,
                'Phase'     : 'WaningCrescent',
                'Age'       : 24,
            },
            'Temperature'              : {
                'Minimum' : {
                    'Value'    : 22.1,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 26.3,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperature'      : {
                'Minimum' : {
                    'Value'    : 22.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 30.4,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperatureShade' : {
                'Minimum' : {
                    'Value'    : 22.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 25.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'HoursOfSun'               : 4.5,
            'DegreeDaySummary'         : {
                'Heating' : {
                    'Value'    : 0,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Cooling' : {
                    'Value'    : 6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'AirAndPollen'             : [
                {
                    'Name'          : 'AirQuality',
                    'Value'         : 105,
                    'Category'      : 'Unhealthy (Sensitive)',
                    'CategoryValue' : 3,
                    'Type'          : 'Particle Pollution',
                },
                {
                    'Name'          : 'Grass',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Mold',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Ragweed',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Tree',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'UVIndex',
                    'Value'         : 8,
                    'Category'      : 'Very High',
                    'CategoryValue' : 4,
                },
            ],
            'Day'                      : {
                'Icon'                     : 5,
                'IconPhrase'               : 'Hazy sunshine',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '53',
                },
                'ShortPhrase'              : 'Hazy sun',
                'LongPhrase'               : 'Hazy sun; air quality will be unhealthy for sensitive groups',
                'PrecipitationProbability' : 9,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 9,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 13,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 113,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 20.4,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 121,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 74,
            },
            'Night'                    : {
                'Icon'                     : 36,
                'IconPhrase'               : 'Intermittent clouds',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Partly cloudy',
                'LongPhrase'               : 'Partly cloudy',
                'PrecipitationProbability' : 17,
                'ThunderstormProbability'  : 0,
                'RainProbability'          : 17,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 11.1,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 115,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 18.5,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 121,
                        'Localized' : 'ESE',
                        'English'   : 'ESE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 73,
            },
            'Sources'                  : [
                'AccuWeather',
                'Huafeng'
            ],
            'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=4&unit=c&lang=en-us',
            'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=4&unit=c&lang=en-us',
        },
        {
            'Date'                     : '2020-04-18T07:00:00+08:00',
            'EpochDate'                : 1587164400,
            'Sun'                      : {
                'Rise'      : '2020-04-18T06:02:00+08:00',
                'EpochRise' : 1587160920,
                'Set'       : '2020-04-18T18:46:00+08:00',
                'EpochSet'  : 1587206760,
            },
            'Moon'                     : {
                'Rise'      : '2020-04-18T03:22:00+08:00',
                'EpochRise' : 1587151320,
                'Set'       : '2020-04-18T14:52:00+08:00',
                'EpochSet'  : 1587192720,
                'Phase'     : 'WaningCrescent',
                'Age'       : 25,
            },
            'Temperature'              : {
                'Minimum' : {
                    'Value'    : 23.4,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 26.6,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperature'      : {
                'Minimum' : {
                    'Value'    : 23.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 31.3,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'RealFeelTemperatureShade' : {
                'Minimum' : {
                    'Value'    : 23.7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Maximum' : {
                    'Value'    : 26.8,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'HoursOfSun'               : 5.5,
            'DegreeDaySummary'         : {
                'Heating' : {
                    'Value'    : 0,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
                'Cooling' : {
                    'Value'    : 7,
                    'Unit'     : 'C',
                    'UnitType' : 17,
                },
            },
            'AirAndPollen'             : [
                {
                    'Name'          : 'AirQuality',
                    'Value'         : 75,
                    'Category'      : 'Moderate',
                    'CategoryValue' : 2,
                    'Type'          : 'Particle Pollution',
                },
                {
                    'Name'          : 'Grass',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Mold',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Ragweed',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'Tree',
                    'Value'         : 0,
                    'Category'      : 'Low',
                    'CategoryValue' : 1,
                },
                {
                    'Name'          : 'UVIndex',
                    'Value'         : 10,
                    'Category'      : 'Very High',
                    'CategoryValue' : 4,
                },
            ],
            'Day'                      : {
                'Icon'                     : 4,
                'IconPhrase'               : 'Intermittent clouds',
                'HasPrecipitation'         : true,
                'PrecipitationType'        : 'Rain',
                'PrecipitationIntensity'   : 'Light',
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '03',
                },
                'ShortPhrase'              : 'A p.m. shower in places',
                'LongPhrase'               : 'Clouds and sun with a shower in spots in the afternoon; unhealthy air quality for sensitive groups',
                'PrecipitationProbability' : 40,
                'ThunderstormProbability'  : 20,
                'RainProbability'          : 40,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 13,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 137,
                        'Localized' : 'SE',
                        'English'   : 'SE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 20.4,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 141,
                        'Localized' : 'SE',
                        'English'   : 'SE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0.3,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0.3,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0.5,
                'HoursOfRain'              : 0.5,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 64,
            },
            'Night'                    : {
                'Icon'                     : 36,
                'IconPhrase'               : 'Intermittent clouds',
                'HasPrecipitation'         : false,
                'LocalSource'              : {
                    'Id'          : 7,
                    'Name'        : 'Huafeng',
                    'WeatherCode' : '01',
                },
                'ShortPhrase'              : 'Partly cloudy',
                'LongPhrase'               : 'Partly cloudy',
                'PrecipitationProbability' : 25,
                'ThunderstormProbability'  : 24,
                'RainProbability'          : 25,
                'SnowProbability'          : 0,
                'IceProbability'           : 0,
                'Wind'                     : {
                    'Speed'     : {
                        'Value'    : 14.8,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 148,
                        'Localized' : 'SSE',
                        'English'   : 'SSE',
                    },
                },
                'WindGust'                 : {
                    'Speed'     : {
                        'Value'    : 22.2,
                        'Unit'     : 'km/h',
                        'UnitType' : 7,
                    },
                    'Direction' : {
                        'Degrees'   : 144,
                        'Localized' : 'SE',
                        'English'   : 'SE',
                    },
                },
                'TotalLiquid'              : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Rain'                     : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'Snow'                     : {
                    'Value'    : 0,
                    'Unit'     : 'cm',
                    'UnitType' : 4,
                },
                'Ice'                      : {
                    'Value'    : 0,
                    'Unit'     : 'mm',
                    'UnitType' : 3,
                },
                'HoursOfPrecipitation'     : 0,
                'HoursOfRain'              : 0,
                'HoursOfSnow'              : 0,
                'HoursOfIce'               : 0,
                'CloudCover'               : 65,
            },
            'Sources'                  : [
                'AccuWeather',
                'Huafeng'
            ],
            'MobileLink'               : 'http://m.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=5&unit=c&lang=en-us',
            'Link'                     : 'http://www.accuweather.com/en/hk/islands-district/1123411/daily-weather-forecast/1123411?day=5&unit=c&lang=en-us',
        },
    ]
};

nock.disableNetConnect();

nock('https://dataservice.accuweather.com')
    .get('/locations/v1/cities/geoposition/search')
    .query({
        apikey : process.env.REACT_APP_ACCU_WEATHER_API_KEY,
        q      : `${latitude},${longitude}`,

    })
    .reply(200, locationResponse)
    .get(`/currentconditions/v1/${locationKey}`)
    .query({
        apikey   : process.env.REACT_APP_ACCU_WEATHER_API_KEY,
        language : locale,
        details  : true,
    })
    .reply(200, currentWeatherResponse)
    .get(`/forecasts/v1/hourly/12hour/${locationKey}`)
    .query({
        apikey   : process.env.REACT_APP_ACCU_WEATHER_API_KEY,
        language : locale,
        details  : true,
        metric   : true,
    })
    .reply(200, hourlyWeatherResponse)
    .get(`/forecasts/v1/daily/5day/${locationKey}`)
    .query({
        apikey   : process.env.REACT_APP_ACCU_WEATHER_API_KEY,
        language : locale,
        details  : true,
        metric   : true,
    })
    .reply(200, dailyWeatherResponse);

describe('AccuWeatherApiClient', () => {
    it('getWeather', async () => {
        const weather = await AccuWeatherApiClient.getWeather(latitude, longitude, locale);

        expect(weather.current.temperature).toEqual(22.2);
        expect(weather.hourly[ 0 ].temperature).toEqual(22.7);
        expect(weather.daily[ 0 ].temperatureHigh).toEqual(24.2);
    });
});
