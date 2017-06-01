# presage [![Build Status](https://travis-ci.org/dsibilly/presage.svg?branch=develop)](https://travis-ci.org/dsibilly/presage) [![Coverage Status](https://coveralls.io/repos/github/dsibilly/presage/badge.svg?branch=develop)](https://coveralls.io/github/dsibilly/presage?branch=develop)

A set of control flow utilities for working with ECMAScript Promises.

## Documentation

### Collections

* [`eachSeries`](#each-series)
* [`filter`](#filter), `filterSeries`
* [`map`](#map), `mapSeries`
* [`reduce`](#reduce)

### Control flow

* [`parallel`](#parallel)
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

__Related__

* filterSeries(coll, iteratee)

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

__Related__

* mapSeries(coll, iteratee)

---------------------------------------

<a name="reduce"></a>

### reduce(coll, reducer, initialValue)

Reduces `coll` into a single value using async `reducer` to return
each incremental result. `initialValue` is the initial state of the
reduction. This function only operates in series.

__Arguments__

* `coll` - A collection to iterate over. This collection may contain values or Promises.
* `reducer(memo, item)` - A function applied to each item in `coll` to produce the next step in the reduction. `memo` is the current memoization of the reduction, containing the partial result up to the current step. `item` is the current item in `coll` that is being processed. `reducer` may return a value or a Promise.

__Example__

```javascript
import presage from 'presage';

presage.reduce([
    Promise.resolve(1),
    2,
    Promise.resolve(3)
], (memo, item) => new Promise(resolve => {
    process.nextTick(() => {
        resolve(memo + item);
    });
}), 0).then(result => {
    // result is now equal to the last value of memo, which is 6
});
```

---------------------------------------

<a name="parallel"></a>

### parallel(tasks)

Runs the functions in the `tasks` collection in parallel, without
waiting for the other tasks to finish. If any task throws an Error or
returns a rejected Promise, this function returns a rejected Promise.

Best used for performing multiple async I/O tasks in parallel. Should
*not* be used for tasks that do not use timers or perform I/O; the
single-threaded nature of JavaScript will run these tasks in series and
not yield any performance gain.

This function accepts an object instead of an array. Each property will
be run as a function, and the results will be passed to the resolved
Promise returned by `parallel`.

__Arguments__

* `tasks` - A collection containing functions to run.

__Example__

```javascript

import presage from 'presage';

presage.parallel([
    () => new Promise(resolve => {
        setTimeout(() => {
            resolve('task 1');
        }, 200);
    }),
    () => new Promise(resolve => {
        setTimeout(() => {
            resolve('task 2')
        }, 100);
    })
]).then(results => {
    // the results array with equal [ 'task 1', 'task 2' ]
    // despite the second task being faster
});

presage.parallel({
    one: () => {
        setTimeout(() => {
            resolve('task 1')
        }, 200);
    },
    two: () => {
        setTimeout(() => {
            resolve('task 2');
        }, 100);
    }
}).then(results => {
    // results is now equal to { one: 'task 1', two: 'task 2' }
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
