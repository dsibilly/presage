import mapFilter from './map-filter';
import mapSeries from './map-series';

export default (coll, iteratee) => mapFilter(mapSeries, coll, iteratee);
