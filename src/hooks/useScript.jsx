import { useEffect, useState, } from 'react';

const cachedScripts = [];

export const useScript = (src, onLoad) => {
    const [ isLoaded, setIsLoaded, ] = useState(false);
    const [ hasError, setHasError, ] = useState(false);

    useEffect(() => {
        const handleLoaded = () => {
            setIsLoaded(true);

            if (onLoad) onLoad();
        };

        const handleError = () => setHasError(true);

        if (cachedScripts.includes(src)) {
            handleLoaded();
        } else {
            cachedScripts.push(src);

            const script = document.createElement('script');
            script.src = src;

            script.addEventListener('load', handleLoaded);
            script.addEventListener('error', handleError);

            document.head.append(script);

            return () => {
                script.removeEventListener('load', handleLoaded);
                script.removeEventListener('error', handleError);
            };
        }
    }, [ src, onLoad, ]);

    return [ isLoaded, hasError, ];
};
