import React from 'react';

export const useOnlineStatus = () => {
    const [ isOnline, setIsOnline, ] = React.useState(typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true);

    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    React.useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
