import { Grid, } from '@material-ui/core';
import { Skeleton, } from '@material-ui/lab';
import React from 'react';

export const ViewHelper = {};

ViewHelper.createDummyCurrentWeather = () => (
    <Skeleton
        width={window.innerWidth}
        height={window.innerWidth / 2}
        variant='rect'
        animation='wave' />
);

ViewHelper.createDummyWeatherChart = () => (
    <Skeleton
        width={window.innerWidth}
        height={window.innerWidth / 2}
        variant='rect'
        animation='wave' />
);

ViewHelper.createDummyDailyWeathers = count => {
    const dailyWeathers = [];
    for (let i = 0; i < count; i++) dailyWeathers.push(
        <Grid
            key={i}
            item>
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                width={48}
                height={48}
                variant='circle'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
            <Skeleton
                variant='text'
                animation='wave' />
        </Grid>
    );

    return dailyWeathers;
};
