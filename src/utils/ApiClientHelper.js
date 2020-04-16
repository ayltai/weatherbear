import request from 'request';

export const ApiClientHelper = {};

ApiClientHelper.request = (url, argumentsValidator, invalidArgsErrorMessage, onSuccess) => {
    return new Promise((resolve, reject) => {
        if (argumentsValidator()) {
            request({
                url,
                json : true,
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response) {
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        resolve(onSuccess(body));
                    } else {
                        reject(new Error(`Received HTTP ${response.statusCode}`));
                    }
                } else {
                    reject(new Error('No response received'));
                }
            });
        } else {
            reject(new Error(invalidArgsErrorMessage));
        }
    });
};
