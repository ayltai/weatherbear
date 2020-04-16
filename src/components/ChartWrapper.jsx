import { useTheme, } from '@material-ui/core';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import React from 'react';

export const ChartWrapper = props => {
    const theme = useTheme();

    Chart.defaults.global.defaultColor             = theme.palette.text.primary;
    Chart.defaults.global.defaultFontColor         = theme.palette.text.primary;
    Chart.defaults.global.tooltips.backgroundColor = theme.palette.type === 'dark' ? 'rgba(97, 97, 97, 0.9)' : 'rgba(158, 158, 158, 0.9)';
    Chart.defaults.global.tooltips.titleFontFamily = theme.typography.fontFamily;
    Chart.defaults.global.tooltips.titleFontSize   = theme.typography.fontSize - 4;
    Chart.defaults.global.tooltips.bodyFontFamily  = theme.typography.fontFamily;
    Chart.defaults.global.tooltips.bodyFontSize    = theme.typography.fontSize - 4;

    React.useEffect(() => {
        if (props.data.datasets) {
            new Chart('chart', {
                type    : 'line',
                data    : props.data,
                options : {
                    layout : {
                        padding : {
                            left   : theme.spacing(2),
                            right  : theme.spacing(2),
                            top    : 0,
                            bottom : 0,
                        },
                    },
                    legend : {
                        labels : {
                            boxWidth : 0,
                        },
                    },
                    ...props.options,
                },
            });
        }
    }, [ theme, props.width, props.height, props.data, props.options, ]);

    return (
        <canvas
            className={props.className}
            id='chart'
            width={props.width}
            height={props.height} />
    );
};

ChartWrapper.propTypes = {
    className : PropTypes.string,
    width     : PropTypes.number.isRequired,
    height    : PropTypes.number.isRequired,
    data      : PropTypes.object.isRequired,
    options   : PropTypes.object,
};
