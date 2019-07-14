import _mapFilter from './map-filter';
import _mapSeries from './map-series';

export default (coll, iteratee) => _mapFilter(_mapSeries, coll, iteratee);
