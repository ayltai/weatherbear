import { useState, useEffect, } from 'react';

export const useOnlineStatus = () => {
    const [ isOnline, setIsOnline, ] = useState(typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true);

    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
