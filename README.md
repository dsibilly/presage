# presage

A set of control flow utilities for working with ECMAScript Promises.

## Documentation

### Collections

* [`filter`](#filter)
* [`map`](#map)
* [`mapSeries`](#map-series)

### Control flow

* [`series`](#series)

<a name="filter"></a>

### filter(coll, iteratee)

Returns a new array of all the values in `coll` which result in a truthy
value when `iteratee` is applied to them. This operation is performed in
parallel, but the results array will be in the same order as `coll`.

__Arguments__

* `coll` - A collection to iterate over.
* `iteratee(item)` - A truth test to apply to each item in `coll`. Expected, but not required, to return a Promise.

__Example__

```javascript
import fs from 'fs';
import presage from 'presage';

const pAccess = filePath => new Promise(resolve => {
    fs.access(filePath, error => {
        resolve(!error);
    });
});

presage.filter([
    'file1',
    'file2',
    'file3'
], pAccess).then(results => {
    // results now equals an array of the accessible files
});
```

---------------------------------------

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
import fs from 'fs';
import presage from 'presage';

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

---------------------------------------

<a name="map-series"></a>

### mapSeries(coll, iteratee)

Like `map`, but applies `iteratee` to each item in `coll` in series,
applying to each item once the previous item has been processed.

__Arguments__

* `coll` - A collection to iterate over.
* `iteratee(item)` - A function to apply to each item in `coll`.

__Example__

```javascript
import presage from 'presage';

presage.mapSeries([
    1,
    2,
    3
], num => Promise.resolve(num * 2)).then(results => {
    // results is now equal to [2, 4, 6]
});
```

---------------------------------------

<a name="series"></a>

### series(tasks)

Runs the functions in the `tasks` collection in series, each task
running once the previous task has completed. If any tasks in the series
throw or return a rejected Promise, the task processing stops and the
`series` function returns a rejected Promise. Otherwise, it returns a
resolved Promise when all `tasks` have been completed.

A task may be a Promise, a function that returns a Promise, or a
function that returns a value.

__Arguments__

* `tasks` - A collection containing functions to run. Each function is passed zero arguments.

__Example__

```javascript
import presage from 'presage';

presage.series([
    () => {
        // do some stuff...
        return Promise.resolve('one');
    },
    () => {
        // do some more stuff...
        return Promise.resolve('two');
    }
]).then(results => {
    // results is now equal to ['one', 'two']
});
```

---------------------------------------
