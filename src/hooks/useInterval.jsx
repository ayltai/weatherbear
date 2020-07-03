import { useEffect, } from 'react';

export const useInterval = (callback, interval) => {
    useEffect(() => {
        const id = window.setInterval(callback, interval);

        return () => clearInterval(id);
    }, [ callback, interval, ]);
};
