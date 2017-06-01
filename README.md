# presage

A set of control flow utilities for working with ECMAScript Promises.

## Documentation

### Collections

* [`map`](#map)

<a name="map"></a>

### map(coll, iteratee)

Produces a new collection of values by mapping each value in `coll`
through the `iteratee` function. The `iteratee` is called with an item
from `coll` and is expected (but not required) to return a Promise. If
`iteratee` rejects or throws, the `map` function returns a rejected
Promise.

This function applies `iteratee` to each item in parallel. As such there
is no guarantee that `iteratee` Promises will resolve in order. However,
the results array will be in the same order as the original `coll`.

__Arguments__

* `coll` - A collection to iterate over.
* `iteratee(item)` - A function to apply to each item in `coll`.

__Example__

```javascript
const pStats = file => new Promise((resolve, reject) => {
    fs.stat(file, (error, stats) => {
        if (error) {
            reject(error);
        } else {
            resolve(stats);
        }
    });
});

presage.map([
    'file1',
    'file2',
    'file3'
], pStats).then(results => {
    // results is now an array of stats for each file
});
```
