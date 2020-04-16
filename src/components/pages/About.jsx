import { Grid, makeStyles, Typography, } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Configurations, } from '../../Configurations';
import logo from '../../logo.png';
import { Page, } from '../layouts/Page';

export const About = () => {
    const classes = makeStyles(theme => ({
        margin : {
            margin : theme.spacing(4),
        },
    }))();

    const { t, } = useTranslation();

    return (
        <Page title='About'>
            <Grid
                container
                alignItems='center'
                alignContent='center'
                direction='column'>
                <img
                    className={classes.margin}
                    src={logo}
                    width={128}
                    height={128}
                    alt='logo' />
                <Typography
                    variant='h4'
                    align='center'>
                    {Configurations.APP_NAME}
                </Typography>
                <Typography
                    variant='body2'
                    align='center'>
                    {`${t('Version')} ${Configurations.APP_VERSION}`}
                </Typography>
                <Typography
                    variant='caption'
                    align='center'
                    component='p'>
                    {`${t('Copyright')} © ${moment().format('YYYY')}`}
                </Typography>
            </Grid>
        </Page>
    );
};
