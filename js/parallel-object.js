/*
Consumes an object and returns a Promise with a copy of that object.
If any of the input object's property values are Promises, the output
copy has that property's value set to the resolved value of that
Promise.

```
parallelObject({
    name: 'John Doe',
    age: Promise.resolve(new Date().getYear() - 1980)
}).then(result => {
    // result = { name: 'John Doe', age: 37}
});
```
*/
import tryInvoke from './try-invoke';
import zipObject from './zip-object';

export default inputObject => {
    const keys = Object.keys(inputObject);

    return Promise.all(keys.map(key => {
        let result;

        switch (typeof inputObject[key]) {
            case 'function':
                result = tryInvoke(inputObject[key]);
                break;
            default:
                result = inputObject[key];
        }

        return result;
    })).then(values => zipObject(keys, values));
};
