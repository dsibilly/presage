import map from './map';
import mapFilter from './map-filter';

export default (coll, iteratee) => mapFilter(map, coll, iteratee);
