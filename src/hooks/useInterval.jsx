import React from 'react';

export const useInterval = (callback, interval) => {
    React.useEffect(() => {
        window.setInterval(callback, interval);

        return () => clearInterval(interval);
    }, [ callback, interval, ]);
};
