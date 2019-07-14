import _eachSeries from './each-series';
import _filter from './filter';
import _filterSeries from './filter-series';
import _map from './map';
import _mapSeries from './map-series';
import _parallel from './parallel';
import _promiseWithCallback from './promise-with-callback';
import _reduce from './reduce';
import _series from './series';

export {
    _eachSeries as eachSeries,
    _filter as filter,
    _filterSeries as filterSeries,
    _map as map,
    _mapSeries as mapSeries,
    _parallel as parallel,
    _promiseWithCallback as promiseWithCallback,
    _reduce as reduce,
    _series as series
};

export default {
    eachSeries: _eachSeries,
    filter: _filter,
    filterSeries: _filterSeries,
    map: _map,
    mapSeries: _mapSeries,
    parallel: _parallel,
    promiseWithCallback: _promiseWithCallback,
    reduce: _reduce,
    series: _series
};
