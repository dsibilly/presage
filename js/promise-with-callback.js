/*
promise-with-callback.js
@author Duane Sibilly <duane.sibilly@ibigroup.com>

Creates a Promise with an associated callback function. Invoking the
callback function will resolve or reject the Promise accordingly based
on its arguments, e.g.

```
import {
    readFile
} from 'fs';

const promiseReadFile = (path, options) => {
    const {
        callbackFunction,
        promise
    } = promiseWithCallback();

    readFile(filename, options, callbackFunction);
    return promise;
}

promiseReadFile('./example.txt').then(data => {
    // the file's data is here if resolved...
}).catch(error => {
    // the rejection error is here is rejected
});
```

This may also be created with a 'value reducer', a function argument
that reduces the values passed to the callback function to a single
value.

```
const {
    callbackFunction,
    promise
} = promiseWithCallback(Array.of);

callbackFunction(null, 'x', 'y', 'z'); // resolves as ['x', 'y', 'z']
```
*/
export default valueReducerFunction => {
    let rejectFunction,
        resolveFunction;

    const callbackFunction = (error, ...args) => {
            let value;

            if (error) {
                // Reject with the error
                rejectFunction(error);
                return;
            }

            if (!valueReducerFunction) {
                // Resolve with the first argument value
                resolveFunction(args[0]);
                return;
            }

            try {
                // Try to reduce the argument values
                value = valueReducerFunction(...args);
            } catch (valueResolverError) {
                // Reject with the error
                rejectFunction(valueResolverError);
                return;
            }

            // Resolve with the reduced argument values
            resolveFunction(value);
        },
        promise = new Promise((resolve, reject) => {
            // Export resolve and reject functions to outer scope
            rejectFunction = reject;
            resolveFunction = resolve;
        });

    return {
        callbackFunction,
        promise
    };
};
