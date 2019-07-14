import _map from './map';
import _mapFilter from './map-filter';

export default (coll, iteratee) => _mapFilter(_map, coll, iteratee);
