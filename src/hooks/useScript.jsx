import React from 'react';

const cachedScripts = [];

export const useScript = src => {
    const [ isLoaded, setIsLoaded, ] = React.useState(false);
    const [ hasError, setHasError, ] = React.useState(false);

    const handleLoaded = () => setIsLoaded(true);
    const handleError  = () => setHasError(true);

    React.useEffect(() => {
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
    }, [ src, ]);

    return [ isLoaded, hasError, ];
};
